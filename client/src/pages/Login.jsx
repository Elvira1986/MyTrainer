import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal.jsx";
import Register from "../components/Register.jsx";
import AuthContext from "../contexts/AuthContext";
import "./Login.css";

function Login() {
  const [showRegister, setShowRegister] = useState(false);

  const { signin, isLoggedIn } = useContext(AuthContext);

  // Functions to toggle visibility
  const handleRegister = () => {
    setShowRegister(true);
  };

  const closeModal = () => {
    setShowRegister(false);
  };

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "name",
    password: "name",
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
      <h1>Log In to My Trainer</h1>
      <div className="LoginCard">
        <div className="login">
          <label className="loginLebel">Your Username </label>
          <input
            className="loginInput"
            value={username}
            onChange={handleChange}
            name="username"
            type="text"
          />

          <label className="loginLebel">Your Password</label>
          <input
            className="loginInput"
            value={password}
            onChange={handleChange}
            name="password"
            type="password"
          />

          <div className="loginLebel">
            {" "}
            {isLoggedIn ? "You are logged in" : "Please, login"}
          </div>
          <div className="d-flex gap-2 justify-content-center">
            <button onClick={login}>Log in</button>
          </div>
        </div>

        {data && (
          <div className="text-center p-4">
            <div className="alert">{data}</div>
          </div>
        )}

        <div id="register" className="registerLogin">
          <p className="loginLebel">Don’t have an account?</p>
          <button onClick={handleRegister}>Register</button>
          <br />
          {showRegister && (
            <Modal onClose={closeModal}>
              <Register />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
