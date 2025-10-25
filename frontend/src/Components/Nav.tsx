import {Link} from "react-router-dom";

const Nav = () => {
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
                <input className="search-input" placeholder="Search..." />
                <Link to="/login" className="auth-btn">Login</Link>
                <Link to="/signup" className="auth-btn">Sign Up</Link>
            </div>
        </div>
    </nav>
);
}
export default Nav;