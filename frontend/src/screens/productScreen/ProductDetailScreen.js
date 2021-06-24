import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import MetaData from "../../components/MetaData";
import Rating from "../../components/Rating";
import { listProductDetails } from "../../actions/productActions";

/**
 * Product Detail Screen display the product detail of a single product, allow
 * user to add the product to the cart and to leave a rating and review
 * @param
 * @returns
 */
const ProductDetailScreen = ({ match }) => {
  const dispatch = useDispatch();

  // get product detail
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  // get log in user info to show form for giving a review
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // get the product details
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  // FUNCTIONS
  const addToCartHandler = () => {
    console.log("added item to cart");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("form submited");
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <MetaData title={product.name} />
          {/* Product Detail Section */}
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numberOfReviews} review`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductDetailScreen;
