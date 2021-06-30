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

/**
 * @desc Update a single product
 * @route PUT /cakeshop/products/:id
 * @access Private/Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, description, category } = req.body;

  // find the product to be updated
  const product = await Product.findById(req.params.id);

  // if the product exist, update all its fields
  if (product) {
    product.name = name;
    product.image = image;
    product.description = description;
    product.category = category;

    // save the updated product
    const updateProduct = await product.save();
    res.status(201).json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

/**
 * @desc Create a product
 * @route POST /cakeshop/products
 * @access Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const newProduct = new Product({
    name: "Sample name",
    user: req.user._id,
    image: "/images/noImage.jpg",
    description: "Sample description",
    category: "Sample brand",
  });

  const createdProduct = await newProduct.save();

  res.status(201).json(createdProduct);
});

/**
 *
 */
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  // find the product to add the new review to
  const productToReview = await Product.findById(req.params.id);

  // product does exist
  if (productToReview) {
    // check if the user already review the product
    const isReviewAlready = productToReview.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (isReviewAlready) {
      // set it to 400, bad request
      res.status(400);
      throw new Error("Product already reviewd.");
    }

    // user did not already review the product so create a new review
    const newReview = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    productToReview.reviews.push(newReview);
    productToReview.numberOfReviews = productToReview.reviews.length;

    // update the total rating for that product
    productToReview.rating =
      productToReview.reviews.reduce((acc, item) => item.rating + acc, 0) /
      productToReview.numberOfReviews;

    // update the product
    await productToReview.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
};
