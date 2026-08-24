import { useEffect, useState, useCallback } from 'react'
import { useSession } from './useSession'
import { artistasService } from '../services/api'

/**
 * Resolve o registro completo de `artistas` (com o `id` interno, um
 * número inteiro) a partir do usuário logado no Supabase Auth (`user.id`,
 * um UUID). As duas coisas NÃO são o mesmo valor — todo lugar que
 * precisa gravar `artista_id` em obras/shows/contratos/transações deve
 * usar `artista.id` daqui, nunca `user.id` diretamente.
 */
export function useArtistaAtual() {
  const { user, loading: carregandoSessao } = useSession()
  const [artista, setArtista] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const carregar = useCallback(async () => {
    if (!user) {
      setArtista(null)
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const dados = await artistasService.buscarPorAuthUserId(user.id)
      setArtista(dados)
      setError(null)
    } catch (err) {
      setArtista(null)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (carregandoSessao) return
    carregar()
  }, [carregandoSessao, carregar])

  return {
    user,
    artista,
    loading: carregandoSessao || loading,
    error,
    recarregar: carregar,
  }
}
