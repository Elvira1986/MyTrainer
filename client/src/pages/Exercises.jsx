import { useEffect, useState } from "react";
import "./Exercises.css";

const Exercises = () => {
  // State to hold exercises and favorites
  const [exercises, setExercises] = useState([]);

  // State to hold the list of favorite exercises
  const [favorites, setFavorites] = useState([]);
  // State to hold error messages
  const [error, setError] = useState("");

  // Fetch exercises from the API
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/exercises/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log(data); // Log the fetched data for debugging
        setExercises(data); // Set the fetched exercises
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      }
    };

    fetchExercises(); // Call the fetch function
  }, []);

  // Handle adding and removing exercises from favorites
  const toggleFavorite = async (exercise) => {
    const isFavorite = favorites.find((fav) => fav.id === exercise.id);

    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== exercise.id));
      console.log(exercise.id);

      let options = {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ exercises_id: exercise.id }),
      };
      try {
        const response = await fetch("/api/favexercises/favourites", options);
        console.log(response);
      } catch (error) {
        setError(`Network error: ${error.message}`);
      }
    } else {
      setFavorites([...favorites, exercise]);
      console.log(exercise.id);
      let options = {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ exercises_id: exercise.id }),
      };
      try {
        const response = await fetch("/api/favexercises/favourites", options);
        console.log(response);
      } catch (err) {
        setError(`Network error: ${error.message}`);
      }
    }
  };

  // Render the exercise cards
  return (
    <>
      <h1>Check Out The Most Popular Exercises</h1>
      <div className="exercises">
        {exercises.length === 0 ? (
          <p>No exercises found.</p>
        ) : (
          exercises.map((exercise) => (
            <div key={exercise.id} className="exercise">
              <img
                src={exercise.image}
                alt={exercise.name}
                className="exerciseImage"
              />
              <h3>{exercise.name}</h3>

              <p>{exercise.description}</p>
              <p>
                <span>
                  <i className="fa-solid fa-universal-access"></i>{" "}
                  {exercise.goal}
                  <br />
                </span>
                <span>
                  <i className="fa-solid fa-dumbbell"></i> {exercise.equipment}
                </span>
              </p>

              <button
                className={`favorite-button ${
                  favorites.find((fav) => fav.id === exercise.id)
                    ? "favorited"
                    : ""
                }`}
                onClick={() => toggleFavorite(exercise)}
              >
                {favorites.find((fav) => fav.id === exercise.id) ? (
                  <i
                    className="fa-solid fa-heart-circle-minus"
                    title="Remove From Fav"
                    style={{ color: "#118ab2" }}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-heart-circle-plus"
                    title="Add To Favorite"
                  ></i>
                )}
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Exercises;
