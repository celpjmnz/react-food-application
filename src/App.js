import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [shown, setIfShown] = useState(false);

  const showCartHandler = () => {
    setIfShown(true);
  };

  const hideCartHandler = () => {
    setIfShown(false);
  };

  return (
    <CartProvider>
      {shown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <Meals />
    </CartProvider>
  );
}

export default App;
