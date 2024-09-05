import { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="Logo">
        <img src={Logo} alt="Logo" />
      </Link>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/" className="home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/favourites">Favourites</NavLink>
        </li>
        <li>
          <NavLink to="/exercises">Exercises</NavLink>
        </li>
        <li>
          <NavLink to="/meals">Meals</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
