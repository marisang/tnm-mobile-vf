import { useEffect, useState } from 'react'
import { useObras } from '../hooks/useObras'
import { useArtistaAtual } from '../hooks/useArtistaAtual'
import supabase from '../lib/supabaseClient'

function MeusLancamentos() {
  const { artista } = useArtistaAtual()
  const { obras, loading, error, deletarObra } = useObras(artista?.id ?? null)
  const [capas, setCapas] = useState({})

  // O bucket "obras" é privado (contém áudio/capa antes da moderação),
  // então usamos URL assinada em vez de URL pública.
  useEffect(() => {
    let ativo = true
    async function carregarCapas() {
      const entradas = await Promise.all(
        obras
          .filter((o) => o.capa_url)
          .map(async (o) => {
            const { data } = await supabase.storage.from('obras').createSignedUrl(o.capa_url, 60 * 60)
            return [o.id, data?.signedUrl]
          })
      )
      if (ativo) setCapas(Object.fromEntries(entradas))
    }
    if (obras.length > 0) carregarCapas()
    return () => {
      ativo = false
    }
  }, [obras])

  const handleDelete = async (id, titulo) => {
    if (window.confirm(`Deseja realmente excluir "${titulo}"?`)) {
      try {
        await deletarObra(id)
        alert('Obra excluída com sucesso!')
      } catch (err) {
        alert('Erro ao excluir obra: ' + err.message)
      }
    }
  }

  if (loading) {
    return (
      <>
        <h1 className="page-title">MEUS LANÇAMENTOS</h1>
        <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.7)' }}>
          Carregando obras...
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <h1 className="page-title">MEUS LANÇAMENTOS</h1>
        <div style={{ textAlign: 'center', padding: '40px', color: '#ff6b6b' }}>
          Erro ao carregar obras: {error}
        </div>
      </>
    )
  }

  return (
    <>
      <h1 className="page-title">MEUS LANÇAMENTOS</h1>

      {/* Releases List */}
      <div>
        {obras.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.7)' }}>
            Nenhuma obra cadastrada ainda. <br/>
            <a href="/cadastrar-obra" style={{ color: '#4CAF50', textDecoration: 'underline', marginTop: '12px', display: 'inline-block' }}>
              Cadastrar primeira obra
            </a>
          </div>
        ) : (
          obras.map((obra) => (
            <div key={obra.id} className="album-card">
              <div className="album-cover-small">
                {(capas[obra.id] || obra.albuns?.capa_url) ? (
                  <img src={capas[obra.id] || obra.albuns.capa_url} alt={obra.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className="cover-text">Capa do<br/>Álbum</div>
                )}
              </div>
              <div className="album-info" style={{ flex: 1 }}>
                <div className="album-title">{obra.titulo}</div>
                <div className="album-code">{obra.isrc || 'Sem ISRC'}</div>
                {obra.status && (
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                    Status: {obra.status}
                  </div>
                )}
              </div>
              <button
                onClick={() => handleDelete(obra.id, obra.titulo)}
                style={{
                  background: '#ff4444',
                  border: 'none',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  marginLeft: '12px'
                }}
              >
                Excluir
              </button>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default MeusLancamentos
