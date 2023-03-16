import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';
import { fetchCartData, sendCartData } from './store/cart-actions';
import Header from './components/Layout/Header';
import MealMenu from './components/Meals/MealMenu';
import Cart from './components/Cart/Cart';

let isInitial = true;

function App () {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  const showCartHandler = () => {
    dispatch(uiActions.showCart());
  };

  const hideCartHandler = () => {
    dispatch(uiActions.hideCart());
  };

  return (
    <>
      {cartIsVisible && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <MealMenu />
      </main>
    </>
  );
}

export default App;
