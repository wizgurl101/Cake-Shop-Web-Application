import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { cartReducer } from './reducers/cartReducers';

import { orderCreateReducer, orderDetailsReducer, orderListAdminReducer, orderListUserReducer, orderPaymentReducer, orderDeliveryReducer } from './reducers/orderReducers';

import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productUpdateReducer,
  productTopRatedReducer,
} from './reducers/productReducers';

import { userLoginReducer, userRegisterReducer, userListReducer, userDeleteReducer, userUpdateReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers';

const reducer = combineReducers({
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderListUser: orderListUserReducer,
  orderListAdmin: orderListAdminReducer,
  orderPayment: orderPaymentReducer,
  orderDelivery: orderDeliveryReducer,
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
  userUpdatedProfile: userUpdateProfileReducer,
});
// TODO remove ts-ignore and refactor

// @ts-ignore
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

// @ts-ignore
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : [];

// @ts-ignore
const deliveryDateFromStorage = localStorage.getItem('deliveryDate') ? JSON.parse(localStorage.getItem('deliveryDate')) : [];

// @ts-ignore
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    deliveryDate: deliveryDateFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

// @ts-ignore
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
