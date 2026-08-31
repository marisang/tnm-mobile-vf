import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ContratoDistribuicaoTemplate from '../templates/documentos/ContratoDistribuicaoTemplate'
import AutorizacaoImagemTemplate from '../templates/documentos/AutorizacaoImagemTemplate'
import ContratoEdicaoTemplate from '../templates/documentos/ContratoEdicaoTemplate'
import { gerarPdf, gerarPdfComoBlob } from '../utils/pdfGenerator'
import { supabase } from '../lib/supabaseClient'
import { useArtistaAtual } from '../hooks/useArtistaAtual'
import { useObras } from '../hooks/useObras'
import { mapArtistaParaDadosDocumento } from '../utils/mapArtistaParaDadosDocumento'
import { carimbarContrato } from '../utils/carimbarContrato'
import { sanitizeFileName } from '../utils/sanitizeFileName'

//  Motor de Geração de PDFs 
// Cada tipo de documento aponta pro seu componente de template e define
// quais campos o formulário precisa pedir pro usuário.
const TIPOS_DE_DOCUMENTO = [
  {
    id: 'contrato-distribuicao',
    titulo: 'Contrato de Distribuição Digital',
    descricao: 'Administração exclusiva de masters e distribuição digital.',
    Template: ContratoDistribuicaoTemplate,
    requerObra: false,
  },
  {
    id: 'contrato-edicao',
    titulo: 'Contrato de Edição Musical',
    descricao: 'Cessão de direitos autorais e edição da obra musical.',
    Template: ContratoEdicaoTemplate,
    requerObra: true,
  },
  {
    id: 'autorizacao-imagem',
    titulo: 'Autorização para Uso de Imagem',
    descricao: 'Termo de uso de imagem e voz (LGPD).',
    Template: AutorizacaoImagemTemplate,
    requerObra: false,
  },
]

const CAMPOS_INICIAIS_DOCUMENTO = {
  nomeCompleto: '',
  pseudonimoArtistico: '',
  nacionalidade: 'Brasileira',
  estadoCivil: '',
  profissao: '',
  rg: '',
  orgaoEmissor: '',
  cpf: '',
  endereco: '',
  bairro: '',
  municipio: '',
  uf: '',
  cep: '',
  email: '',
  celular: '',
  dataNascimento: '',
  dataAssinatura: '',
}

function AssinaturaBranding() {
  const navigate = useNavigate()
  const { user, artista, loading: carregandoArtista, error: erroArtista } = useArtistaAtual()
  const { obras, loading: carregandoObras } = useObras(artista?.id)

  const [formData, setFormData] = useState({
    contractFile: null,
    agreePrivacy: false,
    agreeUnpublished: false,
    signature: '',
  })

  const [currentStep, setCurrentStep] = useState('upload') // upload, review, sign
  const [salvando, setSalvando] = useState(false)
  const [erroSalvar, setErroSalvar] = useState('')

  //  Estado do gerador de documentos 
  const [tipoSelecionado, setTipoSelecionado] = useState(null)
  const [obraSelecionada, setObraSelecionada] = useState(null)
  const [dadosDocumento, setDadosDocumento] = useState(CAMPOS_INICIAIS_DOCUMENTO)
  const [gerandoPdf, setGerandoPdf] = useState(false)
  const [erroGerarPdf, setErroGerarPdf] = useState('')
  const areaRenderizacaoRef = useRef(null)

  // Assim que o registro do artista (useArtistaAtual) carrega, usa os
  // dados dele pra pré-preencher o gerador de documentos.
  useEffect(() => {
    if (!artista) return
    setDadosDocumento((anterior) => ({
      ...anterior,
      ...mapArtistaParaDadosDocumento(artista),
    }))
  }, [artista])

  function handleChangeCampoDocumento(campo, valor) {
    setDadosDocumento((anterior) => ({ ...anterior, [campo]: valor }))
  }

  async function handleGerarPdf() {
    if (!tipoSelecionado || !user || !artista) return
    
    // Validar se o tipo requer obra e se uma foi selecionada
    if (tipoSelecionado.requerObra && !obraSelecionada) {
      setErroGerarPdf('Por favor, selecione a obra para este contrato.')
      return
    }
    
    setGerandoPdf(true)
    setErroGerarPdf('')
    try {
      const sufixoObra = obraSelecionada ? `-${obraSelecionada.titulo.replace(/\s+/g, '-')}` : ''
      const nomeArquivo = `${tipoSelecionado.id}${sufixoObra}-${dadosDocumento.nomeCompleto || 'documento'}.pdf`
      await gerarPdf(areaRenderizacaoRef.current, nomeArquivo)

      const pdfBlob = await gerarPdfComoBlob(areaRenderizacaoRef.current)

      const { error: erroUpload } = await supabase.storage
        .from('documentos')
        .upload(`${user.id}/${nomeArquivo}`, pdfBlob, {
          contentType: 'application/pdf',
          upsert: true,
        })
      if (erroUpload) throw new Error('Não foi possível enviar o PDF: ' + erroUpload.message)

      const { error: erroInsert } = await supabase.from('documentos_gerados').insert({
        artista_id: artista.id,
        tipo: tipoSelecionado.id,
        arquivo: `${user.id}/${nomeArquivo}`,
        criado_em: new Date().toISOString(),
      })
      if (erroInsert) throw new Error('PDF enviado, mas não foi possível registrar o documento: ' + erroInsert.message)
    } catch (error) {
      console.error('Erro ao gerar documento:', error)
      setErroGerarPdf(error.message || 'Não foi possível gerar o documento.')
    } finally {
      setGerandoPdf(false)
    }
  }

  const TemplateSelecionado = tipoSelecionado?.Template
  
  // Determinar o tipo de contrato para salvar no banco
  const getTipoContrato = () => {
    if (!tipoSelecionado) return 'Contrato Genérico'
    
    switch (tipoSelecionado.id) {
      case 'contrato-distribuicao':
        return 'Contrato de Distribuição Digital'
      case 'contrato-edicao':
        return 'Contrato de Edição Musical'
      case 'autorizacao-imagem':
        return 'Autorização para Uso de Imagem'
      default:
        return tipoSelecionado.titulo
    }
  }
  //  fim do estado/lógica do gerador de documentos 

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type !== 'application/pdf') {
      setErroSalvar('Só é possível enviar arquivos em PDF (para que a assinatura possa ser carimbada no documento).')
      e.target.value = ''
      return
    }
    setErroSalvar('')
    setFormData((prev) => ({ ...prev, contractFile: file }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSignatureChange = (e) => {
    const { value } = e.target
    setFormData((prev) => ({ ...prev, signature: value }))
  }

  const isReviewDisabled = !formData.contractFile

  const isSignDisabled = !formData.agreePrivacy || !formData.agreeUnpublished || !formData.signature || salvando

  const handleProceed = () => {
    if (currentStep === 'upload' && formData.contractFile) {
      setCurrentStep('review')
    } else if (currentStep === 'review' && formData.agreePrivacy && formData.agreeUnpublished) {
      setCurrentStep('sign')
    }
  }

  const handleSubmit = async () => {
    if (isSignDisabled || !user || !artista) return
    setErroSalvar('')
    setSalvando(true)

    try {
      const agora = new Date()
      const agoraIso = agora.toISOString()
      const dataHoraFormatada = agora.toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        dateStyle: 'short',
        timeStyle: 'short',
      })

      // 1) Carimba o PDF com os dados da assinatura (nome, CPF, data/hora
      // e os aceites) antes de enviar — assim quem abrir o arquivo fora
      // do sistema também vê a prova de assinatura, não só quem consulta
      // o banco de dados.
      let pdfParaEnviar
      try {
        pdfParaEnviar = await carimbarContrato(formData.contractFile, {
          nome: formData.signature,
          cpf: artista.cpf,
          dataHoraFormatada,
          nomeArquivoOriginal: formData.contractFile.name,
          tipoContrato: getTipoContrato(),
        })
      } catch {
        throw new Error('Não foi possível processar o PDF. Confirme se o arquivo não está corrompido ou protegido por senha.')
      }

      // 2) Upload do PDF já carimbado pro bucket privado "contratos"
      const nomeArquivo = `${Date.now()}_${sanitizeFileName(formData.contractFile.name)}`
      const caminho = `${user.id}/${nomeArquivo}`

      const { error: erroUpload } = await supabase.storage
        .from('contratos')
        .upload(caminho, pdfParaEnviar, { upsert: true, contentType: 'application/pdf' })
      if (erroUpload) throw new Error('Não foi possível enviar o arquivo do contrato.')

      // 3) Registra o contrato assinado
      const { error: erroContrato } = await supabase.from('contratos').insert({
        artista_id: artista.id,
        tipo_contrato: getTipoContrato(),
        status: 'ativo',
        arquivo_url: caminho,
        arquivo_nome: formData.contractFile.name,
        data_upload: agoraIso,
        assinado_em: agoraIso,
        assinatura_nome: formData.signature,
        assinatura_documento: artista.cpf || null,
        aceite_politica_privacidade_em: agoraIso,
        aceite_obra_inedita_em: agoraIso,
      })
      if (erroContrato) throw new Error('O arquivo foi enviado, mas houve um erro ao registrar o contrato.')

      // Download automático do contrato já assinado/carimbado, para que
      // o artista fique com uma cópia local imediatamente após assinar.
      const urlDownload = URL.createObjectURL(pdfParaEnviar)
      const linkDownload = document.createElement('a')
      linkDownload.href = urlDownload
      linkDownload.download = `assinado_${sanitizeFileName(formData.contractFile.name)}`
      document.body.appendChild(linkDownload)
      linkDownload.click()
      linkDownload.remove()
      URL.revokeObjectURL(urlDownload)

      alert('✅ Contrato assinado com sucesso! O download do PDF assinado foi iniciado.')
      navigate('/meus-lancamentos')
    } catch (error) {
      setErroSalvar(error.message || 'Ocorreu um erro ao assinar o contrato.')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <>
      {/* Gerar Documentos (modelos prontos: distribuição / autorização de imagem) */}
      <div className="page-title" style={{ marginTop: 8 }}>
        Gerar Documentos
      </div>

      {carregandoArtista && <p>Carregando seus dados...</p>}
      {erroArtista && <p style={{ color: 'red' }}>{erroArtista}</p>}

      {TIPOS_DE_DOCUMENTO.map((tipo) => (
        <div
          key={tipo.id}
          className={`doc-type-card ${tipoSelecionado?.id === tipo.id ? 'selected' : ''}`}
          onClick={() => {
            setTipoSelecionado(tipo)
            setObraSelecionada(null) // Reset obra ao trocar tipo
            setErroGerarPdf('')
          }}
        >
          <div className="doc-type-card-title">{tipo.titulo}</div>
          <div className="doc-type-card-desc">{tipo.descricao}</div>
        </div>
      ))}

      {tipoSelecionado?.requerObra && (
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>
            Selecione a obra para este contrato:
          </label>
          
          {carregandoObras ? (
            <p style={{ fontSize: '0.9rem', color: '#ccc' }}>Carregando obras...</p>
          ) : obras.length === 0 ? (
            <p style={{ fontSize: '0.9rem', color: '#ffcc00' }}>
              Você ainda não possui obras cadastradas. Cadastre uma obra antes de gerar este contrato.
            </p>
          ) : (
            <select
              value={obraSelecionada?.id || ''}
              onChange={(e) => {
                const obra = obras.find(o => o.id === Number(e.target.value))
                setObraSelecionada(obra || null)
                setErroGerarPdf('')
              }}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '1rem',
                border: '1px solid #ddd',
                borderRadius: 6,
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
            >
              <option value="">-- Selecione uma obra --</option>
              {obras.map((obra) => (
                <option key={obra.id} value={obra.id}>
                  {obra.titulo} {obra.isrc ? `(ISRC: ${obra.isrc})` : ''}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {tipoSelecionado && (
        <button className="btn btn-primary" onClick={handleGerarPdf} disabled={gerandoPdf}>
          {gerandoPdf ? 'Gerando PDF...' : 'Gerar PDF'}
        </button>
      )}
      {erroGerarPdf && <p style={{ color: '#ff6b6b', fontSize: '13px' }}>{erroGerarPdf}</p>}

      {/* Área escondida onde o template do contrato é montado antes de virar PDF */}
      <div className="pdf-render-area" ref={areaRenderizacaoRef}>
        {TemplateSelecionado && (
          tipoSelecionado.requerObra ? (
            <TemplateSelecionado dados={dadosDocumento} obra={obraSelecionada} />
          ) : (
            <TemplateSelecionado dados={dadosDocumento} />
          )
        )}
      </div>

      <h1 className="page-title">ASSINATURA DE CONTRATOS</h1>
      <div className="form-section">
        {/* Step 1: Upload */}
        {currentStep === 'upload' && (
          <>
            <div className="form-section-title">Etapa 1: Upload do Contrato</div>

            <div className="form-group">
              <label className="file-upload-large">
                <div className="file-upload-icon-large">📄</div>
                <div className="file-upload-text-large">Escolha o arquivo e arraste-o aqui</div>
                <input type="file" accept="application/pdf,.pdf" onChange={handleFileChange} />
              </label>
              {formData.contractFile && (
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '8px', textAlign: 'center' }}>
                  ✓ {formData.contractFile.name}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleProceed}
              disabled={isReviewDisabled}
              className="btn btn-primary"
              style={{
                opacity: isReviewDisabled ? 0.5 : 1,
                cursor: isReviewDisabled ? 'not-allowed' : 'pointer',
              }}
            >
              PRÓXIMA ETAPA
            </button>
          </>
        )}

        {/* Step 2: Review */}
        {currentStep === 'review' && (
          <>
            <div className="form-section-title">Etapa 2: Aceitar Termos</div>

            <div className="contract-preview">
              <div className="preview-header">📄 Contrato em Revisão</div>
              <div className="preview-content">{formData.contractFile?.name}</div>
            </div>

            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleCheckboxChange}
                  className="checkbox-input"
                />
                <span className="checkbox-text">Li e concordo com a Política de Privacidade</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeUnpublished"
                  checked={formData.agreeUnpublished}
                  onChange={handleCheckboxChange}
                  className="checkbox-input"
                />
                <span className="checkbox-text">Declaro que a obra é inédita</span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setCurrentStep('upload')}
                className="btn btn-primary"
                style={{ background: 'rgba(255,255,255,0.3)' }}
              >
                VOLTAR
              </button>
              <button
                type="button"
                onClick={handleProceed}
                disabled={!formData.agreePrivacy || !formData.agreeUnpublished}
                className="btn btn-primary"
                style={{
                  opacity: !formData.agreePrivacy || !formData.agreeUnpublished ? 0.5 : 1,
                  cursor: !formData.agreePrivacy || !formData.agreeUnpublished ? 'not-allowed' : 'pointer',
                }}
              >
                PRÓXIMA ETAPA
              </button>
            </div>
          </>
        )}

        {/* Step 3: Sign */}
        {currentStep === 'sign' && (
          <>
            <div className="form-section-title">Etapa 3: Assinar Digitalmente</div>

            <div className="contract-preview">
              <div className="preview-header">✅ Pronto para Assinar</div>
              <div className="preview-content">
                <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '12px' }}>Resumo do Contrato:</div>
                <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                  • Arquivo: {formData.contractFile?.name}
                  <br />
                  • Privacidade: ✓ Aceito
                  <br />
                  • Obra Inédita: ✓ Declaro
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Assinatura Digital</label>
              <input
                type="text"
                name="signature"
                className="form-input"
                placeholder="Digite seu nome completo"
                value={formData.signature}
                onChange={handleSignatureChange}
                style={{ textTransform: 'uppercase' }}
              />
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '6px' }}>
                Sua assinatura será registrada como: {formData.signature || 'Seu Nome'}
              </div>
            </div>

            {erroSalvar && <p style={{ color: '#ff6b6b', fontSize: '13px' }}>{erroSalvar}</p>}

            <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
              <button
                type="button"
                onClick={() => setCurrentStep('review')}
                className="btn btn-primary"
                style={{ background: 'rgba(255,255,255,0.3)' }}
              >
                VOLTAR
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSignDisabled}
                className="btn btn-primary"
                style={{
                  opacity: isSignDisabled ? 0.5 : 1,
                  cursor: isSignDisabled ? 'not-allowed' : 'pointer',
                  backgroundColor: isSignDisabled ? '#999' : '#FFEB3B',
                }}
              >
                {salvando ? 'ASSINANDO...' : 'ASSINAR DIGITALMENTE'}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default AssinaturaBranding