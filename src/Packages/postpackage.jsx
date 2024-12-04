import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activities, setActivities] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "http://localhost:5000/api/v1/packages/post",
        price.length >= 4
          ? {
              title,

              description,
              activities,
              duration,
              price,
            }
          : {
              title,
              description,
              activities,
              duration,
              price,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "admin")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>POST NEW Package</h3>
          <form onSubmit={handleJobPost}>
            <div className="wrapper">
              <label>Package Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="package  Title"
              />
            </div>
            <div className="wrapper">
              <label>Package Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Package Description"
              />

              <label>Activities</label>
              <input
                type="text"
                value={activities}
                onChange={(e) => setActivities(e.target.value)}
                placeholder="Activities"
              />
            </div>
            <label>Duration</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="one weeks"
            />
            <div className="salary_wrapper">
              <label>Price</label>

              <div>
                <input
                  type="number"
                  placeholder="Enter Fixed Salary"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <button type="submit">Create Package</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostJob;
