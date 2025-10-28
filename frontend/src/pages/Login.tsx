import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { authService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
// Importe ícones se estiver usando (ex: react-icons)
// import { FaUser, FaLock } from 'react-icons/fa'; // Exemplo

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Novo estado
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(username, password);
      if (!response.user) throw new Error('Invalid credentials');
      
      setUser(response.user);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    // Remova 'hero-frame' se for o wrapper de fundo da tela
    <div className="login-page-wrapper"> 
      
      {/* Novo hero-card / form-container com o fundo azul escuro */}
      <div className="login-form-container">
        
        {/* Título com a palavra 'Knob' destacada */}
        <h2 className="login-title">
          Welcome back to <span className="highlight-knob">Knob</span>!
        </h2>

        <form onSubmit={handleSubmit} className="auth-form-new">
          
          {/* Campo Username */}
          <div className="input-group">
            <img src="/assets/user.png" alt="User Icon" className="input-icon" />
            <input 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              type="username" 
              required 
              className='styled-input' 
              placeholder="Enter your username"
            />
          </div>

          {/* Campo Password */}
          <div className="input-group">
            <img src="/assets/lock.png" alt="Lock Icon" className="input-icon" />
            <input 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              type="password" 
              required 
              className="styled-input" 
              placeholder="********"
            />
          </div>

          {/* Opções (Remember Me / Forgot Password) */}
          <div className="options-row">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={rememberMe} 
                onChange={e => setRememberMe(e.target.checked)} 
              />
              Remember Me
            </label>
            <Link to="/forgot-password" className="forgot-password-link">
              Forget your password?
            </Link>
          </div>

          {error && <div className="error-message">{error}</div>}

          {/* Botão de Login (Primário) */}
          <button className="login-button" type="submit" disabled={loading}>
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>

        {/* Link para Criar Conta (Secundário/Bottom) */}
        <div className="signup-link-container">
          Don't have an account? <Link to="/signup" className="create-account-link">Create account</Link>
        </div>
        
      </div>
    </div>
  );
}