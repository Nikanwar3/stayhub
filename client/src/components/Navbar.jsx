import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <i className="fa-solid fa-house-chimney"></i>
                    <span>StayHub</span>
                </Link>

                <div className="navbar-links">
                    <Link to="/" className="nav-link">
                        Explore
                    </Link>
                    {user ? (
                        <>
                            <Link to="/listings/new" className="nav-link">
                                Host a Place
                            </Link>
                            <div className="nav-user">
                                <span className="nav-greeting">Hi, {user.username}</span>
                                <button onClick={handleLogout} className="btn-logout">
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                            <Link to="/signup" className="btn-signup-nav">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
