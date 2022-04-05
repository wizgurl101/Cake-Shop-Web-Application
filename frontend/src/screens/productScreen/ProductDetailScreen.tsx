import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import MetaData from '../../components/MetaData';
import Rating from '../../components/Rating';
import { listProductDetails, createProductReview } from '../../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants';
import { SIZE_SMALL_PRICE, SIZE_MEDIUM_PRICE, SIZE_LARGE_PRICE } from '../../constants/priceConstants';

// TODO remove ts-config and refactor

// @ts-ignore
const ProductDetailScreen: React.FC = ({ history, match }) => {
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(SIZE_SMALL_PRICE);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // @ts-ignore
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  // @ts-ignore
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // @ts-ignore
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { loading: loadingProductReview, success: successProductReview, error: errorProductReview } = productReviewCreate;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));

    if (successProductReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successProductReview, product._id]);

  // @ts-ignore
  const priceChangeHandler = (e) => {
    switch (e.target.value) {
      case 'sm':
        setPrice(SIZE_SMALL_PRICE);
        break;
      case 'med':
        setPrice(SIZE_MEDIUM_PRICE);
        break;
      case 'lg':
        setPrice(SIZE_LARGE_PRICE);
        break;
      default:
        console.error('error within priceChangeHandler');
    }
  };

  // @ts-ignore
  const qtyChangeHandler = (e) => {
    setQty(e.target.value);
  };

  // @ts-ignore
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}&price=${price}`);
  };

  // @ts-ignore
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        // @ts-ignore
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {/* @ts-ignore */}
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
                  {/* @ts-ignore */}
                  <Rating value={product.rating} text={`${product.numberOfReviews} review`} />
                </ListGroup.Item>
                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            {/* Add to Cart Section */}
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Size:</Col>
                      <Col>
                        <Form.Control as="select" aria-label="Select a size" onChange={priceChangeHandler}>
                          <option key="sm" value="sm">
                            Small (12')
                          </option>
                          <option key="med" value="med">
                            Medium (14')
                          </option>
                          <option key="lg" value="lg">
                            Large (18')
                          </option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        <Form.Control as="select" aria-label="Select quantity" onChange={qtyChangeHandler}>
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
                    {userInfo ? (
                      <Button onClick={addToCartHandler} className="btn-block" type="button">
                        Add To Cart
                      </Button>
                    ) : (
                      // @ts-ignore
                      <Message>
                        <Link to="/login">Sign in</Link> to place order
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          {/* Product Review Section */}
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {/* @ts-ignore */}
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {/* @ts-ignore */}
                {/* comment back in after refactoring to ts */}
                {/* {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createAt}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))} */}
              </ListGroup>
              {/* New Review Form */}
              <ListGroup.Item>
                <h2>Write a Customer Review</h2>
                {loadingProductReview && <Loader />}
                {/* @ts-ignore */}
                {successProductReview && <Message variant="success">Review submitted successfully</Message>}
                {/* @ts-ignore */}
                {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      {/* @ts-ignore */}
                      <Form.Control as="select" value={rating} onChange={(e) => setRating(e.target.value)}>
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
                      {/* @ts-ignore */}
                      <Form.Control as="textarea" row="4" value={comment} onChange={(e) => setComment(e.target.value)} />
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form.Group>
                  </Form>
                ) : (
                  //@ts-ignore
                  <Message>
                    Please <Link to="/login">sign in</Link> to write a review
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
