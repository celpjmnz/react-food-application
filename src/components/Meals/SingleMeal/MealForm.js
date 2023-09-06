import Input from "../../UI/Input";
import "./MealForm.css";
import { useRef, useState } from "react";

const MealForm = (props) => {
  const amountInputRef = useRef();
  const [formValidation, testIfValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const entAmountNumber = Number(enteredAmount);

    if (
      enteredAmount.trim().length === 0 ||
      entAmountNumber < 1 ||
      entAmountNumber > 5
    ) {
      testIfValid(false);
      return;
    }

    props.onAddToCart(entAmountNumber);
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>Add to cart</button>
      {!formValidation && <p>Please, enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealForm;
