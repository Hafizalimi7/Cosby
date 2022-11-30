import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

import productReducer, { productsFetch } from './features/productsSlice';
import { productApi } from './features/productsApi';

const store = configureStore({
  reducer:{
    products: productReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  midddleware: (getDefaultMiddleware) =>{
    return getDefaultMiddleware().concat(productApi.middleware)
  }
})


store.dispatch(productsFetch())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

