import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import "./signup.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Input validation
    if (!name || !phone || !email || !role || !password) {
     toast.error("All fields are required!");
      return;
    }

    try {
      // Debugging: Log the data being sent
      console.log("Request Data:", { name, phone, email, role, password });

      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setName("");
      setEmail("");
      setPhone("");
      setRole("");
      setPassword("");
      setRedirectToLogin(true);
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Registration failed!");
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="register">
      <form action="#" className="register-form" onSubmit={handleRegister}>
        <section className="title">
          <p>Create an Account</p>
        </section>
        <section className="wrapper">
          <section className="left">
            <div className="input-group">
              <label>Register as</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="visitor">Visitor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </section>
          <section className="right">
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </section>
        </section>
        <div className="buttons">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
          <button type="submit" className="add">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;