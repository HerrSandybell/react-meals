import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

import classes from './CartItem.module.css';

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { id, name, price, amount } = props.item;

  const trimmedPrice = `$${price.toFixed(2)}`;

  const addHandler = () => {
    dispatch(cartActions.addToCart({ item: props.item, amount: 1 }));
  };

  const removeHandler = () => {
    dispatch(cartActions.removeFromCart(id));
  };

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{trimmedPrice}</span>
          <span className={classes.amount}>x {amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={removeHandler}>−</button>
        <button onClick={addHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;