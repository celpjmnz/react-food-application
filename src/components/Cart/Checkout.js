import axios from "axios";
import React, { useContext, useState } from "react";
import "./Checkout.css";
import useForm from "../../hooks/use-form";
import CartContext from "../../store/cart-context";

const Checkout = (props) => {
  //Context for having access to cart items
  const cartCtx = useContext(CartContext);

  const [submitted, setIfSubmitted] = useState(false);

  //validation
  const noEmptyString = (string) => {
    return string.trim() !== "" ? true : false;
  };
  const postalCodeValidator = (string) => {
    return string.trim().length === 5 && Number(string.trim()) ? true : false;
  };
  const noNumbers = (string) => {
    const filter = /\d+(\d+)?/i;
    return string.match(filter) ? false : true;
  };

  const nameObj = useForm((val) => noEmptyString(val) && noNumbers(val));
  const addressObj = useForm((val) => noEmptyString(val));
  const pcodeObj = useForm((val) => postalCodeValidator(val));
  const cityObj = useForm((val) => noEmptyString(val) && noNumbers(val));

  //form handler
  let formIsValid = false;

  if (
    nameObj.isValid &&
    addressObj.isValid &&
    pcodeObj.isValid &&
    cityObj.isValid
  ) {
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    if (
      !nameObj.isValid ||
      !addressObj.isValid ||
      !pcodeObj.isValid ||
      !cityObj.isValid
    )
      return;

    const url =
      "https://react-course-65fec-default-rtdb.firebaseio.com/users.json";

    const postReq = await axios.post(url, {
      name: nameObj.value,
      address: addressObj.value,
      postCode: pcodeObj.value,
      city: cityObj.value,
      orderedItems: cartCtx.items,
    });

    if (postReq.status !== 200) throw new Error("Data has not been posted");
    else setIfSubmitted(true);

    nameObj.resetStates();
    addressObj.resetStates();
    pcodeObj.resetStates();
    cityObj.resetStates();
    cartCtx.items.map((i) => {
      cartCtx.removeItem(i.id);
    });
  };

  // ClassName control depending of errors
  const inputClass = (obj) => {
    return obj.hasError ? "control invalid" : "control";
  };

  //form html
  const form = (
    <form className="form" onSubmit={submitHandler}>
      <div className={inputClass(nameObj)}>
        <label className="label" htmlFor="name">
          Introduce your name
        </label>
        <input
          className="input"
          type="text"
          id="name"
          onChange={nameObj.valHandler}
          onBlur={nameObj.blurHandler}
          value={nameObj.value}
        />
        {nameObj.hasError && (
          <p className="errorMsg">Introduce a correct value!</p>
        )}
      </div>
      <div className={inputClass(addressObj)}>
        <label className="label" htmlFor="address">
          Introduce your address
        </label>
        <input
          className="input"
          type="text"
          id="address"
          onChange={addressObj.valHandler}
          onBlur={addressObj.blurHandler}
          value={addressObj.value}
        />
        {addressObj.hasError && (
          <p className="errorMsg">Introduce a correct value!</p>
        )}
      </div>
      <div className={inputClass(pcodeObj)}>
        <label className="label" htmlFor="postalcode">
          Introduce your postal code
        </label>
        <input
          className="input"
          type="text"
          id="postalcode"
          onChange={pcodeObj.valHandler}
          onBlur={pcodeObj.blurHandler}
          value={pcodeObj.value}
        />
        {pcodeObj.hasError && (
          <p className="errorMsg">Introduce a correct value!</p>
        )}
      </div>
      <div className={inputClass(cityObj)}>
        <label className="label" htmlFor="city">
          Introduce your city
        </label>
        <input
          className="input"
          type="text"
          id="city"
          onChange={cityObj.valHandler}
          onBlur={cityObj.blurHandler}
          value={cityObj.value}
        />
        {cityObj.hasError && (
          <p className="errorMsg">Introduce a correct value!</p>
        )}
      </div>
      <div className="actions">
        <button
          type="button"
          onClick={props.onHideCart}
          className="button--alt"
        >
          Cancel
        </button>
        <button disabled={!formIsValid} className="button">
          Confirm
        </button>
      </div>
    </form>
  );

  return (
    <React.Fragment>
      {submitted ? (
        <div className="actions" onClick={props.onHideCart}>
          <p className="orderedConfirmed">
            Order confirmed! You will receive it ASAP!
          </p>
          <button className="button" onClick={props.onHideCart}>
            Close
          </button>
        </div>
      ) : (
        form
      )}
    </React.Fragment>
  );
};

export default Checkout;
