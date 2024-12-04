// import React from 'react'
// import img from '../image/logo TM1.png'
// import { Link } from 'react-router-dom'
// import { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { Context } from "../index";
// import axios from "axios";

// const Header = () => {
//   const [show, setShow] = useState(false);
//   const [searchKeyword, setSearchKeyword] = useState(""); // Add state for search keyword
//   const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("useEffect triggered");

//     const savedUser = localStorage.getItem("user");
//     const savedIsAuthorized = localStorage.getItem("isAuthorized");
//     const token = localStorage.getItem("token");

//     console.log("Saved User:", savedUser);
//     console.log("Saved IsAuthorized:", savedIsAuthorized);
//     console.log("Saved Token:", token);
//     if (savedUser && savedIsAuthorized && token) {
//       setUser(JSON.parse(savedUser));
//       setIsAuthorized(JSON.parse(savedIsAuthorized));
//       console.log("User is authenticated, restoring session...");
//     } else {
//       console.log("No valid session, logging out...");
//       handleLogout(); // If no valid session, force logout
//     }
//   }, []);
//   const handleLogout = async () => {
//     console.log("Logging out..."); // Debug log

//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/v1/user/logout",
//         {
//           withCredentials: true,
//         }
//       );

//       console.log("Logout Response:", response); // Debug log
//       toast.success(response.data.message);
//       setIsAuthorized(false);
//       setUser(null);

//       // Clear the localStorage
//       localStorage.removeItem("user");
//       localStorage.removeItem("isAuthorized");
//       localStorage.removeItem("token"); // Remove token if stored

//       // Verify that localStorage was cleared
//       console.log("LocalStorage after logout:", localStorage); // Debug log

//       // Redirect to login page after logout
//       navigate("/");
//     } catch (error) {
//       console.error("Logout Error:", error); // Debug log
//       toast.error(error.response?.data?.message || "Logout failed");
//       setIsAuthorized(true);
//     }
//   };

//   function openNav() {
//     document.getElementById("mySidenav").style.width = "100%";
//     document.getElementById("main").style.marginLeft = "250px";
//   }

//   function closeNav() {
//     document.getElementById("mySidenav").style.width = "0";
//     document.getElementById("main").style.marginLeft = "0";
//   }

//   return (
//       <>
//         <section className="nav-bar" id='header'>
//           <div className="logo">
//             <img className="" src={img} style={{ height: '100px', width: '250px',position:'relative', bottom:'12px' }} alt='about' />
//           </div>
//           <ul className="menu1">
//             <li><Link className='underline active' to="/home">home</Link></li>
//             <li><Link className='underline' to="/about-us">about</Link></li>
//             <li><Link className='underline' to="/Package">Package</Link></li>
//             <li><Link className='underline' to="/Gallery">gallery</Link></li>
//             <li><Link className='underline' to="/Contact">Contact us</Link></li>
//             {user && user.role === "admin" && (
//             <>
//               <li>
//                 <Link to={"/post-package"} onClick={() => setShow(true)}>
//                   Post package
//                 </Link>
//               </li>
//               <li>
//                 <Link to={"/view-package"} onClick={() => setShow(true)}>
//                   Total Users
//                 </Link>
//               </li>
//             </>
//           )}
//             {/* Conditionally render logout or login button */}
//           {isAuthorized ? (
//             <button onClick={handleLogout}>Logout</button>
//           ) : (
//             <li>
//               <Link to="/Login" className="btn">
//                 Login
//               </Link>
//             </li>
//           )}
//             {/* <li><Link className='underline ' to="/Register">Login/Register</Link></li> */}
//           </ul>
//         </section>
//         <div id="header1">
//           <div id="mySidenav" className="sidenav" >
//             <Link
//               // to="javascript:void(0)"
//               className="closebtn"
//               onClick={closeNav}
//             >
//               ×
//             </Link>
//             <ul className="">
//               <li><Link to="/home"  onClick={closeNav}>home</Link></li>
//               <li><Link to="/about-us"  onClick={closeNav}>about</Link></li>
//               <li><Link to="/Package"  onClick={closeNav}>Package</Link></li>
//               <li><Link to="/Gallery"  onClick={closeNav}>gallery</Link></li>
//               <li><Link to="/Contact"  onClick={closeNav}>Contact us</Link></li>
//               <li><Link to="/Login"  onClick={closeNav}>login</Link></li>
//             </ul>
//           </div>
//           <div id="main">
           
//             <span style={{ fontSize: 30, cursor: "pointer", float: 'right' }} onClick={openNav}>
//               <img
//                 src={img}
//                 style={{ height: '60px', width: '150px', position: 'relative', right: '178px' }}
//                 alt="Bootstrap"
//               />
//               ☰
//             </span>
//           </div>
//         </div>

//       </>
//   )
// }

// export default Header

import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../image/logo TM1.png";
import toast from "react-hot-toast";
import axios from "axios";
import { Context } from "../index";

const Header = () => {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigate = useNavigate();

  // Restore session on mount
  useEffect(() => {
    console.log("useEffect triggered");

    const savedUser = localStorage.getItem("user");
    const savedIsAuthorized = localStorage.getItem("isAuthorized");
    const token = localStorage.getItem("token");

    console.log("Saved User:", savedUser);
    console.log("Saved IsAuthorized:", savedIsAuthorized);
    console.log("Saved Token:", token);
    if (savedUser && savedIsAuthorized && token) {
      setUser(JSON.parse(savedUser));
      setIsAuthorized(JSON.parse(savedIsAuthorized));
      console.log("User is authenticated, restoring session...");
    } else {
      console.log("No valid session, logging out...");
      handleLogout(); // If no valid session, force logout
    }
  }, []);

  const handleLogout = async () => {
    console.log("Logging out..."); // Debug log

    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );

      console.log("Logout Response:", response); // Debug log
      toast.success(response.data.message);
      setIsAuthorized(false);
      setUser(null);

      // Clear the localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthorized");
      localStorage.removeItem("token"); // Remove token if stored

      // Verify that localStorage was cleared
      console.log("LocalStorage after logout:", localStorage); // Debug log

      // Redirect to login page after logout
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error); // Debug log
      toast.error(error.response?.data?.message || "Logout failed");
      setIsAuthorized(true);
    }
  };

  return (
    <section className="nav-bar" id="header">
      <div className="logo">
        <img src={img} alt="Logo" style={{ height: "100px", width: "250px" }} />
      </div>
      <ul className="menu1">
        <li>
          <Link className="underline active" to="/home">
            Home
          </Link>
        </li>
        <li>
          <Link className="underline" to="/about-us">
            About
          </Link>
        </li>
        <li>
          <Link className="underline" to="/Package">
            Package
          </Link>
        </li>
        <li>
          <Link className="underline" to="/Gallery">
            Gallery
          </Link>
        </li>
        <li>
          <Link className="underline" to="/Contact">
            Contact Us
          </Link>
        </li>

        {/* Admin-specific links */}
        {user?.role === "admin" && (
          <>
            <li>
              <Link to="/post-package">Post Package</Link>
            </li>
            <li>
              <Link to="/view-package">Total Users</Link>
            </li>
          </>
        )}

        {/* Conditionally render login/logout */}
        {isAuthorized ? (
          <button onClick={handleLogout} className="btn">
            Logout
          </button>
        ) : (
          <li>
            <Link to="/" className="btn">
              Login
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
};

export default Header;
