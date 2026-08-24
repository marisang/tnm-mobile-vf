import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import TwoFactorAuth from './pages/TwoFactorAuth'
import Cadastro from './pages/Cadastro'
import RecuperarSenha from './pages/RecuperarSenha'
import NovaSenha from './pages/NovaSenha'
import PoliticaPrivacidade from './pages/PoliticaPrivacidade'
import PainelFinanceiro from './pages/PainelFinanceiro'
import CadastrarNovaObra from './pages/CadastrarNovaObra'
import MeusLancamentos from './pages/MeusLancamentos'
import CadastrarNovoShow from './pages/CadastrarNovoShow'
import VitrindeShows from './pages/VitrindeShows'
import AssinaturaBranding from './pages/AssinaturaBranding'

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas de autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/2fa" element={<TwoFactorAuth />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/nova-senha" element={<NovaSenha />} />
        <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />

        {/* Rotas protegidas — exigem sessão autenticada (login + 2FA) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <PainelFinanceiro />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/PainelFinanceiro"
          element={
            <ProtectedRoute>
              <Layout>
                <PainelFinanceiro />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cadastrar-obra"
          element={
            <ProtectedRoute>
              <Layout>
                <CadastrarNovaObra />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/meus-lancamentos"
          element={
            <ProtectedRoute>
              <Layout>
                <MeusLancamentos />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cadastrar-show"
          element={
            <ProtectedRoute>
              <Layout>
                <CadastrarNovoShow />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/shows"
          element={
            <ProtectedRoute>
              <Layout>
                <VitrindeShows />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/assinatura"
          element={
            <ProtectedRoute>
              <Layout>
                <AssinaturaBranding />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
