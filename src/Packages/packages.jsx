import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../index";

const Jobs = () => {
  const [packages, setPackages] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  // Fetch jobs from the backend API
  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/api/v1/packages/getall", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setPackages(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Redirect if the user is not authorized
  if (!isAuthorized) {
    navigateTo("/"); // Redirect to homepage if not authorized
  }

  return (
    <section className="jobs page ">
      <div className="container">
        <h3>ALL AVAILABLE Package</h3>
        <div className="banner">
          {packages.packages &&
            packages.packages.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <div className="content">
                   
                    <div className="text">
                      <p className="title">{element.title}</p>
                      <p>{element.description}</p>
                      <p>{element.activities}</p>
                      <p>{element.duration}</p>
                      <p>{element.price}</p>
                    </div>
                  </div>

                  <Link to={`/packages/${element._id}`}>Package Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;