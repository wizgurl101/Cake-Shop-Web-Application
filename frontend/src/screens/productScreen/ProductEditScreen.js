import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import {
  listProductDetails,
  updateProduct,
} from "../../actions/productActions";
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_RESET,
} from "../../constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const productId = match.params.id;

  // product state variables
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);

  // get product details
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  // update product
  const productUpdated = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdated;

  useEffect(() => {
    // if product was successfully updated
    if (successUpdate) {
      // reset product update and details
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch({ type: PRODUCT_DETAILS_RESET });

      // redirect user back to productlist
      history.push("/admin/productlist");
    } else {
      // if product does not match id in URL
      if (
        typeof product === "undefined" ||
        !product.name ||
        product._id !== productId
      ) {
        dispatch(listProductDetails(productId));
      } else {
        // show the product
        setName(product.name);
        setImage(product.image);
        setDescription(product.description);
        setCategory(product.category);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  // FUNCTIONS
  const uploadImageFileHandler = async (event) => {
    // get the file upload by user
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    // have spinner component appears when uploading file
    setUploading(true);

    // request to backend
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };

      // get the file path to the image uploaded
      const { data } = await axios.post("/cakeshop/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // update product
    dispatch(
      updateProduct({
        _id: productId,
        name,
        image,
        description,
        category,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter product name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Upload image"
                custom
                onChange={uploadImageFileHandler}
              ></Form.File>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
