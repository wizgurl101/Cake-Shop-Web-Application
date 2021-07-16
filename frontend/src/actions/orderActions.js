import axios from "axios";

import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVERY_FAIL,
  ORDER_DELIVERY_REQUEST,
  ORDER_DELIVERY_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_ADMIN_FAIL,
  ORDER_LIST_ADMIN_REQUEST,
  ORDER_LIST_ADMIN_SUCCESS,
  ORDER_LIST_USER_FAIL,
  ORDER_LIST_USER_REQUEST,
  ORDER_LIST_USER_SUCCESS,
  ORDER_PAYMENT_FAIL,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_SUCCESS,
} from "../constants/orderConstants";

export const createOrder = (newOrder) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // get newly created order data
    const { data } = await axios.post(`/cakeshop/orders`, newOrder, config);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/cakeshop/orders/${orderId}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_USER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/cakeshop/orders/userorders", config);

    dispatch({ type: ORDER_LIST_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_ADMIN_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/cakeshop/orders", config);

    dispatch({ type: ORDER_LIST_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const processOrderPayment =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAYMENT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/cakeshop/orders/${orderId}/payment`,
        paymentResult,
        config
      );

      dispatch({ type: ORDER_PAYMENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_PAYMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const changeOrderDeliveryStatus =
  (order) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DELIVERY_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/cakeshop/orders/${order._id}/delivery`,
        {},
        config
      );

      dispatch({ type: ORDER_DELIVERY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_DELIVERY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
