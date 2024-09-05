// Meals.jsx
import { useState } from "react";

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

  // Function to handle the API request and fetch recipes based on the user's input
  const searchRecipes = async () => {
    // Clear previous error messages
    setError("");

    // Check if the query is empty
    if (!query) {
      setError("Please enter a search query.");
      return;
    }

    const appId = "7828a26c"; // Use your application ID for the EDAMAM API
    const appKey = "af250104f405a82bf082713bef547173"; // Use your application key for the EDAMAM API

    // Construct the API URL with the query, diet, and allergy parameters
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${appKey}&diet=${diet}&health=${allergies}`;

    setLoading(true); // Set loading to true before making the API call

    try {
      // Fetch the data from the API
      const response = await fetch(url);
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();

      // Check if any recipes were found
      if (data.hits.length === 0) {
        setError("No recipes found. Please try a different query or filters.");
        setRecipes([]);
      } else {
        // Update the recipes state with the results from the API
        setRecipes(data.hits);
      }
    } catch (error) {
      // Log any errors that occur during the API request
      console.error("Error fetching data:", error);
      setError("Failed to fetch recipes. Please try again later."); // Set error message
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  // Function to toggle a recipe as favorite
  const toggleFavorite = (recipe) => {
    // Check if the recipe is already in favorites
    const isFavorite = favorites.find(
      (fav) => fav.recipe.uri === recipe.recipe.uri
    );

    if (isFavorite) {
      // If it's already a favorite, remove it
      setFavorites(
        favorites.filter((fav) => fav.recipe.uri !== recipe.recipe.uri)
      );
    } else {
      // If it's not a favorite, add it
      setFavorites([...favorites, recipe]);
    }
  };

  return (
    <div>
      <h1>Search for Recipes</h1>

      {/* Input field for the user to type in a search query */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Dropdown menu for selecting a diet filter */}
      <select value={diet} onChange={(e) => setDiet(e.target.value)}>
        <option value="">Select Diet</option>
        <option value="balanced">Balanced</option>
        <option value="high-protein">High-Protein</option>
        <option value="low-carb">Low-Carb</option>
        <option value="low-fat">Low-Fat</option>
      </select>

      {/* Dropdown menu for selecting an allergy filter */}
      <select value={allergies} onChange={(e) => setAllergies(e.target.value)}>
        <option value="">Select Allergy</option>
        <option value="gluten-free">Gluten-Free</option>
        <option value="peanut-free">Peanut-Free</option>
        <option value="soy-free">Soy-Free</option>
        <option value="dairy-free">Dairy-Free</option>
      </select>

      {/* Button to trigger the searchRecipes function when clicked */}
      <button onClick={searchRecipes} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      {/* Display error messages if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display the list of recipes in a grid layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {recipes.map((recipe, index) => (
          <div
            key={index}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            {/* Display the recipe image */}
            <img
              src={recipe.recipe.image}
              alt={recipe.recipe.label}
              style={{ width: "100%" }}
            />

            {/* Display the recipe title */}
            <h3>{recipe.recipe.label}</h3>

            {/* Display the dish type (e.g., breakfast, lunch, dinner) */}
            <p>{recipe.recipe.dishType?.join(", ")}</p>

            {/* Button to add/remove the recipe from favorites */}
            <button onClick={() => toggleFavorite(recipe)}>
              {favorites.find((fav) => fav.recipe.uri === recipe.recipe.uri)
                ? "Unfavorite"
                : "Favourite"}
            </button>
          </div>
        ))}
      </div>

      {/* Display favorite recipes if needed */}
      {/* You can implement a separate section for displaying favorite recipes here */}
    </div>
  );
}

export default Meals;
