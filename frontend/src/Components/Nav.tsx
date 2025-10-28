import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import '../styles/auth.css';

interface Show {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
}

const Nav = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Show[]>([]);
  const navigate = useNavigate(); // ✅ usamos para redirecionar

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  const handleSelectShow = async (show: Show) => {
    try {
      // ✅ Envia requisição para salvar o show no banco via backend
      const response = await fetch(`/shows/sync/${show.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar série no banco local");
      }

      // ✅ Pega o show salvo (o backend deve retornar o objeto criado)
      const savedShow = await response.json();
      const localId = savedShow.id_show;

      // Limpa o campo de busca e dropdown
      setSearchResults([]);
      setSearchTerm("");

      // ✅ Redireciona para a página da série
      // Se sua rota ShowPage usa o TMDB ID:
      navigate(`/shows/${localId}`);

      // Caso use o ID interno do banco, use:
      // navigate(`/shows/${savedShow.id}`);
    } catch (error) {
      console.error("Erro ao adicionar show:", error);
    }
  };

  const handleSearch = async (term: string) => {
    if (term.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`/api/search/tmdb?query=${encodeURIComponent(term)}`);
      const data = await response.json();

      const results = data.results
        .map((item: any) => ({
          id: item.id,
          name: item.name,
          overview: item.overview,
          poster_path: item.poster_path,
        }))
        .slice(0, 5);

      setSearchResults(results);
    } catch (error) {
      console.error("Erro ao buscar shows:", error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav>
      <div className="topbar">
        <div className="left">
          <div className="logo-circle">
            <span>Knob</span>
          </div>
          <div className="nav-links">
            <Link to="/shows">SHOWS</Link>
            <Link to="/drama">DRAMA</Link>
            <Link to="/comedy">COMEDY</Link>
            <Link to="/seasons">SEASONS</Link>
          </div>
        </div>

        <div className="right">
          <div className="relative search-container">
            <input
              className="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="search-dropdown">
                {searchResults.map((show) => (
                  <div
                    key={show.id}
                    className="search-item"
                    onClick={() => {
                    handleSelectShow(show);
                    }}
                  >
                    <img
                      src={
                        show.poster_path
                          ? `https://image.tmdb.org/t/p/w92${show.poster_path}`
                          : "https://via.placeholder.com/50x75?text=No+Image"
                      }
                      alt={show.name}
                      className="search-poster"
                    />
                    <span>{show.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <div className="relative user-profile" ref={menuRef}>
              <button
                className="flex items-center gap-2 focus:outline-none"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                    user?.nome ?? "User"
                  )}`}
                  alt="Profile"
                  className="profile-pic"
                />
                <span className="user-name cursor-pointer text-white hover:text-[#f4aa4f]">
                  {user?.nome}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 w-40 bg-[#1f3568] border border-gray-600 rounded-lg shadow-lg z-50 mt-36">
                  <button
                    className="w-full text-left px-4 py-2 text-white hover:bg-[#f4aa4f] hover:text-black transition-colors"
                    onClick={() => alert("Profile em breve!")}
                  >
                    Profile
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-white hover:bg-red-500 hover:text-white transition-colors"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="auth-btn">
                Login
              </Link>
              <Link to="/signup" className="auth-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
