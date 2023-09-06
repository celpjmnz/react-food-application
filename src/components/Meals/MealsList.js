import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../UI/Card";
import "./MealsList.css";
import SingleMeal from "./SingleMeal/SingleMeal";

const MealsList = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const url =
      "https://react-course-65fec-default-rtdb.firebaseio.com/meals.json";

    const fetchMeals = async () => {
      const res = await axios.get(url);
      const data = await res.data;

      if (res.status !== 200 || data === null) {
        setErr(true);
        return;
      }

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);

      setLoading(false);
    };
    fetchMeals();
  }, []);

  return (
    <section className="meals">
      {err && (
        <h2 className="errorMessage">
          Something failed while getting the data.
        </h2>
      )}
      {isLoading && !err ? (
        <p className="loading">Loading</p>
      ) : (
        <Card>
          <ul className="ul">
            {meals.map((meal) => {
              return <SingleMeal key={meal.id} meal={meal} />;
            })}
          </ul>
        </Card>
      )}
    </section>
  );
};

export default MealsList;
