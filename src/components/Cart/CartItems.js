import { useSelector } from 'react-redux';
import CartItem from './CartItem';

import classes from './Cart.module.css';

const CartItems = (props) => {
  const { cartContent, totalAmount } = useSelector(state => state.cart);

  return <>
    <ul className={classes["cart-items"]}>
      {
        cartContent.map((item) => <CartItem
          key={item.id}
          item={item}
        />)
      }
    </ul>
    <div className={classes.total}>
      <div>Total Amount</div>
      <div>${totalAmount.toFixed(2)}</div>
    </div>
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
      {cartContent.length > 0 && <button className={classes.button} onClick={props.onNext}>Next</button>}
    </div>
  </>;
};

export default CartItems;