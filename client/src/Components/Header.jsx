import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import { logout } from "../Features/UserSlice";
const Header = () => {
    const dispatch = useDispatch();

const handleLogout = () => {
  dispatch(logout());
};
  const location = useLocation();
  const user = useSelector((state) => state.users?.user);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="aleef-navbar">
      <Link to="/" className="brand">
        <div className="brand-icon">
          <FaHeart />
        </div>
        <span>Aleef</span>
      </Link>

      <nav className="nav-links">
        <Link className={isActive("/") ? "active" : ""} to="/">Home</Link>
        <Link className={isActive("/adoption") ? "active" : ""} to="/adoption">Adoption</Link>
        <Link className={isActive("/lost") ? "active" : ""} to="/lost">Lost & Found</Link>
        <Link className={isActive("/about") ? "active" : ""} to="/about">About Us</Link>
      </nav>

      <div className="nav-user">
        {user?.email ? (
          <>
            <span className="avatar">🧕</span>
            <Link to="/profile" className="user-name">{user.name}</Link>
            <button className="logout-btn" onClick={handleLogout}>
  Logout
</button>
          </>
        ) : (
          <>
            <Link to="/signup" className="auth-link">Sign Up</Link>
            <Link to="/login" className="auth-link login-link">Log In</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;