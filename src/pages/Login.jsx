import { Link, Navigate } from "react-router-dom"; // Use useNavigate for redirection
import axios from "axios";
import toast from "react-hot-toast";
import "./login.css";
import { useState } from "react";
import logo from "../image//NEPAL/logo.png";
import { Context } from "../index";
import {  useContext } from "react";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
     

      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/home"} />;
  }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="login-card">
            <div className="header">
              <h3>Welcome Back</h3>
              <h2>Log in to your account</h2>
            </div>
            <form onSubmit={handleLogin}>
              <div className="inputTag">
                <label>Login As</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="visitor">Visitor</option>
                </select>
              </div>
              <div className="inputTag">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="inputTag">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              <Link to="/register" className="register-link">
                Register Now
              </Link>
            </form>
          </div>
        </div>
        <div className="banner">
        <img
                        src={logo}
                       
                        style={{ height: "60vh", opacity: "999" }}
                        alt="First slide"
                      />
        </div>
      </section>
    </>
  );
};

export default Login;
