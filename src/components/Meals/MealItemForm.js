import { useState, useRef, useContext } from 'react';
import classes from './MealItemForm.module.css';
import CartContext from '../../store/cart-context';

const MealItemForm = (props) => {
  const [isValidInput, setIsValidInput] = useState(true);
  const cartCtx = useContext(CartContext);
  const amountInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = amountInputRef.current.value;
    const amountNumber = parseInt(amountInputRef.current.value);

    if (amount.trim().length === 0 ||
      amountNumber < 1 ||
      amountNumber > 5) {
      setIsValidInput(false);
    } else {
      cartCtx.onAddToCart(props.meal, amountNumber);
      amountInputRef.current.value = '0';
      setIsValidInput(true);
    }
  };

  return <form className={classes.form} onSubmit={handleSubmit}>
    <div className={classes.input}>
      <label htmlFor="quantity">Amount</label>
      <input ref={amountInputRef} type="number" name="quantity" placeholder="0" min="0" max="5" />
    </div>
    <button type="submit">+ Add</button>
    {!isValidInput && <p>Please enter a valid amount (1-5)</p>}
  </form>;
};

export default MealItemForm;