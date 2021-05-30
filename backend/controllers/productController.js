import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

/**
 * @desc Fetch all products from database
 * @route GET /cakeshop/products
 * @access Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json({ products });
});

/**
 * @desc Delete a single product
 * @route GET /cakeshop/products/:id
 * @access Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const productToDelete = await Product.findById(req.params.id);

  // if product does exist, delete it from database
  if (productToDelete) {
    await productToDelete.remove();
    res.json({ message: 'Product deleted.' });
  } else {
    // product does not exist
    res.status(404);
    throw new Error('No such product exist.');
  }
});

export { getProducts, deleteProduct };
