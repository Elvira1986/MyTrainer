import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
      <h1>Fav Exercises</h1>
      <div
        className="favExercises"
        style={{
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {favExercises.map((favExercise) => (
          <div
            key={favExercise.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={favExercise.image}
              alt={favExercise.name}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
            <h3>{favExercise.name}</h3>
            <button
              type="button"
              onClick={() => deleteFavExercises(favExercise.exercises_id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default FavExercises;
