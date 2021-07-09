import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message.js";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
  return <h1>Cart Screen</h1>;
};

export default CartScreen;
