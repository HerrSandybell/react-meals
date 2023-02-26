import { useState, useEffect, useContext } from 'react';
import classes from './CartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const CartButton = props => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const cartCtx = useContext(CartContext);
  const { cartContent } = cartCtx;

  const numberOfItems = Object.values(cartContent).reduce((amount, item) => amount + item.amount, 0);

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    console.log({ length: Object.values(cartContent).length });
    if (Object.values(cartContent).length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx]);

  return <>
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>
        Your Cart
      </span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  </>;
};

export default CartButton;