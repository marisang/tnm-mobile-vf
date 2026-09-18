import { Link } from 'react-router-dom'
import PoliticaPrivacidadeConteudo from './PoliticaPrivacidadeConteudo'
import './Auth.css'

function PoliticaPrivacidade() {
  return (
    <div className="auth-policy">
      <div className="auth-policy-content">
        <PoliticaPrivacidadeConteudo />

        <div style={{ textAlign: 'center' }}>
          <Link to="/cadastro" className="auth-back-link">
            ← Voltar ao Cadastro
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PoliticaPrivacidade
