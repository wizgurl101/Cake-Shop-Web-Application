import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

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
 * @desc Fetch a single product from database
 * @route GET /cakeshop/products/:id
 * @access Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // if product exist
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
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
    res.json({ message: "Product deleted." });
  } else {
    // product does not exist
    res.status(404);
    throw new Error("No such product exist.");
  }
});

export { getProducts, getProductById, deleteProduct };
