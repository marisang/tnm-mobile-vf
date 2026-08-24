import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logoTNM from '../assets/Logo to na Midia ATUALIZADO.png'
import supabase from '../lib/supabaseClient'
import { artistasService } from '../services/api'
import { isValidCPF, isValidEmail, formatCPF, formatCEP, onlyDigits } from '../utils/validators'
import './Auth.css'

const initialState = {
  nomeCompleto: '',
  pseudonimoArtistico: '',
  nacionalidade: '',
  estadoCivil: '',
  profissao: '',
  estiloMusical: '',
  estiloMusicalOutro: '',
  rg: '',
  orgaoEmissor: '',
  cpf: '',
  dataNascimento: '',
  endereco: '',
  cep: '',
  bairro: '',
  municipio: '',
  uf: '',
  email: '',
  celular: '',
  senha: '',
  documentoIdentificacao: null,
  comprovanteResidencia: null,
  aceitaPolitica: false,
}

function Cadastro() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  function handleChange(e) {
    const { name, value, type, checked, files } = e.target
    let parsedValue = type === 'checkbox' ? checked : value
    if (type === 'file') {
      parsedValue = files && files.length > 0 ? files[0] : null
    }
    if (name === 'cpf') parsedValue = formatCPF(value)
    if (name === 'cep') parsedValue = formatCEP(value)
    if (name === 'uf') parsedValue = value.toUpperCase().slice(0, 2)
    setForm((prev) => ({ ...prev, [name]: parsedValue }))
  }

  function validar() {
    if (form.nomeCompleto.trim().length < 3) return 'Informe o nome completo.'
    if (!isValidCPF(form.cpf)) return 'CPF inválido.'
    if (!isValidEmail(form.email)) return 'E-mail inválido.'
    if (onlyDigits(form.celular).length < 10) return 'Informe um celular válido com DDD.'
    if (form.senha.length < 8) return 'A senha deve ter pelo menos 8 caracteres.'
    if (!/[A-Za-z]/.test(form.senha) || !/[0-9]/.test(form.senha)) {
      return 'A senha deve conter letras e números.'
    }
    if (!form.documentoIdentificacao) return 'É necessário anexar uma cópia do RG, CPF ou CNH.'
    if (!form.comprovanteResidencia) return 'É necessário anexar um comprovante de residência.'
    if (!form.aceitaPolitica) return 'É necessário aceitar a Política de Privacidade.'
    return ''
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')

    const mensagemValidacao = validar()
    if (mensagemValidacao) {
      setErro(mensagemValidacao)
      return
    }

    setLoading(true)
    try {
      const email = form.email.trim().toLowerCase()

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: form.senha,
      })

      if (authError) {
        setErro(
          authError.message === 'User already registered'
            ? 'Este e-mail já está cadastrado.'
            : 'Não foi possível concluir o cadastro. Verifique os dados e tente novamente.'
        )
        return
      }

      if (!authData.user) {
        setErro('Não foi possível concluir o cadastro. Tente novamente.')
        return
      }

      // Upload dos documentos
      let documentoIdentificacaoUrl = null
      let comprovanteResidenciaUrl = null

      try {
        // Upload do documento de identificação
        if (form.documentoIdentificacao) {
          const docIdExt = form.documentoIdentificacao.name.split('.').pop()
          const docIdPath = `identificacao/${authData.user.id}/${Date.now()}_documento.${docIdExt}`
          const { error: docIdUploadError } = await supabase.storage
            .from('documentos_artistas')
            .upload(docIdPath, form.documentoIdentificacao)

          if (docIdUploadError) throw new Error('Erro ao fazer upload do documento de identificação.')
          documentoIdentificacaoUrl = docIdPath
        }

        // Upload do comprovante de residência
        if (form.comprovanteResidencia) {
          const compExt = form.comprovanteResidencia.name.split('.').pop()
          const compPath = `comprovantes/${authData.user.id}/${Date.now()}_comprovante.${compExt}`
          const { error: compUploadError } = await supabase.storage
            .from('documentos_artistas')
            .upload(compPath, form.comprovanteResidencia)

          if (compUploadError) throw new Error('Erro ao fazer upload do comprovante de residência.')
          comprovanteResidenciaUrl = compPath
        }
      } catch (uploadErr) {
        setErro(uploadErr.message || 'Erro ao fazer upload dos documentos.')
        return
      }

      try {
        await artistasService.criar({
          auth_user_id: authData.user.id,
          nome_completo: form.nomeCompleto.trim(),
          pseudonimo_artistico: form.pseudonimoArtistico.trim() || null,
          nacionalidade: form.nacionalidade.trim() || null,
          estado_civil: form.estadoCivil || null,
          profissao: form.profissao.trim() || null,
          estilo_musical: form.estiloMusical === 'Outro' 
            ? form.estiloMusicalOutro.trim() || null 
            : form.estiloMusical.trim() || null,
          rg: form.rg.trim() || null,
          orgao_emissor: form.orgaoEmissor.trim() || null,
          cpf: onlyDigits(form.cpf),
          data_nascimento: form.dataNascimento || null,
          endereco_completo: form.endereco.trim() || null,
          cep: onlyDigits(form.cep) || null,
          bairro: form.bairro.trim() || null,
          municipio: form.municipio.trim() || null,
          uf: form.uf || null,
          email,
          celular: onlyDigits(form.celular),
          documento_identificacao_url: documentoIdentificacaoUrl,
          comprovante_residencia_url: comprovanteResidenciaUrl,
        })
      } catch (dbErr) {
        setErro(
          dbErr?.message?.includes('duplicate') || dbErr?.code === '23505'
            ? 'CPF ou e-mail já cadastrado.'
            : 'Conta criada, mas houve um erro ao salvar seus dados. Entre em contato com o suporte.'
        )
        return
      }

      // Encerra qualquer sessão criada automaticamente no signUp — o
      // acesso só é liberado após login + 2FA.
      await supabase.auth.signOut()

      navigate('/login', { state: { cadastroConcluido: true } })
    } catch {
      setErro('Ocorreu um erro inesperado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">
        <img src={logoTNM} alt="Logo Tô na Mídia" className="auth-logo" />
        <h1 className="auth-title">Cadastro</h1>

        <form className="auth-form" onSubmit={handleSubmit} style={{ marginTop: 16 }}>
          <input
            type="text"
            name="nomeCompleto"
            placeholder="Nome Completo"
            value={form.nomeCompleto}
            onChange={handleChange}
            className="auth-input"
            required
          />

          <input
            type="text"
            name="pseudonimoArtistico"
            placeholder="Pseudônimo Artístico"
            value={form.pseudonimoArtistico}
            onChange={handleChange}
            className="auth-input"
          />

          <select
            name="estiloMusical"
            value={form.estiloMusical}
            onChange={handleChange}
            className="auth-select"
          >
            <option value="">Selecione o Estilo Musical</option>
            <option value="Sertanejo">Sertanejo</option>
            <option value="Pop">Pop</option>
            <option value="Rock">Rock</option>
            <option value="MPB">MPB</option>
            <option value="Funk">Funk</option>
            <option value="Pagode">Pagode</option>
            <option value="Forró">Forró</option>
            <option value="Axé">Axé</option>
            <option value="Gospel">Gospel</option>
            <option value="Hip Hop">Hip Hop</option>
            <option value="Eletrônica">Eletrônica</option>
            <option value="Jazz">Jazz</option>
            <option value="Blues">Blues</option>
            <option value="Reggae">Reggae</option>
            <option value="Indie">Indie</option>
            <option value="Outro">Outro</option>
          </select>
          
          {form.estiloMusical === 'Outro' && (
            <input
              type="text"
              name="estiloMusicalOutro"
              placeholder="Digite seu estilo musical"
              value={form.estiloMusicalOutro || ''}
              onChange={handleChange}
              className="auth-input"
              style={{ marginTop: 8 }}
            />
          )}

          <input
            type="text"
            name="nacionalidade"
            placeholder="Nacionalidade"
            value={form.nacionalidade}
            onChange={handleChange}
            className="auth-input"
          />

          <select name="estadoCivil" value={form.estadoCivil} onChange={handleChange} className="auth-select">
            <option value="" disabled>
              Estado Civil
            </option>
            <option value="solteiro">Solteiro(a)</option>
            <option value="casado">Casado(a)</option>
            <option value="divorciado">Divorciado(a)</option>
            <option value="viuvo">Viúvo(a)</option>
            <option value="uniao_estavel">União Estável</option>
          </select>

          <input
            type="text"
            name="profissao"
            placeholder="Profissão"
            value={form.profissao}
            onChange={handleChange}
            className="auth-input"
          />

          <div className="auth-row">
            <input type="text" name="rg" placeholder="RG" value={form.rg} onChange={handleChange} className="auth-input" />
            <input
              type="text"
              name="orgaoEmissor"
              placeholder="Órgão Emissor"
              value={form.orgaoEmissor}
              onChange={handleChange}
              className="auth-input"
            />
          </div>

          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={form.cpf}
            onChange={handleChange}
            maxLength={14}
            className="auth-input"
            required
          />

          <input
            type="date"
            name="dataNascimento"
            value={form.dataNascimento}
            onChange={handleChange}
            className="auth-input"
          />

          <input
            type="text"
            name="endereco"
            placeholder="Endereço"
            value={form.endereco}
            onChange={handleChange}
            className="auth-input"
          />

          <div className="auth-row">
            <input type="text" name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} maxLength={9} className="auth-input" />
            <input
              type="text"
              name="bairro"
              placeholder="Bairro"
              value={form.bairro}
              onChange={handleChange}
              className="auth-input"
            />
          </div>

          <div className="auth-row">
            <input
              type="text"
              name="municipio"
              placeholder="Município"
              value={form.municipio}
              onChange={handleChange}
              className="auth-input"
            />
            <input
              type="text"
              name="uf"
              placeholder="UF"
              value={form.uf}
              onChange={handleChange}
              maxLength={2}
              className="auth-input"
              style={{ maxWidth: 90 }}
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="auth-input"
            required
          />

          <input
            type="tel"
            name="celular"
            placeholder="Celular / Whatsapp"
            value={form.celular}
            onChange={handleChange}
            className="auth-input"
            required
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            autoComplete="new-password"
            className="auth-input"
            required
          />

          <div style={{ marginTop: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', color: '#555' }}>
              Anexar RG, CPF ou CNH <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="file"
              name="documentoIdentificacao"
              onChange={handleChange}
              accept="image/*,.pdf"
              className="auth-input"
              required
              style={{ padding: '8px' }}
            />
            {form.documentoIdentificacao && (
              <p style={{ fontSize: '0.85rem', color: '#666', marginTop: 4 }}>
                ✓ {form.documentoIdentificacao.name}
              </p>
            )}
          </div>

          <div style={{ marginTop: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', color: '#555' }}>
              Anexar Comprovante de Residência <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="file"
              name="comprovanteResidencia"
              onChange={handleChange}
              accept="image/*,.pdf"
              className="auth-input"
              required
              style={{ padding: '8px' }}
            />
            {form.comprovanteResidencia && (
              <p style={{ fontSize: '0.85rem', color: '#666', marginTop: 4 }}>
                ✓ {form.comprovanteResidencia.name}
              </p>
            )}
          </div>

          <div className="auth-checkbox-group">
            <label className="auth-checkbox-label">
              <input type="checkbox" name="aceitaPolitica" checked={form.aceitaPolitica} onChange={handleChange} required />
              Li e concordo com a <Link to="/politica-de-privacidade">Política de Privacidade</Link>
            </label>
          </div>

          {erro && <p className="auth-error">{erro}</p>}

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </div>

      <div className="auth-footer">
        Já possui uma conta? <Link to="/login">Faça login</Link>
      </div>
    </div>
  )
}

export default Cadastro
