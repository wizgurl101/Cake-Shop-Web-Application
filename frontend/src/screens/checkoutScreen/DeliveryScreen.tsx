// @ts-nocheck
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutProgress from '../../components/CheckoutProgress';
import FormContainer from '../../components/FormContainer';
import { saveDeliveryDate } from '../../actions/cartActions';
import { RouterDomComponentProps } from '../../models/react-router-dom.model';

const DeliveryScreen: React.FC<RouterDomComponentProps> = ({ history }) => {
  const dispatch = useDispatch();

  // @ts-ignore
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [deliveryDate, setDeliveryDate] = useState('');

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(saveDeliveryDate(deliveryDate));
    history.push('/payment');
  };

  return (
    <FormContainer>
      {/* @ts-ignore */}
      <CheckoutProgress signin shipping delivery />
      <h1>Delivery Date</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="delveryDate">
          <Form.Label>Select Delivery Date</Form.Label>
          <Form.Control type="date" required onChange={(e) => setDeliveryDate(e.target.value)} />
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default DeliveryScreen;
