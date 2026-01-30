import { configureStore } from "@reduxjs/toolkit";
//import createSagaMiddleware from "redux-saga";
import cartReducer from "./cartSlice";
import { addressSlice } from "./addressSlice";
//import rootSaga from './sagas'; // We'll create this later

// Create the saga middleware
//const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cart: cartReducer,
    address: addressSlice
  },
  // middleware: (getDefaultMiddleware) =>
  //  getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the root saga
//sagaMiddleware.run(rootSaga);

export default store;
