import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutProgress from '../../components/CheckoutProgress';
import FormContainer from '../../components/FormContainer';
import { savePaymentMethod } from '../../actions/cartActions';

// TODO remove ts-ignore and refactor

// @ts-ignore
const PaymentScreen: React.FC = ({ history }) => {
  const dispatch = useDispatch();

  // @ts-ignore
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, deliveryDate } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  } else if (!deliveryDate) {
    history.push('/delivery');
  }

  //  set PayPal as default for future change to add more payment method options
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  // @ts-ignore
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/summary');
  };

  return (
    <FormContainer>
      {/* @ts-ignore */}
      <CheckoutProgress signin shipping delivery payment />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check type="radio" label="PayPal or Credit Card" id="PayPal" checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
