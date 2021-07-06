import asyncHandler from "express-async-handler";
import Order from "../models/orderModel";

/**
 * @desc Create a new order
 * @route POST /cakeshop/orders
 * @access Private
 */
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    deliveryDate,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // check that cart is not empty
  if (orderItems && orderItems.length === 0) {
    // bad request
    res.status(400);
    throw new Error("No item in cart.");
    return;
  } else {
    // create a new order and persist it to the DB
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      deliveryDate,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  }
});

export { createOrder };
