import { NavLink } from "react-router-dom";
import Image from "../assets/404.jpg";
import "./Error404.css";

function Error404() {
  let BackImage = {
    width: "100%",
    minHeight: "500px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${Image})`,
  };

  return (
    <div className="back" style={BackImage}>
      <h1>
        FEELING a little LOST?
        <br />
        DON'T give up on your DREAMS, <br />
        Please, visit{" "}
        <NavLink className="find" to="/">
          JUST DO IT PAGE
        </NavLink>
      </h1>
    </div>
  );
}
export default Error404;
