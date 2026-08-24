import { useEffect, useState } from 'react'
import supabase from '../lib/supabaseClient'

/**
 * Mantém o estado da sessão do Supabase Auth atualizado (login, logout,
 * expiração/renovação de token) em toda a aplicação.
 */
export function useSession() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setLoading(false)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  return { session, loading, user: session?.user ?? null }
}
