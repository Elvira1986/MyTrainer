import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal.jsx";
import Register from "../components/Register.jsx";
import AuthContext from "../contexts/AuthContext";

function Login() {
  const [showRegister, setShowRegister] = useState(false);

  const { signin, isLoggedIn } = useContext(AuthContext);

  // Functions to toggle visibility
  const handleRegister = () => {
    setShowRegister(true);
    setShowLogin(false); // Optionally hide Login when Register is shown
  };

  const closeModal = () => {
    setShowRegister(false);
  };

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "Username",
    password: "****",
  });

  const [data, setData] = useState(null);

  const { username, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios("/api/auth/login", {
        method: "POST",
        data: credentials,
      });

      //store it locally
      localStorage.setItem("token", data.token);
      console.log(data.message, data.token);
      signin();
      setData(data.message);
      navigate(`/profile`);
    } catch (error) {
      console.log(error);
      setData(error.message);
    }
  };

  // const logout = () => {
  //   localStorage.removeItem("token");
  // };

  // const requestData = async () => {
  //   try {
  //     const { data } = await axios("/api/auth/profile", {
  //       headers: {
  //         authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //     });
  //     setData(data.message);
  //     console.log(data.message);
  //   } catch (error) {
  //     console.log(error);
  //     setData(error.message);
  //   }
  // };

  return (
    <>
      <div>
        <div>
          <input
            className="login"
            value={username}
            onChange={handleChange}
            name="username"
            type="text"
          />
          <input
            className="login"
            value={password}
            onChange={handleChange}
            name="password"
            type="password"
          />
          <div> {isLoggedIn ? "You are logged in" : "Please, login"}</div>
          <div className="d-flex gap-2 justify-content-center">
            <button className="btn btn-primary" onClick={login}>
              Log in
            </button>
          </div>
        </div>

        {data && (
          <div className="text-center p-4">
            <div className="alert">{data}</div>
          </div>
        )}
      </div>

      <div id="hello">
        <button onClick={handleRegister}>Register</button>
        <br />
        {showRegister && (
          <Modal onClose={closeModal}>
            <Register />
          </Modal>
        )}
      </div>
    </>
  );
}

export default Login;
