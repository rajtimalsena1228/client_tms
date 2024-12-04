import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
const JobDetails = () => {
  const { id } = useParams();
  const [packages, setpackages] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/packages/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setpackages(res.data.packages);
      })
      .catch((err) => {
        navigateTo("/notfound");
        console.log(err.response.data.message);
      });
  }, [id, navigateTo]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="packagesDetail page">
      <div className="container">
        <h3>Package Details</h3>
        <div className="banner">
          <p>
            Title: <span> {packages.title}</span>
          </p>

         
          <p>
            Description: <span>{packages.description}</span>
          </p>
          <p>
            Activities: <span>{packages.activities}</span>
          </p>
          <p>
            Duration: <span>{packages.duration}</span>
          </p>
          <p>
            Price: <span>{packages.price}</span>
          </p>
          <p>
            packages Posted On: <span>{packages.postedBy}</span>
          </p>
          
          {user && user.role === "admin" ? (
            <></>
          ) : (
            <Link to={`/application/${packages._id}`}>Book</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;