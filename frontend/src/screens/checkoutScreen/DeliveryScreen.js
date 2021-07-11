import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutProgress from "../../components/CheckoutProgress";
import FormContainer from "../../components/FormContainer";
import { saveDeliveryDate } from "../../actions/cartActions";

const DeliveryScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // if there is no shipping Address, re-direct to shipping screen
  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [deliveryDate, setDeliveryDate] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveDeliveryDate(deliveryDate));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutProgress signin shipping delivery />
      <h1>Delivery Date</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="delveryDate">
          <Form.Label>Select Delivery Date</Form.Label>
          <Form.Control
            type="date"
            required
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default DeliveryScreen;