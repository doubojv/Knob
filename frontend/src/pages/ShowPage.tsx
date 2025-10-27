import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/showPage.css'; // Você precisará criar este arquivo CSS
import SeasonsList from '../Components/SeasonList';

// Define o tipo TypeScript para o Show, espelhando seu modelo Prisma
type ShowDetail = {
  id_show: number;
  tmdbId: number;
  name: string;
  originalName?: string;
  posterPath?: string | null;
  backdropPath?: string | null;
  overview?: string;
  firstAirDate?: string; // Usaremos string para a data
  numberOfSeasons?: number;
  numberOfEpisodes?: number;
  // Esses campos são JSON no seu modelo, então os tratamos como arrays (ou any, se for complexo)
  creators?: any[]; 
  cast?: any[];
  genres?: any[];
  voteAverage?: number;
  status?: string;
  tagline?: string;
};

// URL base para imagens do TMDB
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

export default function ShowPage() {
  // Pega o parâmetro 'showId' da URL /show/:showId
  const { showId } = useParams<{ showId: string }>(); 
  
  const [show, setShow] = useState<ShowDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchShowDetails() {
      if (!showId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        // Assume que seu backend retorna os detalhes do show
        const res = await fetch(`http://localhost:3000/shows/${showId}`);
        
        if (!res.ok) {
          throw new Error(`Show ID ${showId} not found or server error.`);
        }
        
        const data: ShowDetail = await res.json();
        
        // Formata a data se existir
        if (data.firstAirDate) {
            data.firstAirDate = new Date(data.firstAirDate).getFullYear().toString();
        }

        if (mounted) {
          setShow(data);
        }
      } catch (err: any) {
        console.error("Erro ao buscar detalhes do show:", err);
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchShowDetails();

    return () => {
      mounted = false;
    };
  }, [showId]);

  // --- Renderização Condicional ---

  if (loading) {
    return <div className="show-page-container loading">Carregando detalhes do Show...</div>;
  }

  if (error) {
    return <div className="show-page-container error">Erro: {error}</div>;
  }

  if (!show) {
    return <div className="show-page-container not-found">Show não encontrado.</div>;
  }

  // Desestruturando o show para facilitar o uso
  const {
    id_show,
    name, overview, firstAirDate, numberOfSeasons, 
    numberOfEpisodes, voteAverage, creators, genres, 
    backdropPath, posterPath, status, tagline
  } = show;

  // Renderização principal do componente
  return (
    <div className="show-page-container">
      {/* Seção de Fundo (Backdrop) */}
      <div 
        className="backdrop" 
        style={{ 
          backgroundImage: backdropPath 
            ? `url(${IMAGE_BASE_URL}w1280${backdropPath})` 
            : 'none' 
        }}
      >
        <div className="overlay"></div>
      </div>

      {/* Conteúdo Principal do Show (Layout da imagem Game of Thrones) */}
      <div className="show-content-wrapper">
        <div className="show-header">
            {/* Coluna da Imagem/Poster */}
            <div className="poster-col">
                <img 
                    src={posterPath ? `${IMAGE_BASE_URL}w300${posterPath}` : '/placeholder.jpg'} 
                    alt={name} 
                    className="show-poster"
                />
            </div>

            {/* Coluna de Texto e Detalhes */}
            <div className="details-col">
                <h1 className="show-title text-white">{name}</h1>
                
                {tagline && <p className="tagline">"{tagline}"</p>}

                <div className="show-meta">
                    {firstAirDate && <span>{firstAirDate}</span>}
                    {numberOfSeasons && <span>{numberOfSeasons} season{numberOfSeasons > 1 ? 's' : ''}</span>}
                    {numberOfEpisodes && <span>{numberOfEpisodes} episode{numberOfEpisodes > 1 ? 's' : ''}</span>}
                    {/* Exibir o status, se for relevante */}
                    {status && <span className={`status ${status.toLowerCase()}`}>{status}</span>}
                </div>

                {/* Criadores (Exemplo: David Benioff, D.B. Weiss) */}
                {creators && creators.length > 0 && (
                    <p className="show-info-line">
                        <span className="info-label">Creators:</span> 
                        {/* Assumindo que creators é um array de objetos com a propriedade 'name' */}
                        {creators.map((c: any) => c.name).join(', ')}
                    </p>
                )}
                
                {/* Gêneros */}
                {genres && genres.length > 0 && (
                    <p className="show-info-line">
                        <span className="info-label">Genres:</span> 
                        {genres.map((g: any) => g.name).join(' | ')}
                    </p>
                )}

                {/* Sinopse */}
                <p className="overview-text">{overview}</p>

                <div className="actions-section">
                    <div className="rating-pill">
                        {voteAverage ? voteAverage.toFixed(2) : 'N/A'}
                    </div>
                    {/* Botões de Ação (Review, Favorite, Watchlist) */}
                    <div className="user-actions">
                        <button className="action-btn">Review</button>
                        <button className="action-btn">Favorite</button>
                        <button className="action-btn">Watchlist</button>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Outras Seções (Temporadas, Elenco, etc.) */}
        <div className="additional-sections">
            <h2 className="section-title">Seasons</h2>
            {/* 👈 REMOVA ESTE COMENTÁRIO E CHAME O NOVO COMPONENTE */}
            <SeasonsList showId={id_show.toString()} />
        </div>

      </div>
    </div>
  );
}