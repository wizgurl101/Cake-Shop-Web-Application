import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productUpdateReducer,
  productTopRatedReducer,
} from "./reducers/productReducers.js";

import {
  userLoginReducer,
  userRegisterReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userDetailsReducer,
} from "./reducers/userReducers.js";

import { cartReducer } from "./reducers/cartReducers.js";

const reducer = combineReducers({
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  productCreate: productCreateReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userDetails: userDetailsReducer,
  cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : [];

const deliveryDateFromStorage = localStorage.getItem("deliveryDate")
  ? JSON.parse(localStorage.getItem("deliveryDate"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    deliveryDate: deliveryDateFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
