import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/auth.css'
import { authService } from '../services/api'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  setLoading(true)
  setError(null)

  try {
    await authService.signup(email, username, password)
    navigate('/login')
  } catch (err: any) {
    setError(err.response?.data?.message || 'Failed to sign up')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="hero-frame">
      <div className="hero-card">
        <h2 className='text-3xl font-bold font-sans text-primary mb-4'>Join us !</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required className="input" style={{ color: '#000000ff' }}/>
          </label>

          <label>
            Username
            <input value={username} onChange={e => setUsername(e.target.value)} required className="input" style={{ color: '#000000ff' }}/>
          </label>

          <label>
            Password
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required className="input" style={{ color: '#000000ff' }}/>
          </label>

          {error && <div style={{ color: 'salmon' }}>{error}</div>}

          <div className="actions">
            <button className="primary" type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Sign Up'}
            </button>
            <Link to="/login">
              <button className="secondary" type="button">Already have an account</button>
            </Link>
          </div>
        </form>

        <div className="dots">
          <div className="dot"></div>
          <div className="dot active"></div>
        </div>
      </div>
    </div>
  )
}