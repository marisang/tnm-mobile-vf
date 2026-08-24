import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoTNM from '../assets/Logo to na Midia ATUALIZADO.png'
import supabase from '../lib/supabaseClient'
import './Auth.css'

function RecuperarSenha() {
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setLoading(true)

    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/nova-senha`,
      })
      // O Supabase nunca informa se o e-mail existe (evita enumeração de contas).
      setStep('enviado')
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

        {step === 'email' ? (
          <>
            <h1 className="auth-title">Recuperar Senha</h1>
            <p className="auth-subtitle">
              Digite seu e-mail cadastrado e enviaremos um link para você criar uma nova senha.
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="E-mail cadastrado"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                required
              />

              {erro && <p className="auth-error">{erro}</p>}

              <button type="submit" disabled={loading} className="auth-btn">
                {loading ? 'Enviando...' : 'Enviar Link'}
              </button>
            </form>
          </>
        ) : (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
            <h1 className="auth-title">E-mail Enviado!</h1>
            <p className="auth-subtitle">
              Se <strong>{email}</strong> estiver cadastrado, enviamos um link de recuperação. Verifique sua caixa de
              entrada e também a pasta de spam.
            </p>
            <Link to="/login" className="auth-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
              Voltar ao Login
            </Link>
          </>
        )}
      </div>

      <div className="auth-footer">
        Lembrou a senha? <Link to="/login">Faça login</Link>
      </div>
    </div>
  )
}

export default RecuperarSenha
