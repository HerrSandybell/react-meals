import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import Modal from '../UI/Modal';
import CartItems from './CartItems';
import Checkout from './Checkout';
import useHttp from '../hooks/use-http';
import { cartActions } from '../../store/cart-slice';

const Cart = (props) => {
  const dispatch = useDispatch();
  const cartContent = useSelector(state => state.cart.cartContent);
  const isSubmitting = useSelector(state => state.ui.isLoading);

  const sendRequest = useHttp();
  const [showCartItems, setShowCartItems] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const changeContentHandler = () => {
    setShowCartItems((state) => !state);
  };

  const orderHandler = (customerInfo) => {
    sendRequest({
      url: 'https://react-test-9ffb7-default-rtdb.firebaseio.com/orders.json',
      method: 'POST',
      body: {
        customerInfo,
        cartContent
      },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(() => {
      setSubmitted(true);
      dispatch(cartActions.clearCart());
    });
  };

  const CartModalContent = () => {
    if (showCartItems) {
      return <CartItems content={cartContent} onNext={changeContentHandler} onHideCart={props.onHideCart} />;
    } else {
      return <Checkout onPrevious={changeContentHandler} onConfirm={orderHandler} />;
    }
  };

  return <Modal onClose={props.onHideCart}>
    {!submitted && <CartModalContent />}
    {submitted && !isSubmitting && <p>Successfully Sent the order</p>}
  </Modal>;
};

export default Cart;