import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const [btnAnimation, setBtnAnimation] = useState(false);

  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (cartCtx.items.length === 0) return;
    setBtnAnimation(true);

    const timer = setTimeout(() => {
      setBtnAnimation(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);
  const buttonClass = `${classes.button} ${btnAnimation ? classes.bump : ""}`;

  return (
    <button className={buttonClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default CartButton;
