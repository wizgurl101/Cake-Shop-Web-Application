import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVERY_FAIL,
  ORDER_DELIVERY_REQUEST,
  ORDER_DELIVERY_RESET,
  ORDER_DELIVERY_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_ADMIN_FAIL,
  ORDER_LIST_ADMIN_REQUEST,
  ORDER_LIST_ADMIN_SUCCESS,
  ORDER_LIST_USER_FAIL,
  ORDER_LIST_USER_REQUEST,
  ORDER_LIST_USER_RESET,
  ORDER_LIST_USER_SUCCESS,
  ORDER_PAYMENT_FAIL,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_RESET,
  ORDER_PAYMENT_SUCCESS,
} from '../constants/orderConstants';

// TODO remove ts-ignore and refactor

// @ts-ignore
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = {
    loading: true,
    orderitems: [],
    shippingAddress: {},
  },
  // @ts-ignore
  action,
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// @ts-ignore
export const orderListUserReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_USER_REQUEST:
      return { loading: true };
    case ORDER_LIST_USER_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_USER_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LIST_USER_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

// @ts-ignore
export const orderListAdminReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_ADMIN_REQUEST:
      return { loading: true };
    case ORDER_LIST_ADMIN_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// @ts-ignore
export const orderPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAYMENT_REQUEST:
      return { loading: true };
    case ORDER_PAYMENT_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAYMENT_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAYMENT_RESET:
      return {};
    default:
      return state;
  }
};

// @ts-ignore
export const orderDeliveryReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERY_REQUEST:
      return { loading: true };
    case ORDER_DELIVERY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVERY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVERY_RESET:
      return {};
    default:
      return state;
  }
};
