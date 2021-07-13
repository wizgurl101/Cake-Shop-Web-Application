import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const OrderDetailScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const orderId = match.params.id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const {
    order,
    loading: loadingOrderDetails,
    error: errorOrderDetails,
  } = orderDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userLogin]);

  // FUNCTIONS
  const setDeliverStatusHandler = () => {
    console.log("order been delivered");
  };

  const setPaymentStatusHandler = () => {
    console.log("order been paid");
  };

  return loadingOrderDetails ? (
    <Loader />
  ) : errorOrderDetails ? (
    <Message variant="danger">{errorOrderDetails}</Message>
  ) : (
    <>
      <h1>Order #{order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
            </ListGroup.item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};
export default OrderDetailScreen;
