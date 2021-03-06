import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import { listUserOrders } from '../../actions/orderActions';
import { RouterDomComponentProps } from '../../models/react-router-dom.model';

const UserProfileScreen: React.FC<RouterDomComponentProps> = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  // @ts-ignore
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // @ts-ignore
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  // @ts-ignore
  const userUpdatedProfile = useSelector((state) => state.userUpdatedProfile);
  const { success: successUpdatedProfile } = userUpdatedProfile;

  // @ts-ignore
  const orderListUser = useSelector((state) => state.orderListUser);
  const { loading: loadingUserOrdersList, error: errorUserOrdersList, orders } = orderListUser;

  useEffect(
    () => {
      if (!userInfo) {
        history.push('/login');
      } else {
        if (!user.name) {
          dispatch(getUserDetails('profile'));
          dispatch(listUserOrders());
        } else {
          setName(user.name);
          setEmail(user.email);
        }
      }
    },
    // eslint-disable-next-line no-restricted-globals
    [dispatch, userInfo, user],
  );

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // @ts-ignore
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        }),
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>{user.name} Profile</h2>
        {/* @ts-ignore */}
        {message && <Message variant="danger">{message}</Message>}
        {/* @ts-ignore */}
        {error && <Message variant="danger">{error}</Message>}
        {/* @ts-ignore */}
        {successUpdatedProfile && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Order History</h2>
        {loadingUserOrdersList ? (
          <Loader />
        ) : errorUserOrdersList ? (
          // @ts-ignore
          <Message variant="danger">{errorUserOrdersList}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* @ts-ignore */}
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? <i className="fas fa-check" style={{ color: 'green' }}></i> : <i className="fas fa-times" style={{ color: 'red' }}></i>}</td>
                  <td>{order.isDelivered ? <i className="fas fa-check" style={{ color: 'green' }}></i> : <i className="fas fa-times" style={{ color: 'red' }}></i>}</td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default UserProfileScreen;
