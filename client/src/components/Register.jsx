import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../pages/Login.css";

function Register() {
  const initialCredentials = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    height: 0,
    weight: 0,
    gender: "",
    goal: "",
  };

  const [credentials, setCredentials] = useState(initialCredentials);

  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const {
    username,
    password,
    first_name,
    last_name,
    height,
    weight,
    gender,
    goal,
  } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios("/api/auth/register", {
        method: "POST",
        data: credentials,
      });
      setData(data.message);
      //navigate(`/profile`)
    } catch (error) {
      console.log(error);
      setData(error.message);
    }
    setCredentials(initialCredentials);
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  const requestData = async () => {
    try {
      const { data } = await axios("/api/auth/profile", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setData(data.message);
      setUserData(data.user);
      console.log(data.message);
    } catch (error) {
      console.log(error);
      setData(error.message);
    }
  };

  return (
    <div id="Register">
      <div>
        <form className="register" onSubmit={register}>
          <label>
            <span>Username</span>
            <input
              value={username}
              onChange={handleChange}
              name="username"
              type="text"
              className="form-control mb-2"
            />
          </label>
          <label>
            <span> Password </span>{" "}
            <input
              value={password}
              onChange={handleChange}
              name="password"
              type="password"
              className="form-control mb-2"
            />{" "}
          </label>

          <label>
            <span>First Name </span>
            <input
              value={first_name}
              onChange={handleChange}
              name="first_name"
              type="text"
              className="form-control mb-2"
            />
          </label>
          <label>
            <span>Last Name</span>
            <input
              value={last_name}
              onChange={handleChange}
              name="last_name"
              type="text"
              className="form-control mb-2"
            />
          </label>
          <label>
            <span>Height</span>
            <input
              value={height}
              onChange={handleChange}
              name="height"
              type="number"
              className="form-control mb-2"
            />
          </label>
          <label>
            <span>Weight </span>
            <input
              value={weight}
              onChange={handleChange}
              name="weight"
              type="number"
              className="form-control mb-2"
            />
          </label>
          <label>
            <span>Gender </span>
            <input
              value={gender}
              onChange={handleChange}
              name="gender"
              type="text"
              className="form-control mb-2"
            />
          </label>
          <label className="selectRegistration">
            Goal
            {
              <select
                value={goal}
                onChange={handleChange}
                name="goal"
                type="text"
                className="form-control mb-2"
              >
                <option value="Loose Weight">Loose Weight</option>
                <option value="Get fit">Get fit</option>
                <option value="Increase strength">Increase strength</option>
                <option value="Gain weight">Gain weight</option>
              </select>
            }
          </label>
          <div className="d-flex gap-2 justify-content-center">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
