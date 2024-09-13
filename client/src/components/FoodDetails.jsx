import React from "react";

function FoodDetails({
  selectedFavFood,
  foodImage,
}) {
  return (
    <div>
      {selectedFavFood && (
        <div>
          {selectedFavFood.map((food) => (
            <div key={food.recipe.uri}>
              <h2> {food.recipe.label} </h2>
              <div className="labels">
                <h5>
                  <i class="fa-solid fa-utensils"></i>
                </h5>
                <div className="dishType">
                  {food.recipe.dishType.length >
                    0 &&
                    food.recipe.dishType.map(
                      (label, index) => (
                        <p key={index}>
                          <mark>
                            {""}# {label}{" "}
                          </mark>
                        </p>
                      )
                    )}
                </div>
                <h5>
                  <i class="fa-solid fa-burger"></i>
                </h5>
                <div className="mealType">
                  {food.recipe.mealType.length >
                    0 &&
                    food.recipe.mealType.map(
                      (label, index) => (
                        <p key={index}>
                          <mark>
                            {""}# {label}{" "}
                          </mark>
                        </p>
                      )
                    )}
                </div>
                <h5>
                  <i class="fa-solid fa-kitchen-set"></i>
                </h5>
                <div className="cuisineType">
                  {food.recipe.cuisineType
                    .length > 0 &&
                    food.recipe.cuisineType.map(
                      (label, index) => (
                        <p key={index}>
                          <mark>
                            {""}# {label}{" "}
                          </mark>
                        </p>
                      )
                    )}
                </div>
                <h5>
                  <i class="fa-solid fa-prescription-bottle-medical"></i>
                </h5>
                <div className="healthLabels">
                  {food.recipe.healthLabels
                    .length > 0 &&
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

                <h5>
                  <i class="fa-solid fa-notes-medical"></i>
                </h5>
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
              </div>

              <div className="prepInfo">
                <p>
                  <i class="fa-solid fa-plate-wheat"></i>
                  {"  "}
                  {food.recipe.yield}{" "}
                </p>
                <p>
                  <i class="fa-solid fa-stopwatch-20"></i>
                  {"  "}
                  {food.recipe.totalTime}{" "}
                </p>
                <p>
                  <i class="fa-solid fa-scale-balanced"></i>
                  {"  "}
                  {Math.round(
                    food.recipe.totalWeight
                  )}{" "}
                </p>

                <p>
                  Calories:{" "}
                  {Math.round(
                    food.recipe.calories
                  )}{" "}
                </p>
              </div>

              <p>INGREDIENTS</p>

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
    </div>
  );
}

export default FoodDetails;
