import { useRef, useState, useEffect } from 'react';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

// Tipo para os dados de Season (simplificado do modelo Prisma)
type Season = {
    id_season: number;
    seasonNumber: number;
    name: string;
    posterPath?: string | null;
    voteAverage?: number;
};

// Definição do tipo para as props
interface SeasonsListProps {
    showId: string; // showId vem como string da URL (useParams)
}

// Define o componente que busca e renderiza a lista de temporadas
export default function SeasonsList({ showId }: SeasonsListProps) {
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null); // Tipagem correta para ref

    useEffect(() => {
        let mounted = true;
        
        async function fetchSeasons() {
            setLoading(true);
            try {
                // 🚨 CORREÇÃO: Usando o endpoint implementado no SeasonController
                const res = await fetch(`http://localhost:3000/seasons/shows/${showId}`);
                if (!res.ok) throw new Error('Failed to fetch seasons');
                
                const data: Season[] = await res.json();
                if (mounted) {
                    const sortedSeasons = [...data].sort((a, b) => b.seasonNumber - a.seasonNumber);
                    setSeasons(sortedSeasons); 
                }
            } catch (error) {
                console.error("Error fetching seasons:", error);
                if (mounted) setSeasons([]);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        // Garante que só faz a chamada se o showId for válido
        if (showId) {
            fetchSeasons();
        }

        return () => { mounted = false; };
    }, [showId]); // Depende do showId

    // Função para rolar o contêiner 
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 350; 
            if (direction === 'left') {
                scrollContainerRef.current.scrollLeft -= scrollAmount;
            } else {
                scrollContainerRef.current.scrollLeft += scrollAmount;
            }
        }
    };

    if (loading) {
        return <div style={{ color: '#aaa', padding: '20px' }}>Carregando temporadas...</div>;
    }

    if (seasons.length === 0) {
        return <div style={{ color: '#aaa', padding: '20px' }}>Nenhuma temporada encontrada.</div>;
    }

    return (
        <div className="seasons-container">
            {/* Botão de rolagem para a esquerda */}
            <button className="scroll-btn left" onClick={() => scroll('left')}> &lt; </button>

            {/* Contêiner de rolagem horizontal */}
            <div className="seasons-scroll-track" ref={scrollContainerRef}>
                {seasons.map(season => {
                    const posterSrc = season.posterPath 
                        ? `${IMAGE_BASE_URL}w300${season.posterPath}` 
                        : 'https://placehold.co/300x450/333/fff?text=No+Poster';
                    
                    return (
                        <div key={season.id_season} className="season-card">
                            <div className="season-poster-wrapper">
                                <img 
                                    src={posterSrc} 
                                    alt={`Poster Season ${season.seasonNumber}`} 
                                    className="season-poster"
                                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x450/333/fff?text=No+Poster' }}
                                />
                                {/* Rating flutuante */}
                                {season.voteAverage && season.voteAverage > 0 && (
                                    <div className="season-rating">
                                        {season.voteAverage.toFixed(1)}
                                    </div>
                                )}
                            </div>
                            <div className="season-info">
                                <span className="season-name">{season.name}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Botão de rolagem para a direita */}
            <button className="scroll-btn right" onClick={() => scroll('right')}> &gt; </button>
        </div>
    );
}
