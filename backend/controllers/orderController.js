import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

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
    taxPrice,
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

/**
 * @desc Get order by ID
 * @route GET /cakeshop/orders/:id
 * @access Private
 */
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  // check if order exist
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

/**
 * @desc Update order to paid when payment was successful
 * @route GET /cakeshop/orders/:id/payment
 * @access Private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  // if order exist, update isPaid field
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    // get payment result from API i.e. PayPal
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const paidOrder = await order.save();
    res.json(paidOrder);
  } else {
    // order was not found
    res.status(404);
    throw new Error("Order not found");
  }
});

/**
 * @desc Update order to delivered
 * @route GET /cakeshop/orders/:id/delivery
 * @access Private
 */
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  // if order exist, update it to delivered
  if (order) {
    order.isDelivered = true;

    const deliveredOrder = await order.save();
    res.json(deliveredOrder);
  } else {
    // order was not found
    res.status(404);
    throw new Error("Order not found");
  }
});

/**
 * @desc Update order to delivered
 * @route GET /cakeshop/orders/userorders
 * @access Private
 */
const getUserOrders = asyncHandler(async (req, res) => {
  const userOrders = await Order.find({ user: req.user._id });
  res.json(userOrders);
});

/**
 * @desc Get all orders
 * @route GET /cakeshop/orders/orderlist
 * @access Private/Admin
 */
const getOrders = asyncHandler(async (req, res) => {
  const allOrders = await Order.find({}).populate("user", "id name");
  res.json(allOrders);
});

export {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getUserOrders,
  getOrders,
};
