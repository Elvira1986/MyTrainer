import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Favourites from "./pages/Favourites.jsx";
import Exercises from "./pages/Exercises.jsx";
import Meals from "./pages/Meals.jsx";
import Error404 from "./pages/Error404.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";
import AuthContext from "./contexts/AuthContext.jsx";
import { useState } from "react";
import RequiresAuth from "./components/RequiresAuth.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  function signin() {
    setIsLoggedIn(true);
  }

  function signout() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  }

  const AuthObject = { isLoggedIn, signin, signout };

  return (
    <AuthContext.Provider value={AuthObject}>
      <>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <RequiresAuth>
                  <Profile />
                </RequiresAuth>
              }
            />
            <Route
              path="/favourites"
              element={
                <RequiresAuth>
                  <Favourites />
                </RequiresAuth>
              }
            />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
          <Footer />
        </div>
      </>
    </AuthContext.Provider>
  );
}

export default App;
