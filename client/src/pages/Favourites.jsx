import React from "react";
import FavExercises from "../components/FavExercises";
import FavFood from "../components/FavFood";

const Favourites = () => {
  return (
    <div>
      <h1>Your Personal Favourites</h1>
      <div className="FavExercises">
        <FavExercises />
      </div>
      <div className="FavFood">
        <FavFood />
      </div>
    </div>
  );
};

export default Favourites;
