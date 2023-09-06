import { useContext } from "react";
import "./SingleMeal.css";
import MealForm from "./MealForm";
import CartContext from "../../../store/cart-context";

const SingleMeal = (props) => {
  const price = `${props.meal.price} €`;
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.meal.id,
      name: props.meal.name,
      amount,
      price: props.meal.price,
    });
  };

  return (
    <li className="meal">
      <div>
        <div>
          <h3 className="h3">{props.meal.name}</h3>
        </div>
        <div className="description">{props.meal.description}</div>
        <div className="price">{price}</div>
      </div>
      <div>
        <MealForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default SingleMeal;
