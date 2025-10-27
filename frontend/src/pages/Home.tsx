import { useEffect } from 'react'
import '../styles/auth.css'
import TrendingShows from '../Components/TrendingShows'
import { useAuth } from '../contexts/AuthContext'

export default function Home() {
  const { user } = useAuth()

  useEffect(() => {
    document.title = 'Knob'
  }, [])
  

  return (
    <div className="hero-frame">
      <div className="home-container">
        {/* Título centralizado */}
        <h2 className="text-3xl font-bold font-sans text-primary mb-4 -mt-30 text-white"style={{ fontSize: '20px'}}>
          Hello, <span className="font-semibold text-indigo-600" style={{ color: '#f38221' }}> {user?.nome ?? 'Guest'}</span>! See what TV shows are trending right now!
        </h2>

        {/* Título da seção “Trending” alinhado à esquerda */}
        <div className="trending-header mt-5">
          <h3 className="trending-title text-white "style={{ fontSize: '25px'}}>Trending</h3>
        </div>

        {/* Grid */}
        <div className="trending-wrapper -mt-5">
          <TrendingShows />
        </div>
      </div>
    </div>
  )
}
