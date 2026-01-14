import { configureStore } from '@reduxjs/toolkit';
import productsReducer  from './productsSlice';
import appReducer from './appSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
