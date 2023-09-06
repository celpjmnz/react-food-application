import React from "react";
import Description from "./Description";
import MealsList from "./MealsList";

const Meals = () => {
  return (
    <React.Fragment>
      <Description />
      <main>
        <MealsList />
      </main>
    </React.Fragment>
  );
};

export default Meals;
