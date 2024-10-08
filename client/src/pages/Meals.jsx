import {
  useState,
  useEffect,
  useContext,
} from "react";
import api from "../services/FavFoodRoutes";
import FoodDetails from "../components/FoodDetails.jsx";
import "./Meals.css"; // External CSS file
import AuthContext from "../contexts/AuthContext";

function Meals() {
  // State to hold the search query entered by the user
  const [query, setQuery] = useState("");

  // State to hold the selected diet filter (e.g., balanced, high-protein)
  const [diet, setDiet] = useState("");

  // State to hold the selected allergy filter (e.g., gluten-free, dairy-free)
  const [allergies, setAllergies] = useState("");

  // State to hold the list of recipes returned from the API
  const [recipes, setRecipes] = useState([]);

  // State to hold the list of favorite recipes
  const [favorites, setFavorites] = useState([]);

  // State to hold loading status
  const [loading, setLoading] = useState(false);

  // State to hold error messages
  const [error, setError] = useState("");

  // assign Context to the Favorite button
  const { isLoggedIn } = useContext(AuthContext);

  const [foodImage, setFoodImage] = useState("");
  const [selectedFood, setSelectedFood] =
    useState([]);

  // Function to handle the API request and fetch recipes based on the user's input
  const searchRecipes = async (
    random = false
  ) => {
    setError("");

    const apiId = "7828a26c"; // Use your application ID for the EDAMAM API
    const apiKey =
      "af250104f405a82bf082713bef547173"; // Use your application key for the EDAMAM API

    // Construct the API URL with the query, diet, and allergy parameters
    let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${apiId}&app_key=${apiKey}`;

    // Fetching chicken recipes on initial load

    if (random) {
      // if random is true search chicken else .... What is random and where do you declare it??
      url += `&q=chicken`;
    } else if (query) {
      url += `&q=${query}`;
    }

    if (diet) {
      url += `&diet=${diet}`;
    }
    if (allergies) {
      url += `&health=${allergies}`;
    }

    setLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Error: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();

      if (data.hits.length === 0) {
        setError(
          "No recipes found. Please try a different query or filters."
        );
        setRecipes([]);
      } else {
        setRecipes(data.hits);
      }
    } catch (error) {
      console.error(
        "Error fetching data:",
        error
      );
      setError(
        "Failed to fetch recipes. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  // Pre-populate chicken recipes when the component mounts
  useEffect(() => {
    searchRecipes(true); // Fetch chicken recipes on initial load
  }, []);

  async function handleFavFood(recipe) {
    api.postFood(recipe, (response) => {
      setFavorites(response.data);
      setError(err);
    });
  }

  async function handleDelFavFood(recipe) {
    api.deleteFood(
      recipe.recipe.uri,
      (response) => {
        setFavorites(response.data);
        setError(err);
      }
    );
  }

  async function handleSelect(recipe) {
    setFoodImage(recipe.recipe.image);
    setSelectedFood([recipe]);
  }

  return (
    <div className="meals-container">
      <h1>Search for Recipes</h1>

      <div className="search-controls">
        {/* Input field for the user to type in a search query */}
        <input
          className="search"
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
        />

        {/* Dropdown menu for selecting a diet filter */}
        <select
          className="search"
          value={diet}
          onChange={(e) =>
            setDiet(e.target.value)
          }
        >
          <option value="">Select Diet</option>
          <option value="balanced">
            Balanced
          </option>
          <option value="high-protein">
            High-Protein
          </option>
          <option value="low-carb">
            Low-Carb
          </option>
          <option value="low-fat">Low-Fat</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">
            Vegetarian
          </option>
          <option value="paleo">Paleo</option>
          <option value="keto">Keto</option>
        </select>

        {/* Dropdown menu for selecting an allergy filter */}
        <select
          className="search"
          value={allergies}
          onChange={(e) =>
            setAllergies(e.target.value)
          }
        >
          <option value="">Select Allergy</option>
          <option value="gluten-free">
            Gluten-Free
          </option>
          <option value="peanut-free">
            Peanut-Free
          </option>
          <option value="soy-free">
            Soy-Free
          </option>
          <option value="dairy-free">
            Dairy-Free
          </option>
          <option value="egg-free">
            Egg-Free
          </option>
          <option value="fish-free">
            Fish-Free
          </option>
          <option value="shellfish-free">
            Shellfish-Free
          </option>
          <option value="tree-nut-free">
            Tree Nut-Free
          </option>
        </select>

        {/* Button to trigger the searchRecipes function when clicked */}
        <button
          onClick={() => searchRecipes()}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Display error messages if any */}
      {error && (
        <p className="error-message">{error}</p>
      )}

      <div>
        {selectedFood && (
          <FoodDetails
            selectedFavFood={selectedFood}
            foodImage={foodImage}
          />
        )}
      </div>

      {/* Display the list of recipes in a grid layout */}
      <div className="recipe-grid">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="recipe-card"
          >
            {/* Link to the recipe */}
            <a
              href={recipe.recipe.url}
              target="_blank"
              rel="noopener noreferrer"
              className="recipe-link"
            >
              View Recipe
            </a>
            <img
              src={recipe.recipe.image}
              alt={recipe.recipe.label}
              className="recipe-image"
            />
            <h3>{recipe.recipe.label}</h3>
            <p>
              {recipe.recipe.dishType?.join(", ")}
            </p>
            <p className="recipe-description">
              {Math.round(recipe.recipe.calories)}{" "}
              CALORIES |{" "}
              {
                recipe.recipe.ingredientLines
                  .length
              }{" "}
              INGREDIENTS
            </p>

            <button
              onClick={() => handleSelect(recipe)}
            >
              See more
            </button>

            <button
              onClick={() =>
                handleFavFood(recipe)
              }
            >
              FAV
            </button>
            <button
              onClick={() =>
                handleDelFavFood(recipe)
              }
            >
              DEL
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Meals;
