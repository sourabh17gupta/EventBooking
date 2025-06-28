import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

// This component restricts access to unauthenticated-only routes (e.g., login, signup)
function OpenRoute({ children }) {
  const { user } = useSelector((state) => state.profile)

  // If user is authenticated (detected from Redux), redirect them away
  if (user) {
    return <Navigate to="/" replace />
  }

  // Otherwise, allow access to the public route
  return children
}

export default OpenRoute
