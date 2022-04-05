import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_DELIVERY_DATE, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants.js';

// TODO remove ts-ignore and refactor

// @ts-ignore
export const cartReducer = (state = { cartItems: [], shippingAddress: {}, deliveryDate: '' }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      // @ts-ignore
      const itemExistInCart = state.cartItems.find((cartItem) => cartItem.product === item.product);

      // if item exists already in cart, update qty of item
      if (itemExistInCart) {
        return {
          ...state,
          // @ts-ignore
          cartItems: state.cartItems.map((cartItem) => (cartItem.product === itemExistInCart.product ? item : cartItem)),
        };
      } else {
        // new item, add to cart
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        // @ts-ignore
        cartItems: state.cartItems.filter((cartItem) => cartItem.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_DELIVERY_DATE: {
      return {
        ...state,
        deliveryDate: action.payload,
      };
    }
    case CART_SAVE_PAYMENT_METHOD: {
      return {
        ...state,
        paymentMethod: action.payload,
      };
    }
    default:
      return state;
  }
};
