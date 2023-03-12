import React, { useState } from 'react';

const CartContext = React.createContext({
  cartContent: [],
  totalAmount: 0,
  onAddToCart: (menuItem, amount) => { },
  onRemoveFromCart: (id) => { },
  onClearCart: () => { }
});

export const CartContextProvider = (props) => {
  const [cartContent, setCartContent] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addToCart = (menuItem, amount = 1) => {
    setCartContent((cartContent) => {
      let cartItem = cartContent.find(item => item.id === menuItem.id);

      let updatedCart;
      if (cartItem) {
        cartItem.amount += amount;
        updatedCart = [...cartContent];
      } else {
        cartItem = { ...menuItem, amount };
        updatedCart = cartContent.concat(cartItem);
      }

      setTotalAmount((oldAmount) => {
        return oldAmount + (menuItem.price * amount);
      });

      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCartContent((cartContent) => {
      const cartItemIndex = cartContent.findIndex(item => item.id === id);
      const menuItem = cartContent[cartItemIndex];

      if (!menuItem) return cartContent;

      let updatedCart;
      if (menuItem.amount === 1) {
        cartContent.splice(cartItemIndex, 1);
        updatedCart = [...cartContent];
      } else {
        menuItem.amount -= 1;
        updatedCart = [...cartContent];
      }

      setTotalAmount((oldAmount) => {
        return oldAmount - menuItem.price;
      });

      return updatedCart;
    });
  };

  const clearCart = () => {
    setTotalAmount(0);
    setCartContent([]);
  };

  return <CartContext.Provider
    value={{
      cartContent,
      totalAmount,
      onAddToCart: addToCart,
      onRemoveFromCart: removeFromCart,
      onClearCart: clearCart
    }}
  >
    {props.children}
  </CartContext.Provider>;
};

export default CartContext;