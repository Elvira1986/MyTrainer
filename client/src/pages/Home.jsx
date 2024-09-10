import { useState } from "react";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import Modal from "../components/Modal.jsx";

function Home() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Functions to toggle visibility
  const handleRegister = () => {
    setShowRegister(true);
    setShowLogin(false); // Optionally hide Login when Register is shown
  };

  const handleLogin = () => {
    setShowLogin(true);
    setShowRegister(false); // Optionally hide Register when Login is shown
  };

  const closeModal = () => {
    setShowRegister(false);
    setShowLogin(false);
  };

  return (
    <div id="Home">
      <h1>Welcome to MyTrainer</h1>
      <button onClick={handleRegister}>Register</button>
      <br />
      <button onClick={handleLogin}>Log In</button>

      {showRegister && (
        <Modal onClose={closeModal}>
          <Register />
        </Modal>
      )}
      {showLogin && (
        <Modal onClose={closeModal}>
          <Login />
        </Modal>
      )}
    </div>
  );
}

export default Home;
