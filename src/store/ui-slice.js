import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { cartIsVisible: false, notification: null, isLoading: false },
  reducers: {
    showCart (state) {
      state.cartIsVisible = true;
    },
    setLoading (state, action) {
      state.isLoading = action.payload;
    },
    hideCart (state) {
      state.cartIsVisible = false;
    },
    showNotification (state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message
      };
    },
    hideNotification (state) {
      state.notification = null;
    }
  }
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;