import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import logoTNM from '../assets/Logo to na Midia ATUALIZADO.png'
import supabase from '../lib/supabaseClient'
import { artistasService } from '../services/api'

function Layout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userName, setUserName] = useState('Artista')

  useEffect(() => {
    let mounted = true
    supabase.auth.getSession().then(async ({ data }) => {
      const user = data.session?.user
      if (!user) return
      try {
        const artista = await artistasService.buscarPorAuthUserId(user.id)
        if (mounted && artista?.nome_completo) {
          setUserName(artista.pseudonimo_artistico || artista.nome_completo.split(' ')[0])
        }
      } catch {
        // Mantém o nome padrão caso o perfil ainda não esteja disponível.
      }
    })
    return () => {
      mounted = false
    }
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const navigateTo = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="mobile-container">
      {/* Sidebar Menu */}
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={toggleMenu}>✕</button>
        </div>
        <div className="sidebar-content">

          <button
            className={`menu-item ${location.pathname === '/cadastrar-obra' ? 'active' : ''}`}
            onClick={() => navigateTo('/cadastrar-obra')}
          >
            📝 Cadastrar Nova Obra
          </button>
          <button
            className={`menu-item ${location.pathname === '/meus-lancamentos' ? 'active' : ''}`}
            onClick={() => navigateTo('/meus-lancamentos')}
          >
            🎵 Meus Lançamentos
          </button>
          <button
            className={`menu-item ${location.pathname === '/cadastrar-show' ? 'active' : ''}`}
            onClick={() => navigateTo('/cadastrar-show')}
          >
            🎤 Cadastrar Novo Show
          </button>
          <button
            className={`menu-item ${location.pathname === '/shows' ? 'active' : ''}`}
            onClick={() => navigateTo('/shows')}
          >
            🎪 Vitrine de Shows
          </button>
          <button
            className={`menu-item ${location.pathname === '/assinatura' ? 'active' : ''}`}
            onClick={() => navigateTo('/assinatura')}
          >
            ✍️ Assinatura de Contratos
          </button>
          <button
            className={`menu-item ${location.pathname === '/PainelFinanceiro' ? 'active' : ''}`}
            onClick={() => navigateTo('/PainelFinanceiro')}
          >
            💰 Painel Financeiro
          </button>
          <button className="menu-item" onClick={handleLogout}>
            🚪 Sair
          </button>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}

      {/* Header */}
      <div className="header">
        <div className="header-left">
          <img src={logoTNM} alt="To Na Mídia" className="logo-img" />
        </div>
        <div className="header-icons">
          <button className="header-icon-btn">🔔</button>
          <button className="header-icon-btn" onClick={handleLogout} aria-label="Sair" title="Sair">🚪</button>
        </div>
      </div>

      {/* Greeting */}
      <div className="greeting">
        <span>👤</span>
        <span>Olá, {userName}!</span>
      </div>

      {/* Main Content */}
      <div className="page-content">
        {children}
      </div>

      {/* Navigation Bar */}
      <div className="nav-bar">
        <button className="nav-item" onClick={toggleMenu}>
          ☰
        </button>
        <button className="nav-item" onClick={() => navigateTo('/shows')}>🔍</button>
        <button className="nav-item" onClick={() => navigateTo('/meus-lancamentos')}>💬</button>
        <button className="nav-item" onClick={handleLogout}>👤</button>
      </div>
    </div>
  )
}

export default Layout
