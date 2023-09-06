import CartContext from "./cart-context";
import { useReducer } from "react";

const defState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (i) => i.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex]; //null or the item itself
    let updatedItems;

    if (existingCartItem) {
      let updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "DEL") {
    const itemIndex = state.items.findIndex((i) => i.id === action.id);
    const item = state.items[itemIndex];
    const updatedAmount = state.totalAmount - item.price;
    let updatedItems;
    if (item.amount === 1) {
      updatedItems = state.items.filter((i) => i.id !== action.id);
    } else {
      const updatedItem = { ...item, amount: item.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[itemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  } else return defState;
};

const CartProvider = (props) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, defState);

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "DEL", id: id });
  };

  const cartContext = {
    items: cart.items,
    totalAmount: cart.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
