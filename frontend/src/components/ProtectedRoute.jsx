import { Navigate } from 'react-router-dom'
import { useSession } from '../hooks/useSession'

export default function ProtectedRoute({ children }) {
  const { session, loading } = useSession()

  if (loading) {
    return (
      <div className="auth-loading">
        <p>Carregando...</p>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}
