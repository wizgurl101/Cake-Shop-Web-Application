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
            {/* Add to Cart Section */}
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      {/* TODO: Come back later dynamically change price based on size */}
                      <Col>Price:</Col>
                      <Col>
                        <strong>$14.99</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Size:</Col>
                      <Col>
                        {/* TODO: check if size and qty are being submited */}
                        <Form.Control as="select" aria-label="Select a size">
                          <option key="sm" value="sm">
                            Small - 12'
                          </option>
                          <option key="med" value="med">
                            Medium - 14'
                          </option>
                          <option key="lg" value="lg">
                            Large - 18'
                          </option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        {/* TODO: check if qty selected get submitted */}
                        <Form.Control as="select" aria-label="Select quantity">
                          <option key="1" value="1">
                            1
                          </option>
                          <option key="2" value="2">
                            2
                          </option>
                          <option key="3" value="3">
                            3
                          </option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          {/* Product Review Section */}
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {/* {product.reviews.length === 0 && <Message>No Reviews</Message>} */}
              <ListGroup variant="flush">
                {/* loop through product array of reviews */}
                {/* {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))} */}
              </ListGroup>
              {/* New Review Form */}
              <ListGroup.Item>
                <h2>Wrtie a Customer Review</h2>
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        row="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form.Group>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to="/login">sign in</Link> to write a review.
                  </Message>
                )}
              </ListGroup.Item>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductDetailScreen;
