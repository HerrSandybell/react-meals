import { useState, useRef } from 'react';
import { cartActions } from '../../store/cart-slice';
import { useDispatch } from 'react-redux';

import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const dispatch = useDispatch();

  const [isValidInput, setIsValidInput] = useState(true);
  const amountInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = amountInputRef.current.value;
    const amountNumber = parseInt(amountInputRef.current.value);

    if (amount.trim().length === 0 ||
      amountNumber < 1 ||
      amountNumber > 5) {
      setIsValidInput(false);
      return;
    }

    dispatch(cartActions.addToCart({ item: props.meal, amount: amountNumber }));

    amountInputRef.current.value = '1';
    setIsValidInput(true);
  };

  return <form className={classes.form} onSubmit={handleSubmit}>
    <div className={classes.input}>
      <label htmlFor="quantity">Amount</label>
      <input ref={amountInputRef} type="number" name="quantity" min="1" max="5" defaultValue={1} />
    </div>
    <button type="submit">+ Add</button>
    {!isValidInput && <p>Please enter a valid amount (1-5)</p>}
  </form>;
};

export default MealItemForm;