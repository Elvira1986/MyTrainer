import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../pages/Exercises.css";

const FavExercises = () => {
  // get a list of fav exercises and display them
  const [favExercises, setFavExercises] = useState([]);
  const { id } = useParams();

  const getFavExercises = async () => {
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      const response = await fetch("/api/favexercises/favourites", options);
      const data = await response.json();
      // console.log(data);
      if (response.ok) {
        setFavExercises(data);
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFavExercises();
  }, [id]);

  const deleteFavExercises = async (id) => {
    // create fetch option for delete exercises by id
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ exercises_id: id }),
    };
    // console.log(id);
    try {
      const response = await fetch("/api/favexercises/favourites", options);
      if (response.ok) {
        let data = await response.json();
        setFavExercises(data);
        console.log(data);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  };

  return (
    <>
      <h2>Favourites Exercises</h2>
      <div className="favExercises">
        {favExercises.map((favExercise) => (
          <div className="exercise" key={favExercise.id}>
            <img
              src={favExercise.image}
              alt={favExercise.name}
              className="exerciseImage"
            />
            <h3>{favExercise.name}</h3>
            <p>{favExercise.description}</p>
            <button
              type="button"
              onClick={() => deleteFavExercises(favExercise.exercises_id)}
            >
              <i
                className="fa-solid fa-heart-crack fa-fade"
                title="Delete Favourite"
              ></i>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default FavExercises;
