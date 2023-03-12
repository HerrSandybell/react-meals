import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItems from './CartItems';
import Checkout from './Checkout';
import useHttp from '../hooks/use-http';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const { cartContent } = cartCtx;

  const { isLoading: isSubmitting, error, sendRequest } = useHttp();
  const [showCartItems, setShowCartItems] = useState(true);
  const [submitted, setSubmitted] = useState(false);


  const changeContentHandler = () => {
    setShowCartItems((state) => !state);
  };

  const orderHandler = (customerInfo) => {
    console.log({ customerInfo, cartContent });
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
      cartCtx.onClearCart();
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
    {error && <div>{error.message}</div>}
    {!submitted && <CartModalContent />}
    {submitted && !isSubmitting && <p>Successfully Sent the order</p>}
  </Modal>;
};

export default Cart;