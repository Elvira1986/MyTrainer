import { useEffect, useState } from "react";

const Exercises = () => {
  // State to hold exercises and favorites
  const [exercises, setExercises] = useState([]);
  const [favorites, setFavorites] = useState([]);
  // State to hold error messages
  const [error, setError] = useState([]);

  // Fetch exercises from the API
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/exercises/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data); // Log the fetched data for debugging
        setExercises(data); // Set the fetched exercises
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      }
    };

    fetchExercises(); // Call the fetch function
  }, []);

  // Handle adding and removing from favorites
  const toggleFavorite = async (exercise) => {
    const isFavorite = favorites.find(
      (fav) => fav.exercise.id === exercise.exercise.id
    );

    if (isFavorite) {
      setFavorites(
        favorites.filter((fav) => fav.exercise.id !== exercise.exercise.id)
      );
      console.log(exercise.id);

      let options = {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await fetch("/api/favexercises/favourites", options);
        console.log(response);
      } catch (err) {
        setError(`Network error: ${error.message}`);
      }
    } else {
      setFavorites([...favorites, exercise]);
      console.log(exercise);
      let options = {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
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
    <div
      style={{
        padding: "20px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
      }}
    >
      {exercises.length === 0 ? (
        <p>No exercises found.</p>
      ) : (
        exercises.map((exercise) => (
          <div
            key={exercise.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={exercise.image}
              alt={exercise.name}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
            <h3>{exercise.name}</h3>
            <p>{exercise.description}</p>
            <button
              className={`favorite-button ${
                favorites.find(
                  (fav) => fav.exercise.id === exercise.exercise.id
                )
                  ? "favorited"
                  : ""
              }`}
              onClick={() => toggleFavorite(exercise)}
            >
              {favorites.find((fav) => fav.exercise.id === exercise.exercise.id)
                ? "Remove"
                : "Add"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Exercises;
