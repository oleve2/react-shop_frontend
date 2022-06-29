import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './shopReducer';
import cartReducer from './cartReducer';

//
const store = configureStore({
  reducer: {
    shopReducer: shopReducer,
    cartReducer: cartReducer,
  }
})

export default store;
