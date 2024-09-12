import { useState, useEffect } from "react";
import api from "../services/FavFoodRoutes";
import "../pages/Favourites.css";
import FoodDetails from "./FoodDetails";
import Modal from "./Modal";

function Favourites() {
  const [allFavFood, setAllFavFood] = useState(
    []
  );
  const [selectedFavFood, setSelectedFavFood] =
    useState([]);
  const [error, setError] = useState(null);
  const [foodImage, setFoodImage] = useState("");

  async function getAllFavFood() {
    api.getFood((response) => {
      setAllFavFood(response);
    }, console.log);
  }

  useEffect(() => {
    getAllFavFood(); // Fetch fav chicken recipes
  }, []);

  async function handleDelete(food) {
    let recipe = food;
    console.log(recipe);
    api.deleteFood(
      recipe.external_api_id,
      (response) => {
        console.log(response, err);
        setAllFavFood(response.data);
      }
    );
  }

  async function handleSelect(food) {
    setSelectedFavFood([]);

    const apiId = "58badc2e";
    const apiKey =
      "2025bd60b7b10bf5334ca6e1f1b6a5d2";

    let foodId = food.external_api_id.slice(44);

    let url = `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23${foodId}&app_id=${apiId}&app_key=${apiKey}`;

    try {
      // Make the GET request to fail. This try catch is used to check for errors
      let request = await fetch(url);
      if (request.ok) {
        // Server accepted my request; wait for data (sent as JSON)
        let response = await request.json();
        // Save it in state
        console.log(response.hits);
        setSelectedFavFood(response.hits);
        setFoodImage(food.image);
      } else {
        setError(
          `Server error: ${request.status} ${request.statusText}`
        );
      }
    } catch (error) {
      setError(`Network error: ${error.message}`);
    }

    console.log("Clicked", food);
  }

  const closeModal = () => {
    setSelectedFavFood(false);
  };

  return (
    <div id="Favourites">
      <h2>Favourites</h2>

      <div>
        {selectedFavFood && (
          <Modal onClose={closeModal}>
            <FoodDetails
              selectedFavFood={selectedFavFood}
              foodImage={foodImage}
            />
          </Modal>
        )}
      </div>

      {allFavFood && (
        <div>
          {allFavFood.map((food) => (
            <div key={food.id}>
              <div>
                <h3> {food.name} </h3>
                <img
                  src={food.image}
                  alt={food.name}
                />
              </div>
              <br />
              <button
                onClick={() => handleSelect(food)}
              >
                See more
              </button>
              <button
                onClick={() => handleDelete(food)}
              >
                DEL
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Favourites;
