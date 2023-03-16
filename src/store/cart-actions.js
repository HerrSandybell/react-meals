import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

const NOTIFICATION_DELAY = 2000;

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(uiActions.showNotification({
        status: 'fetching',
        title: 'Fetching...',
        message: 'Fetching cart Data!'
      }));

      const response = await fetch('https://react-test-9ffb7-default-rtdb.firebaseio.com/cart.json');

      if (!response.ok) {
        throw new Error('could not fetch data');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();

      dispatch(cartActions.replaceCart({
        cartContent: cartData.cartContent || [],
        totalAmount: cartData.totalAmount || 0
      }));

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Cart data fetched successfully'
      }));
    } catch (e) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'error!',
        message: 'Get cart data failed!'
      }));
    }

    setTimeout(() => {
      dispatch(uiActions.hideNotification());
    }, NOTIFICATION_DELAY);
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data!'
    }));

    const sendRequest = async () => {
      const res = await fetch('https://react-test-9ffb7-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
      });

      if (!res.ok) {
        throw new Error('error sending cart data');
      }
    };

    try {
      await sendRequest();

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully'
      }));
    } catch (e) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'error!',
        message: 'Sent cart data failed'
      }));
    }

    setTimeout(() => {
      dispatch(uiActions.hideNotification());
    }, NOTIFICATION_DELAY);
  };
};