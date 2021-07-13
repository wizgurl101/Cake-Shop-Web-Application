import express from "express";
import {
  authUser,
  registerUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, isAdmin, getUsers);

router.post("/login", authUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .get(protect, isAdmin, getUserById)
  .delete(protect, isAdmin, deleteUser)
  .put(protect, isAdmin, updateUser);

export default router;
