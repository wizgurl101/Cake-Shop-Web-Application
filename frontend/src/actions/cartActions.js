import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_DELIVERY_DATE,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/CartConstants";

/**
 * Add product to cart
 * @param {*} id Product id to be add to cart
 * @param {*} qty Quantity of product order
 * @returns
 */
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { item } = await axios.get(`/cakeshop/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: item._id,
      name: item.name,
      image: item.image,
      price: item.price,
      size: item.size,
      qty,
    },
  });

  // save to cart in local storage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartitems));
};

/**
 * Remove product from cart
 * @param {*} id
 * @returns
 */
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

/**
 * Save user shipping address
 * @param {*} shippingAddress
 * @returns
 */
export const saveShippingAddress = (shippingAddress) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: shippingAddress,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
};

/**
 * Save user selected date for delivery
 * @param {*} deliveryDate
 * @returns
 */
export const saveDeliveryDate = (deliveryDate) => (dispatch) => {
  dispatch({
    type: CART_SAVE_DELIVERY_DATE,
    payload: deliveryDate,
  });

  localStorage.setItem("deliveryDate", deliveryDate);
};

/**
 * Save user payment method
 * @param {*} paymentMethod
 * @returns
 */
export const savePaymentMethod = (paymentMethod) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
};
