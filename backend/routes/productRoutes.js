import express from 'express';
import {
  getProducts,
  deleteProduct,
} from '../controllers/productController.js';

import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);

router.route('/:id').delete(protect, isAdmin, deleteProduct);

export default router;
