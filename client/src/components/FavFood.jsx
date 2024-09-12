import { useState, useEffect } from "react";
import api from "../services/FavFoodRoutes";
import "../pages/Favourites.css";

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
      console.log(response);
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

  // async function handleFavourite(e) {
  //     console.log("Clicked")
  // }

  return (
    <div id="Favourites">
      <h2>Favourites</h2>

      {selectedFavFood && (
        <div>
          {selectedFavFood.map((food) => (
            <div key={food.recipe.uri}>
              <h2> {food.recipe.label} </h2>
              <div className="healthLabels">
                {food.recipe.healthLabels.length >
                  0 &&
                  food.recipe.healthLabels.map(
                    (label, index) => (
                      <p key={index}>
                        <mark>
                          {""} # {label}{" "}
                        </mark>
                      </p>
                    )
                  )}
              </div>

              <div className="dietLabels">
                {food.recipe.dietLabels.length >
                  0 &&
                  food.recipe.dietLabels.map(
                    (label, index) => (
                      <p key={index}>
                        <mark>
                          {""}# {label}{" "}
                        </mark>
                      </p>
                    )
                  )}
              </div>

              <p>
                Servings: {food.recipe.yield}{" "}
              </p>

              <div className="ingredients">
                {food.recipe.ingredientLines
                  .length > 0 &&
                  food.recipe.ingredientLines.map(
                    (ingredient, index) => (
                      <p key={index}>
                        {ingredient}
                      </p>
                    )
                  )}
              </div>

              {foodImage && (
                <img
                  src={food.recipe.image}
                  alt={food.recipe.label}
                />
              )}

              <p>
                See how to make this delicious
                dish{" "}
                <a href={food.recipe.url}>here</a>
                .
              </p>

              <div className="nutritionGrid">
                <p className="span2cols">
                  NUTRITION GUIDE
                </p>
                <p>Nutrient</p>
                <p>Quantinty</p>
              </div>

              <div id="nutrition-grid">
                {Object.entries(
                  food.recipe.totalNutrients
                ).map(
                  ([key, nutrient], index) => (
                    <div
                      key={index}
                      className="nutritionGrid"
                    >
                      <p>{nutrient.label}</p>
                      <p>
                        {Math.round(
                          nutrient.quantity
                        )}{" "}
                        {nutrient.unit}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {allFavFood && (
        <div>
          {allFavFood.map((food) => (
            <div key={food.id}>
              <div
                onClick={() => handleSelect(food)}
              >
                <h3> {food.name} </h3>
                <img
                  src={food.image}
                  alt={food.name}
                />
              </div>
              <br />
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
