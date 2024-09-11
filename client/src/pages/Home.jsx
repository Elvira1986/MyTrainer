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
    <>
      <div className="intro">
        <h1>Welcome to My Trainer</h1>
        <p>
          We are here for you to change your life and transform your body and
          mind to the best possible way. You can check it out this App to seach
          for your exercises and food recipies that will keep you motivated in
          your journey of long healthy life and "Happy Days" - per Sofia when
          this app works properly.
        </p>
        <p>What is the connection between food and exercise?</p>
        <p>
          There is an undeniable relationship between food and exercise. Food
          provides energy. Exercise burns energy. A good partnership between
          workouts and balanced diet can stimulate positive body changes. Good
          nutrition can help boosting any exercising routine by gaining the lean
          body mass and losing fat. The primary principle for Gym workouts is
          that you stimulate your body for some changes with certain physical
          activities, but it the nutrition that actually helps to process the
          change.
        </p>
        <p>
          This is the list of benefits when you are properly exercise and eat
          healthy food:
        </p>
        <ul>
          <li>
            <i
              className="fa-solid fa-person-circle-check"
              style={{ paddingRight: "20px", marginTop: "10px" }}
            ></i>{" "}
            Weight loss
          </li>
          <li>
            <i
              className="fa-solid fa-heart-pulse"
              style={{ paddingRight: "20px", marginTop: "10px" }}
            ></i>{" "}
            A healthier heart
          </li>
          <li>
            {" "}
            <i
              className="fa-solid fa-shield-virus"
              style={{ paddingRight: "20px", marginTop: "10px" }}
            ></i>{" "}
            A stronger immune system{" "}
          </li>
          <li>
            {" "}
            <i
              className="fa-solid fa-child-reaching"
              style={{ paddingRight: "30px", marginTop: "10px" }}
            ></i>{" "}
            Resist the effects of aging
          </li>
          <li>
            <i
              className="fa-solid fa-face-smile-wink"
              style={{ paddingRight: "25px", marginTop: "10px" }}
            ></i>{" "}
            Less stress
          </li>
          <li>
            <i
              className="fa-solid fa-bed"
              style={{ paddingRight: "20px", marginTop: "10px" }}
            ></i>{" "}
            Improved sleep
          </li>
        </ul>
      </div>

      <div id="Home">
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
    </>
  );
}

export default Home;
