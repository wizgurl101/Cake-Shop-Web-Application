import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// TODO remove ts-ignore and refactor

// @ts-ignore
const CheckoutProgress: React.FC = ({ signIn, shipping, delivery, payment, summary }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {signIn ? (
          <LinkContainer to="/login">
            <Nav.Link>SIGN IN</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>SIGN IN</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {shipping ? (
          <LinkContainer to="/shipping">
            <Nav.Link>SHIPPING</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>SHIPPING</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {delivery ? (
          <LinkContainer to="/delivery">
            <Nav.Link>DELIVERY</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>DELIVERY</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {payment ? (
          <LinkContainer to="/payment">
            <Nav.Link>PAYMENT</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>PAYMENT</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {summary ? (
          <LinkContainer to="/summary">
            <Nav.Link>SUMMARY</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>SUMMARY</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutProgress;
