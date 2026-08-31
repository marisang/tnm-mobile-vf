import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useObras } from '../hooks/useObras'
import { useArtistaAtual } from '../hooks/useArtistaAtual'
import { compositoresService } from '../services/api'
import supabase from '../lib/supabaseClient'
import { sanitizeFileName } from '../utils/sanitizeFileName'

function CadastrarNovaObra() {
  const navigate = useNavigate()
  const { user, artista } = useArtistaAtual()
  const { criarObra } = useObras()

  const [formData, setFormData] = useState({
    titulo: '',
    letra: '',
    isrc: '',
    editora: '',
    composerName: '',
    composers: [],
  })

  const [capaFile, setCapaFile] = useState(null)
  const [capaFileName, setCapaFileName] = useState('')
  const [audioFile, setAudioFile] = useState(null)
  const [audioFileName, setAudioFileName] = useState('')
  const capaInputRef = useRef(null)
  const audioInputRef = useRef(null)

  const [uploading, setUploading] = useState(false)
  const [erro, setErro] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCapaChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCapaFile(file)
      setCapaFileName(file.name)
    }
  }

  const handleAudioChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAudioFile(file)
      setAudioFileName(file.name)
    }
  }

  const addComposer = () => {
    if (formData.composerName.trim()) {
      setFormData((prev) => ({
        ...prev,
        composers: [...prev.composers, prev.composerName.trim()],
        composerName: '',
      }))
    }
  }

  const removeComposer = (index) => {
    setFormData((prev) => ({
      ...prev,
      composers: prev.composers.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')

    if (!user || !artista) {
      setErro('Sua sessão expirou. Faça login novamente.')
      return
    }
    if (!formData.titulo) {
      setErro('Digite o título da obra!')
      return
    }

    setUploading(true)

    try {
      let capaUrl = null
      let audioUrl = null

      if (capaFile) {
        const { data, error } = await supabase.storage
          .from('obras')
          .upload(`capas/${user.id}/${Date.now()}_${sanitizeFileName(capaFile.name)}`, capaFile, { upsert: true })
        if (error) throw new Error('Não foi possível enviar a capa.')
        capaUrl = data.path
      }

      if (audioFile) {
        const { data, error } = await supabase.storage
          .from('obras')
          .upload(`audios/${user.id}/${Date.now()}_${sanitizeFileName(audioFile.name)}`, audioFile, { upsert: true })
        if (error) throw new Error('Não foi possível enviar o áudio.')
        audioUrl = data.path
      }

      const novaObra = await criarObra({
        titulo: formData.titulo,
        letra: formData.letra || null,
        isrc: formData.isrc ? formData.isrc.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() : null,
        editora: formData.editora.trim() || null,
        status: 'pendente',
        artista_id: artista.id,
        capa_url: capaUrl,
        audio_url: audioUrl,
      })

      if (formData.composers.length > 0) {
        await compositoresService.criarEmLote(novaObra.id, formData.composers)
      }

      alert('Obra cadastrada com sucesso!')
      navigate('/meus-lancamentos')
    } catch (error) {
      console.error('Erro ao cadastrar obra:', error)
      setErro(error.message || 'Erro ao cadastrar obra. Tente novamente.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <h1 className="page-title">CADASTRAR NOVA OBRA</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-section-title">Cadastro da Obra</div>

          {/* Capa */}
          <div className="form-group">
            <label className="file-upload-large" style={{ cursor: 'pointer' }} onClick={() => capaInputRef.current?.click()}>
              <div className="file-upload-icon-large">🖼️</div>
              <div className="file-upload-text-large">
                {capaFileName || 'Capa da obra — escolha o arquivo'}
              </div>
              <input ref={capaInputRef} type="file" accept="image/*" onChange={handleCapaChange} style={{ display: 'none' }} />
            </label>
          </div>

          {/* Título */}
          <div className="form-group">
            <input
              type="text"
              name="titulo"
              className="form-input"
              placeholder="Título da Obra *"
              value={formData.titulo}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Letra */}
          <div className="form-group">
            <textarea
              name="letra"
              className="form-textarea"
              placeholder="Letra da Música (opcional)"
              value={formData.letra}
              onChange={handleInputChange}
              rows={6}
            />
          </div>

          {/* Composers */}
          <div className="form-group">
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input
                type="text"
                name="composerName"
                className="form-input"
                placeholder="Compositores"
                value={formData.composerName}
                onChange={handleInputChange}
                style={{ flex: 1, marginTop: 0 }}
              />
              <button type="button" className="btn-icon" onClick={addComposer} style={{ marginTop: 0 }}>
                +
              </button>
            </div>
            {formData.composers.length > 0 && (
              <div className="composers-list">
                {formData.composers.map((composer, index) => (
                  <div key={index} className="composer-item">
                    <span>{composer}</span>
                    <button type="button" className="composer-remove-btn" onClick={() => removeComposer(index)}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ISRC Code */}
          <div className="form-group">
            <input
              type="text"
              name="isrc"
              className="form-input"
              placeholder="Código ISRC (opcional)"
              value={formData.isrc}
              onChange={handleInputChange}
            />
          </div>

          {/* Editora */}
          <div className="form-group">
            <input
              type="text"
              name="editora"
              className="form-input"
              placeholder="Editora (opcional)"
              value={formData.editora}
              onChange={handleInputChange}
            />
          </div>

          {/* Áudio */}
          <div className="form-group">
            <label className="file-upload-large" style={{ cursor: 'pointer' }} onClick={() => audioInputRef.current?.click()}>
              <div className="file-upload-icon-large">🎵</div>
              <div className="file-upload-text-large">
                {audioFileName || 'Áudio (.wav/.mp3) — escolha o arquivo'}
              </div>
              <input ref={audioInputRef} type="file" accept=".wav,.mp3,audio/*" onChange={handleAudioChange} style={{ display: 'none' }} />
            </label>
          </div>

          {erro && <p style={{ color: '#ff6b6b', fontSize: '13px' }}>{erro}</p>}

          <button type="submit" className="btn btn-primary" disabled={uploading}>
            {uploading ? 'CADASTRANDO...' : 'CADASTRAR'}
          </button>
        </div>
      </form>
    </>
  )
}

export default CadastrarNovaObra