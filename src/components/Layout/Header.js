import React from "react";
import "./Header.css";
import mealsImg from "../../assets/meals.jpg";
import CartButton from "./CartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className="header">
        <title>Food Order APP</title>
        <h1>DeliverFood</h1>
        <CartButton onClick={props.onShowCart} />
      </header>
      <div>
        <img
          className="main-image img"
          src={mealsImg}
          alt="A table full of delicious food"
        />
      </div>
    </React.Fragment>
  );
};

export default Header;
