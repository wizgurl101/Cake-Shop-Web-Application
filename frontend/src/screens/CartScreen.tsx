import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message.js';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { SIZE_SMALL_PRICE } from '../constants/priceConstants.js';
import { determinePrice, determineSize } from '../helpers/PriceSizeHelpers.js';

const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();
  const productId = match.params.id;

  const productQty = location.search ? Number(location.search.split('&')[0].split('=')[1]) : 1;

  const productPrice = location.search ? Number(location.search.split('&')[1].split('=')[1]) : SIZE_SMALL_PRICE;

  const [price, setPrice] = useState(productPrice);
  const [qty, setQty] = useState(productQty);

  let size = determineSize(price);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    // only add to cart if there is a product ID
    if (productId) {
      dispatch(addToCart(productId, qty, size, price));
    }
  }, [dispatch, productId, qty, size, price]);

  // FUNCTIONS
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const sizeChangeHandler = (e) => {
    setPrice(determinePrice(e.target.value));
  };

  const checkoutHandler = () => {
    // redirect login user to shipping page
    history.push('/shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((cartItem) => (
              <ListGroup.Item key={cartItem.product}>
                <Row>
                  <Col md={2}>
                    <Image src={cartItem.image} alt={cartItem.name} fluid />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${cartItem.product}`}>{cartItem.name}</Link>
                  </Col>
                  <Col md={2}>
                    <Form.Control as="select" value={cartItem.size} onChange={sizeChangeHandler}>
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
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => {
                        setQty(e.target.value);
                        dispatch(addToCart(cartItem.product, Number(e.target.value), size, price));
                      }}
                    >
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
                  <Col md={2}>
                    <Button type="button" variant="light" onClick={() => removeFromCartHandler(cartItem.product)}>
                      <i className="fas fa-trash">Delete</i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, '')}) items</h2>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
