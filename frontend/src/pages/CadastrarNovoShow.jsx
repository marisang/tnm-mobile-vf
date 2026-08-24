import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShows } from '../hooks/useShows'
import { useArtistaAtual } from '../hooks/useArtistaAtual'
import supabase from '../lib/supabaseClient'
import { sanitizeFileName } from '../utils/sanitizeFileName'

function CadastrarNovoShow() {
  const navigate = useNavigate()
  const { user, artista } = useArtistaAtual()
  const { criarShow } = useShows()

  const [formData, setFormData] = useState({
    titulo_evento: '',
    data_evento: '',
    hora_evento: '',
    local_nome: '',
    link_ingressos: '',
    contato_whatsapp: '',
    release_texto: '',
  })

  const [bannerFile, setBannerFile] = useState(null)
  const [bannerFileName, setBannerFileName] = useState('')
  const bannerInputRef = useRef(null)

  const [uploading, setUploading] = useState(false)
  const [erro, setErro] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBannerChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setBannerFile(file)
      setBannerFileName(file.name)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')

    if (!user || !artista) {
      setErro('Sua sessão expirou. Faça login novamente.')
      return
    }
    if (!formData.titulo_evento || !formData.data_evento || !formData.local_nome) {
      setErro('Preencha título, data e local do show.')
      return
    }

    setUploading(true)

    try {
      let bannerUrl = null
      if (bannerFile) {
        const { data, error } = await supabase.storage
          .from('shows')
          .upload(`banners/${user.id}/${Date.now()}_${sanitizeFileName(bannerFile.name)}`, bannerFile, { upsert: true })
        if (error) throw new Error('Não foi possível enviar a capa do show.')
        bannerUrl = data.path
      }

      // Todo show criado pelo artista entra pendente de moderação do ERP —
      // o próprio artista nunca pode se auto-publicar na vitrine.
      await criarShow({
        titulo_evento: formData.titulo_evento,
        data_evento: formData.data_evento,
        hora_evento: formData.hora_evento || null,
        local_nome: formData.local_nome,
        banner_url: bannerUrl,
        link_ingressos: formData.link_ingressos || null,
        contato_whatsapp: formData.contato_whatsapp || null,
        release_texto: formData.release_texto || null,
        status_publicacao: 'pendente',
        artista_id: artista.id,
      })

      alert('Show enviado para moderação com sucesso!')
      navigate('/shows')
    } catch (error) {
      console.error('Erro ao cadastrar show:', error)
      setErro(error.message || 'Erro ao cadastrar show. Tente novamente.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <h1 className="page-title">CADASTRAR NOVO SHOW</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-section-title">Cadastro do Show</div>

          {/* Capa do show */}
          <div className="form-group">
            <label className="file-upload-large" style={{ cursor: 'pointer' }} onClick={() => bannerInputRef.current?.click()}>
              <div className="file-upload-icon-large">🖼️</div>
              <div className="file-upload-text-large">
                {bannerFileName || 'Capa do show — escolha o arquivo'}
              </div>
              <input ref={bannerInputRef} type="file" accept="image/*" onChange={handleBannerChange} style={{ display: 'none' }} />
            </label>
          </div>

          {/* Título do Evento */}
          <div className="form-group">
            <input
              type="text"
              name="titulo_evento"
              className="form-input"
              placeholder="Título do Evento *"
              value={formData.titulo_evento}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Data e horário */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <input
                type="date"
                name="data_evento"
                className="form-input"
                value={formData.data_evento}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <input
                type="time"
                name="hora_evento"
                className="form-input"
                value={formData.hora_evento}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Local */}
          <div className="form-group">
            <input
              type="text"
              name="local_nome"
              className="form-input"
              placeholder="Endereço do Evento *"
              value={formData.local_nome}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Link de Ingressos */}
          <div className="form-group">
            <input
              type="url"
              name="link_ingressos"
              className="form-input"
              placeholder="URL da Venda de Ingressos (opcional)"
              value={formData.link_ingressos}
              onChange={handleInputChange}
            />
          </div>

          {/* WhatsApp */}
          <div className="form-group">
            <input
              type="tel"
              name="contato_whatsapp"
              className="form-input"
              placeholder="WhatsApp de Contato (opcional)"
              value={formData.contato_whatsapp}
              onChange={handleInputChange}
            />
          </div>

          {/* Release/Descrição */}
          <div className="form-group">
            <textarea
              name="release_texto"
              className="form-textarea"
              placeholder="Descrição / Release do Evento (opcional)"
              value={formData.release_texto}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          {erro && <p style={{ color: '#ff6b6b', fontSize: '13px' }}>{erro}</p>}

          <button type="submit" className="btn-primary" disabled={uploading}>
            {uploading ? 'ENVIANDO...' : 'ENVIAR PARA MODERAÇÃO'}
          </button>
        </div>
      </form>
    </>
  )
}

export default CadastrarNovoShow
