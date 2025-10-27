import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // 👈 Importe o Link
import '../styles/auth.css';

type Show = {
  id_show: number;
  name: string;
  rating?: number;
  posterPath?: string | null;
  overview?: string | null;
};

export default function TrendingShows() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  // ... (o seu useEffect permanece o mesmo) ...
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch('http://localhost:3000/shows');
        if (!res.ok) throw new Error('remote not available');
        const data = await res.json();
        if (mounted) setShows(data);
      } catch {
        if (mounted)
          setShows([
            // Usando IDs numéricos para a rota
            { id_show: 1, name: 'HOW TO GET AWAY WITH A MURDER', posterPath: 'https://via.placeholder.com/300x180?text=Show+1' },
            { id_show: 2, name: 'STRANGE VIGIL', posterPath: 'https://via.placeholder.com/300x180?text=Show+2' },
            { id_show: 3, name: 'MIDNIGHT TALES', posterPath: 'https://via.placeholder.com/300x180?text=Show+3' },
            { id_show: 4, name: 'CITY LIGHTS', posterPath: 'https://via.placeholder.com/300x180?text=Show+4' },
            { id_show: 5, name: 'THE GREAT RIVER', posterPath: 'https://via.placeholder.com/300x180?text=Show+5' },
            { id_show: 6, name: 'COMEDY HOUR', posterPath: 'https://via.placeholder.com/300x180?text=Show+6' },
          ]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading)
    return <div style={{ padding: 24, textAlign: 'center' }}>Loading trending shows...</div>;

  const visibleShows = shows.slice(0, 6);

  return (
    <div className="trending-section">
      <div className="trending-grid">
        {visibleShows.map((s) => {
          const IMAGE_BASE = 'https://image.tmdb.org/t/p/w300';
          const posterSrc = s.posterPath
            ? s.posterPath.startsWith('http')
              ? s.posterPath
              : `${IMAGE_BASE}${s.posterPath}`
            : null;

          return (
            // 👈 Envolva o card com o Link
            <Link key={s.id_show} to={`/shows/${s.id_show}`} style={{ textDecoration: 'none', color: 'inherit' }}> 
              {/* O `to` deve corresponder ao padrão de rota que você definiu: "/show/:showId" */}
              
              <div className="hero-card card-item"> 
                {posterSrc ? (
                  <img src={posterSrc} alt={s.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
                ) : (
                  <div className="poster-fallback">No image</div>
                )}

              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}