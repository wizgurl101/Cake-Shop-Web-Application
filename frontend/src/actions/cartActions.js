import axios from "axios";
import { CART_ADD_ITEM } from "../constants/CartConstants";

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
