import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartContent: [],
    totalAmount: 0,
    changed: false
  },
  reducers: {
    clearCart (state) {
      state.cartContent = [];
      state.totalAmount = 0;
      state.changed = true;
    },
    replaceCart (state, action) {
      state.totalAmount = action.payload.totalAmount;
      state.cartContent = action.payload.cartContent;
    },
    addToCart (state, action) {
      const { item: newItem, amount } = action.payload;
      const existingItem = state.cartContent.find(item => item.id === newItem.id);
      state.changed = true;

      if (!existingItem) {
        state.cartContent.push({ ...newItem, amount });
      } else {
        existingItem.amount += amount;
      }

      state.totalAmount += newItem.price * amount;
    },
    removeFromCart (state, action) {
      const id = action.payload;
      const existingItem = state.cartContent.find(item => item.id === id);
      state.changed = true;

      if (existingItem.amount === 1) {
        state.cartContent = state.cartContent.filter(item => item.id !== id);
      } else {
        existingItem.amount--;
      }

      state.totalAmount -= existingItem.price;
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;