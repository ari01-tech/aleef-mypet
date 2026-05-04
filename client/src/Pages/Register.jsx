import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { userSchemaValidation } from "../Validations/UserValidations";

const Register = () => {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const onSubmit = async (data) => {
  try {
    const response = await axios.post("http://localhost:3001/registerUser", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });

    alert(response.data.msg);
    navigate("/login");
  } catch (error) {
    console.log(error);
    alert("Registration failed");
  }
};

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-brand">
          <div className="brand-icon">
            <FaHeart />
          </div>
          <span>Aleef</span>
        </Link>

        <h2>Create Account</h2>
        <p>Join Aleef and help pets find loving homes.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Full Name" {...register("name")} />
          <small>{errors.name?.message}</small>

          <input type="email" placeholder="Email Address" {...register("email")} />
          <small>{errors.email?.message}</small>

          <input type="text" placeholder="Phone Number" {...register("phone")} />
          <small>{errors.phone?.message}</small>

          <input type="password" placeholder="Password" {...register("password")} />
          <small>{errors.password?.message}</small>

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          <small>{errors.confirmPassword?.message}</small>

          <button type="submit" className="auth-btn">Sign Up</button>
        </form>

        <p className="switch-auth">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;