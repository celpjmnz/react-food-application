import { useContext, useState } from "react";
import "./Cart.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [checkout, displayCheckout] = useState(false);

  const cartCtx = useContext(CartContext);

  const hasItems = cartCtx.items.length > 0 ? true : false;

  const cartItemDelHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    displayCheckout(true);
  };

  const actions = (
    <div className="actions">
      <button className="button--alt" onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button onClick={orderHandler} className="button">
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal>
      <div className="total">
        <span>Total Amount: </span>
        <span>{cartCtx.totalAmount.toFixed(2)} €</span>
      </div>

      <ul className="cart-items">
        {cartCtx.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              name={item.name}
              amount={item.amount}
              price={item.price}
              onAdd={cartItemAddHandler.bind(null, item)}
              onRemove={cartItemDelHandler.bind(null, item.id)}
            />
          );
        })}
      </ul>
      {!checkout ? actions : <Checkout onHideCart={props.onHideCart} />}
    </Modal>
  );
};

export default Cart;
