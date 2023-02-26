import React, { useState } from 'react';

const CartContext = React.createContext({
  cartContent: {},
  totalAmount: 0,
  onAddToCart: (menuItem, amount) => { },
  onRemoveFromCart: (id) => { }
});

export const CartContextProvider = (props) => {
  const [cartContent, setCartContent] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);


  const addToCart = (menuItem, amount = 1) => {
    setCartContent((cartContent) => {
      const cartItem = cartContent[menuItem.id];

      if (cartItem) {
        cartItem.amount += amount;
      } else {
        cartContent[menuItem.id] = { ...menuItem, amount };
      }

      setTotalAmount(Object.values(cartContent)
        .reduce((total, item) => total += (item.price * item.amount), 0));

      return cartContent;
    });
  };

  const removeFromCart = (id) => {
    setCartContent((cartContent) => {
      const cartItem = cartContent[id];

      if (!cartItem) return cartContent;

      if (cartItem.amount === 1) {
        delete cartContent[id];
      } else {
        cartItem.amount -= 1;
      }

      setTotalAmount(Object.values(cartContent)
        .reduce((total, item) => total += (item.price * item.amount), 0));

      return cartContent;
    });

    console.log({ cartContent });
  };

  return <CartContext.Provider
    value={{
      cartContent,
      totalAmount,
      onAddToCart: addToCart,
      onRemoveFromCart: removeFromCart
    }}
  >
    {props.children}
  </CartContext.Provider>;
};

export default CartContext;