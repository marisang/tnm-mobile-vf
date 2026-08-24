import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoTNM from '../assets/Logo to na Midia ATUALIZADO.png'
import supabase from '../lib/supabaseClient'
import './Auth.css'

function NovaSenha() {
  const navigate = useNavigate()
  const [senha, setSenha] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState(false)

  useEffect(() => {
    // O Supabase envia o token via hash fragment — precisa processar a sessão.
    supabase.auth.getSession()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')

    if (senha.length < 8) {
      setErro('A senha deve ter pelo menos 8 caracteres.')
      return
    }
    if (!/[A-Za-z]/.test(senha) || !/[0-9]/.test(senha)) {
      setErro('A senha deve conter letras e números.')
      return
    }
    if (senha !== confirmar) {
      setErro('As senhas não coincidem.')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password: senha })
      if (error) {
        setErro('Não foi possível atualizar a senha. O link pode ter expirado.')
        return
      }
      await supabase.auth.signOut()
      setSucesso(true)
      setTimeout(() => navigate('/login'), 2500)
    } catch {
      setErro('Ocorreu um erro inesperado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src={logoTNM} alt="Logo Tô na Mídia" className="auth-logo" />

        {sucesso ? (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h1 className="auth-title">Senha Atualizada!</h1>
            <p className="auth-subtitle">Redirecionando para o login...</p>
          </>
        ) : (
          <>
            <h1 className="auth-title">Nova Senha</h1>
            <p className="auth-subtitle">Escolha uma nova senha de acesso.</p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="Nova senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="new-password"
                className="auth-input"
                required
              />
              <input
                type="password"
                placeholder="Confirmar nova senha"
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                autoComplete="new-password"
                className="auth-input"
                required
              />

              {erro && <p className="auth-error">{erro}</p>}

              <button type="submit" disabled={loading} className="auth-btn">
                {loading ? 'Salvando...' : 'Salvar Nova Senha'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default NovaSenha
