import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { login } from "../Features/UserSlice";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);

  const handleLogin = () => {
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess && user?.email) {
      navigate("/");
    }
  }, [user, isSuccess, navigate]);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-brand">
          <div className="brand-icon">
            <FaHeart />
          </div>
          <span>Aleef</span>
        </Link>

        <h2>Welcome Back</h2>
        <p>Log in to continue your adoption journey.</p>

        <form>
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setemail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
          />

          <button type="button" className="auth-btn" onClick={handleLogin}>
            Log In
          </button>
        </form>

        <p className="switch-auth">
          No account? <Link to="/signup">Sign Up now.</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;