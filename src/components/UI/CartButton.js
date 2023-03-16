import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import CartIcon from '../Cart/CartIcon';

const CartButton = props => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const cartContent = useSelector(state => state.cart.cartContent);

  const numberOfItems = cartContent.reduce((amount, item) => amount + item.amount, 0);

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if (cartContent.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartContent]);

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