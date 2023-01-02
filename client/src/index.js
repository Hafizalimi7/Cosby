import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"

import productsReducer, { productsFetch } from './slices/productsSlice';
import cartReducer, { getTotals } from './slices/cartSlice';
import { productsApi } from './slices/productsApi';
import authReducer, { loadUser } from './slices/authSlice';

const store = configureStore({//combines different reducers and also automaticly configure redux dev tools
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),//add more api funtionality like cashing
});


store.dispatch(productsFetch())//dispatches action creator which will trigger createAsyncThunk to do the heavy lifting
store.dispatch(getTotals());//when the application loads it will dispatch getTotals
store.dispatch(loadUser(null))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

