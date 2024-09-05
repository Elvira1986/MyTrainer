import { useState, useEffect } from 'react';
import './Meals.css'; // External CSS file

function Meals() {
  // State to hold the search query entered by the user
  const [query, setQuery] = useState('');

  // State to hold the selected diet filter (e.g., balanced, high-protein)
  const [diet, setDiet] = useState('');

  // State to hold the selected allergy filter (e.g., gluten-free, dairy-free)
  const [allergies, setAllergies] = useState('');

  // State to hold the list of recipes returned from the API
  const [recipes, setRecipes] = useState([]);

  // State to hold the list of favorite recipes
  const [favorites, setFavorites] = useState([]);

  // State to hold loading status
  const [loading, setLoading] = useState(false);

  // State to hold error messages
  const [error, setError] = useState('');

  // Function to handle the API request and fetch recipes based on the user's input
  const searchRecipes = async (random = false) => {
    setError('');

    const appId = '7828a26c'; // Use your application ID for the EDAMAM API
    const appKey = 'af250104f405a82bf082713bef547173'; // Use your application key for the EDAMAM API

    // Construct the API URL with the query, diet, and allergy parameters
    let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`;

    if (random) {
      url += `&random=true`;
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
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();

      if (data.hits.length === 0) {
        setError('No recipes found. Please try a different query or filters.');
        setRecipes([]);
      } else {
        setRecipes(data.hits);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Pre-populate random recipes when the component mounts
  useEffect(() => {
    searchRecipes(true); // Fetch random recipes on initial load
  }, []);

  // Function to toggle a recipe as favorite
  const toggleFavorite = (recipe) => {
    const isFavorite = favorites.find((fav) => fav.recipe.uri === recipe.recipe.uri);

    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.recipe.uri !== recipe.recipe.uri));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  return (
    <div className="meals-container">
      <h1>Search for Recipes</h1>

      <div className="search-controls">
        {/* Input field for the user to type in a search query */}
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Dropdown menu for selecting a diet filter */}
        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="">Diets</option>
          <option value="balanced">Balanced</option>
          <option value="high-protein">High-Protein</option>
          <option value="low-carb">Low-Carb</option>
          <option value="low-fat">Low-Fat</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="paleo">Paleo</option>
          <option value="keto">Keto</option>
        </select>

        {/* Dropdown menu for selecting an allergy filter */}
        <select value={allergies} onChange={(e) => setAllergies(e.target.value)}>
          <option value="">Allergies</option>
          <option value="gluten-free">Gluten-Free</option>
          <option value="peanut-free">Peanut-Free</option>
          <option value="soy-free">Soy-Free</option>
          <option value="dairy-free">Dairy-Free</option>
          <option value="egg-free">Egg-Free</option>
          <option value="fish-free">Fish-Free</option>
          <option value="shellfish-free">Shellfish-Free</option>
          <option value="tree-nut-free">Tree Nut-Free</option>
        </select>

        {/* Button to trigger the searchRecipes function when clicked */}
        <button onClick={() => searchRecipes()} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Display error messages if any */}
      {error && <p className="error-message">{error}</p>}

      {/* Display a random list of meals by default */}
      {!query && !diet && !allergies && (
        <div className="recipe-grid">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <img src={recipe.recipe.image} alt={recipe.recipe.label} className="recipe-image" />
              <h3>{recipe.recipe.label}</h3>
              <p>{Math.round(recipe.recipe.calories)} CALORIES | {recipe.recipe.ingredientLines.length} INGREDIENTS</p>
              <button
                onClick={() => toggleFavorite(recipe)}
                className={favorites.find((fav) => fav.recipe.uri === recipe.recipe.uri) ? 'favorite' : ''}
              >
                {favorites.find((fav) => fav.recipe.uri === recipe.recipe.uri) ? 'Remove' : 'Add'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Display the search results if there is a query */}
      {recipes.length > 0 && (
        <div className="recipe-grid">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <img src={recipe.recipe.image} alt={recipe.recipe.label} className="recipe-image" />
              <h3>{recipe.recipe.label}</h3>
              <p>{Math.round(recipe.recipe.calories)} CALORIES | {recipe.recipe.ingredientLines.length} INGREDIENTS</p>
              <button
                onClick={() => toggleFavorite(recipe)}
                className={favorites.find((fav) => fav.recipe.uri === recipe.recipe.uri) ? 'favorite' : ''}
              >
                {favorites.find((fav) => fav.recipe.uri === recipe.recipe.uri) ? 'Remove' : 'Add'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Meals;
