import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { authService } from '../services/api';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Novo estado para confirmação
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      await authService.signup(email, username, password);
      navigate('/login');
    } catch (err: any) {
      // Ajuste a forma como você acessa a mensagem de erro da API
      setError(err.message || 'Failed to sign up'); 
    } finally {
      setLoading(false);
    }
  }

  return (
    // Usa a mesma classe de wrapper de página
    <div className="login-page-wrapper">
      
      {/* Usa a mesma classe de container de formulário */}
      <div className="login-form-container">
        
        {/* Título com a palavra 'Knob' destacada */}
        <h2 className="login-title">
          Join the <span className="highlight-knob">Knob</span> family!
        </h2>
        
        <form onSubmit={handleSubmit} className="auth-form-new">
          
          {/* Campo Email */}
          <div className="input-group">
            {/* Ícone de Email (Assumindo que você tem envelope.png ou similar em /assets/) */}
            <span className="icon-wrapper">
                <img src="/assets/email.png" alt="Email Icon" className="input-icon-img" /> 
            </span>
            <input 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              type="email" 
              required 
              className='styled-input' 
              placeholder="Enter your best email"
            />
          </div>

          {/* Campo Username */}
          <div className="input-group">
            <span className="icon-wrapper">
                <img src="/assets/user.png" alt="User Icon" className="input-icon-img" /> 
            </span>
            <input 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required 
              className='styled-input' 
              placeholder="Create your username"
            />
          </div>

          {/* Campo Password */}
          <div className="input-group">
            <span className="icon-wrapper">
                <img src="/assets/lock2.png" alt="Lock Icon" className="input-icon-img" /> 
            </span>
            <input 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              type="password" 
              required 
              className="styled-input" 
              placeholder="Create a password"
            />
          </div>

          {/* Campo Confirm Password */}
          <div className="input-group">
            <span className="icon-wrapper">
                <img src="/assets/lock.png" alt="Lock Icon" className="input-icon-img" /> 
            </span>
            <input 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
              type="password" 
              required 
              className="styled-input" 
              placeholder="Confirm password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          {/* Botão Sign Up */}
          <button className="login-button" type="submit" disabled={loading}>
            {loading ? 'CREATING...' : 'SIGN UP'}
          </button>
        </form>

        {/* Link para Login (Já tem conta) */}
        <div className="signup-link-container">
          Already have an account? <Link to="/login" className="create-account-link">Login</Link>
        </div>
        
      </div>
    </div>
  );
}