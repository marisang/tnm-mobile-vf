import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoTNM from '../assets/Logo to na Midia ATUALIZADO.png'
import supabase from '../lib/supabaseClient'
import { artistasService } from '../services/api'
import './Auth.css'

const RESEND_COOLDOWN_SECONDS = 30

function TwoFactorAuth() {
  const navigate = useNavigate()
  const [email, setEmail] = useState(null)
  const [code, setCode] = useState(Array(6).fill(''))
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [reenviando, setReenviando] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const inputs = useRef([])

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('tnm_2fa_email')
    if (!storedEmail) {
      navigate('/login', { replace: true })
      return
    }
    setEmail(storedEmail)
  }, [navigate])

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  function handleChange(value, index) {
    if (!/^\d?$/.test(value)) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    if (value && index < 5) {
      inputs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const newCode = Array(6).fill('')
    pasted.split('').forEach((char, i) => {
      newCode[i] = char
    })
    setCode(newCode)
    inputs.current[Math.min(pasted.length, 5)]?.focus()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setErro('')
    setLoading(true)

    try {
      const token = code.join('')
      if (token.length !== 6) {
        setErro('Informe os 6 dígitos do código.')
        return
      }

      const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })

      if (error || !data.session) {
        setErro('Código inválido ou expirado. Tente novamente ou solicite um novo código.')
        return
      }

      // Garante que o artista completou o cadastro (existe registro na
      // tabela artistas vinculado a este usuário).
      try {
        await artistasService.buscarPorAuthUserId(data.session.user.id)
      } catch {
        setErro('Cadastro incompleto. Finalize seu cadastro para continuar.')
        return
      }

      sessionStorage.removeItem('tnm_2fa_email')
      navigate('/PainelFinanceiro')
    } catch {
      setErro('Ocorreu um erro inesperado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = useCallback(async () => {
    if (!email || cooldown > 0) return
    setErro('')
    setReenviando(true)
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false },
      })
      if (error) {
        setErro('Não foi possível reenviar o código. Tente novamente em instantes.')
        return
      }
      setCode(Array(6).fill(''))
      setCooldown(RESEND_COOLDOWN_SECONDS)
      inputs.current[0]?.focus()
    } finally {
      setReenviando(false)
    }
  }, [email, cooldown])

  if (!email) return null

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src={logoTNM} alt="Logo Tô na Mídia" className="auth-logo" />
        <h1 className="auth-title">Preencha o Código</h1>
        <p className="auth-subtitle">
          Enviamos um código de verificação para <strong>{email}</strong>
        </p>

        <form className="auth-form" onSubmit={handleSubmit} style={{ alignItems: 'center' }}>
          <div className="otp-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputs.current[index] = el
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="otp-input"
              />
            ))}
          </div>

          {erro && <p className="auth-error">{erro}</p>}

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Verificando...' : 'Verificar Código'}
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={reenviando || cooldown > 0}
            className="auth-btn-link"
          >
            {cooldown > 0 ? `Reenviar código (${cooldown}s)` : reenviando ? 'Reenviando...' : 'Reenviar código'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TwoFactorAuth
