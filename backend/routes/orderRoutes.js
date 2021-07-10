import express from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
  getUserOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, isAdmin, getOrders);
router.route("/userorders").get(protect, getUserOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, isAdmin, updateOrderToDelivered);

export default router;
