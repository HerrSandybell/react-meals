import { useState } from 'react';
import Header from './components/Layout/Header';
import MealMenu from './components/Meals/MealMenu';
import Cart from './components/Cart/Cart';

function App () {
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  };

  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <>
      {showCart && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <MealMenu />
      </main>
    </>
  );
}

export default App;
