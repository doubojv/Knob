import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/auth.css'
import { authService } from '../services/api'

export default function Login() {
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
      const user = await authService.login(username, password)
      if (!user) throw new Error('Invalid credentials')
      // Login successful
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hero-frame ">
      <div className="hero-card w-[450px] h-[400px] ">
        <h2 className = "text-3xl font-bold font-sans text-primary mb-4" >
            Welcome Back to Knob!
        </h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Username
            <input value={username} onChange={e => setUsername(e.target.value)} type="username" required className='input'/>
          </label>

          <label>
            Password
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required className="input" />
          </label>

          {error && <div style={{ color: 'salmon' }}>{error}</div>}

          <div className="actions">
            <button className="primary" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <Link to="/signup">
              <button className="secondary" type="button">Create account</button>
            </Link>
          </div>
        </form>
         <div className="dots">
          <div className="dot active"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  )
}