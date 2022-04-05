import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { addZeroAtEnd } from '../../helpers/PriceSizeHelpers';
import { changeOrderDeliveryStatus, getOrderDetails, processOrderPayment } from '../../actions/orderActions';
import { ORDER_DELIVERY_RESET, ORDER_PAYMENT_RESET } from '../../constants/orderConstants';

// TODO remove ts-config and refactor

// @ts-ignore
const OrderDetailScreen: React.FC = ({ match, history }) => {
  const dispatch = useDispatch();
  const orderId = match.params.id;

  // state variables
  // for PayPal integration
  const [sdkReady, setSdkReady] = useState(false);

  // @ts-ignore
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // @ts-ignore
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  // @ts-ignore
  const orderPayment = useSelector((state) => state.orderPayment);
  const { loading: loadingPayment, success: successPayment } = orderPayment;

  // @ts-ignore
  const orderDelivery = useSelector((state) => state.orderDelivery);
  const { loading: loadingDelivery, success: successDelivery } = orderDelivery;

  // If page is not loading
  if (!loading) {
    // calculate order price before tax
    order.itemsPrice = addZeroAtEnd(order.orderItems.reduce((acc: number, item: any): number => acc + item.price * item.qty, 0));
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    const addPayPalScript = async () => {
      // fetch client id from backend to access PayPal business account
      const { data: clientId } = await axios.get('/cakeshop/config/paypal');

      // build sdk script and append it to the page
      const sdkScript = document.createElement('script');
      sdkScript.type = 'text/javascript';
      sdkScript.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      sdkScript.async = true;

      sdkScript.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(sdkScript);
    };

    if (!order || order._id !== orderId || successPayment || successDelivery) {
      dispatch({ type: ORDER_PAYMENT_RESET });
      dispatch({ type: ORDER_DELIVERY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [history, userInfo, order, orderId, successPayment, successDelivery]);

  const setDeliveryStatusHandler = () => {
    dispatch(changeOrderDeliveryStatus(order));
  };

  // @ts-ignore
  const setPaymentStatusHandler = (paymentResult) => {
    dispatch(processOrderPayment(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order #{order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Delivered on {order.deliveryDate.substring(0, 10)}</Message>
              ) : (
                <Message variant="danger">
                  <strong>Not Delivered </strong>- Delivery Date: {order.deliveryDate.substring(0, 10)}
                </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? <Message variant="success">Paid on {order.paidAt.substring(0, 10)}</Message> : <Message variant="danger">Not Paid</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                // @ts-ignore
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {/* @ts-ignore */}
                  {order.orderItems.map((orderItem, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={orderItem.image} alt={orderItem.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${orderItem.product}`}>{orderItem.name}</Link>
                        </Col>
                        <Col md={4}>Size: {orderItem.size}</Col>
                        <Col md={4}>
                          {orderItem.qty} x ${orderItem.price} = ${orderItem.qty * orderItem.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPayment && <Loader />}
                  {!sdkReady ? <Loader /> : <PayPalButton amount={order.totalPrice} onSuccess={setPaymentStatusHandler} />}
                </ListGroup.Item>
              )}
              {loadingDelivery && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type="button" className="btn btn-block" onClick={setDeliveryStatusHandler}>
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderDetailScreen;
