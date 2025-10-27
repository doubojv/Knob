import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";


const Nav = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  // ✅ Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
          <input
            className="search-input "
            placeholder="Search..."
            />

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
