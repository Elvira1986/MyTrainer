import { useState } from "react";
import axios from "axios";

function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    height: 0,
    weight: 0,
    gender: "",
    goal: "",
  });

  const [data, setData] = useState(null);

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

  const register = async () => {
    try {
      const { data } = await axios("/api/auth/register", {
        method: "POST",
        data: credentials,
      });

      //store it locally
      localStorage.setItem("token", data.token);
      console.log(data.message, data.token);
      setData(data.message);
    } catch (error) {
      console.log(error);
      setData(error.message);
    }

    setCredentials({});
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
      console.log(data.message);
    } catch (error) {
      console.log(error);
      setData(error.message);
    }
  };

  return (
    <div>
      <form className="register">
        <div>
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
            <span> Password </span>
            <input
              value={password}
              onChange={handleChange}
              name="password"
              type="password"
              className="form-control mb-2"
            />
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
          <label>
            <span>Goal </span>
            <input
              value={goal}
              onChange={handleChange}
              name="goal"
              type="text"
              className="form-control mb-2"
            />
          </label>
          <div className="d-flex gap-2 justify-content-center">
            <button className="btn btn-primary" onClick={register}>
              Register
            </button>
            <button className="btn btn-outline-dark ml-2" onClick={logout}>
              Log out
            </button>
          </div>
        </div>
        <div className="text-center p-4">
          <button className=" btn btn-outline-primary" onClick={requestData}>
            Go to Profile
          </button>
        </div>0

        {data && (
          <div className="text-center p-4">
            <div className="alert">{data}</div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Register;
