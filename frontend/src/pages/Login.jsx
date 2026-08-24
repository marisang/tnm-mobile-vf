import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logoTNM from '../assets/Logo to na Midia ATUALIZADO.png'
import supabase from '../lib/supabaseClient'
import './Auth.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setLoading(true)

    try {
      // 1º fator: e-mail + senha.
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      })

      if (signInError) {
        setErro('E-mail ou senha inválidos.')
        return
      }

      // A senha autentica, mas a sessão só é confirmada após o código
      // enviado por e-mail (2º fator).
      await supabase.auth.signOut()

      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false },
      })

      if (otpError) {
        setErro('Não foi possível enviar o código de verificação. Tente novamente.')
        return
      }

      sessionStorage.setItem('tnm_2fa_email', email)
      navigate('/2fa')
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
        <h1 className="auth-title">Login</h1>

        <form className="auth-form" onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="auth-input"
            required
          />

          <div>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
              className="auth-input"
              required
            />
            <Link to="/recuperar-senha" className="auth-forgot-link">
              Esqueci minha senha
            </Link>
          </div>

          {erro && <p className="auth-error">{erro}</p>}

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>

      <div className="auth-footer">
        Não possui uma conta? <Link to="/cadastro">Faça cadastro</Link>
      </div>
    </div>
  )
}

export default Login
