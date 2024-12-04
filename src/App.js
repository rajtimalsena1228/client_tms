import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import Package from "./pages/Package";

import SignUp from "./pages/Register.jsx"
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { Context } from "./index";
import axios from "axios";
import PostJob from "./Packages/postpackage.jsx";



const PrivateRoutes = () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
function App() {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized, setIsAuthorized, setUser]);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="register" element={<SignUp />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about-us" element={<About />} />
          <Route exact path="/Package" element={<Package />} />
          <Route exact path="/Gallery" element={<Gallery />} />
          <Route exact path="/Contact" element={<Contact />} />
          <Route exact path="/post-package" element={<PostJob />} />
         
          
        
         
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  );
}
export default App;