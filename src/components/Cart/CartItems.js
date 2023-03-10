import { useContext } from 'react';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';

const CartItems = (props) => {
  const cartCtx = useContext(CartContext);
  const { cartContent } = cartCtx;

  const addHandler = item => {
    cartCtx.onAddToCart(item, 1);
  };

  const removeHandler = id => {
    cartCtx.onRemoveFromCart(id);
  };

  return <>
    <ul className={classes["cart-items"]}>
      {
        cartContent.map((item) => <CartItem
          key={item.name}
          onRemove={removeHandler.bind(null, item.id)}
          onAdd={addHandler.bind(null, item)}
          {...item}
        />)
      }
    </ul>
    <div className={classes.total}>
      <div>Total Amount</div>
      <div>${cartCtx.totalAmount.toFixed(2)}</div>
    </div>
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
      {cartContent.length > 0 && <button className={classes.button} onClick={props.onNext}>Next</button>}
    </div>
  </>;
};

export default CartItems;