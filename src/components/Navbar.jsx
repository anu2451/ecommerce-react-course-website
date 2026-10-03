import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar(){

    const navigate = useNavigate();
    const { user, logout } = useAuth(); 

    function handleLogout() {
        logout();
        navigate("/auth");
    }


    return <nav className="navbar">
        <div className="navbar-container">
            <Link to="/" className="navbar-brand">
                ShopHub
            </Link>
            <div className="navbar-links">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/checkout" className="navbar-link">Cart</Link>
            </div>
            <div className="navbar-auth">
                {user ? (
                    <div className="navbar-user">
                        <span className="navbar-greeting">Hello, {user.email}</span>
                        <button className="btn btn-secondary" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="navbar-auth-links">
                        <Link to="/auth" className="btn btn-secondary">Login</Link>
                        <Link to="/auth" className="btn btn-primary">Sign Up</Link>
                    </div>
                )}
            </div>
        </div>
    </nav>
}
