import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Components/Nav'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import './index.css'
import './styles/auth.css'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'
import ShowPage from './pages/ShowPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/shows/:showId" element={<ShowPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}


export default App