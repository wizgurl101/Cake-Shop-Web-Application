import asyncHandler from "express-async-handler";
import Order from "../models/orderModel";

/**
 * @desc Create a new order
 * @route POST /cakeshop/orders
 * @access Private
 */
const addOrderItems = asyncHandler(async (req, res) => {});

export { addOrderItems };
