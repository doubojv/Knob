import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Nav from './Components/Nav'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import './index.css'
import './styles/auth.css'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

function Home() {
  return (
    <div className="hero-frame">
      <div className="hero-card">
        <h2>Welcome to Knob</h2>
        <p>Your personal TV show tracker</p>
        <div className="actions" style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link to="/signup"><button className="primary">Get Started</button></Link>
          <Link to="/login"><button className="secondary">Login</button></Link>
        </div>
      </div>
    </div>
  )
}

export default App