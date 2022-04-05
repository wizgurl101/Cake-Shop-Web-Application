import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route } from 'react-router-dom';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';

// TODO remove ts-ignore and refactor

const Header: React.FC = () => {
  const dispatch = useDispatch();

  // @ts-ignore
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  let userHeader = '';
  // check if user is admin to display admin header
  if (userInfo && userInfo.isAdmin) {
    // @ts-ignore
    userHeader = (
      <NavDropdown title="Admin" id="adminmenu">
        <LinkContainer to="/profile">
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/admin/orderList">
          <NavDropdown.Item>Orders</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/admin/productList">
          <NavDropdown.Item>Products</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/admin/userList">
          <NavDropdown.Item>Users</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
      </NavDropdown>
    );
  }
  // user is not admin
  if (userInfo && !userInfo.isAdmin) {
    // @ts-ignore
    userHeader = (
      <NavDropdown title={userInfo.name} id="username">
        <LinkContainer to="/profile">
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
      </NavDropdown>
    );
  }

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <strong>Delightful Sweets</strong>
            </Navbar.Brand>
          </LinkContainer>
          <Route render={({ history }) => <SearchBox history={history} />} />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" />
          <Nav className="ml-auto">
            {userInfo && (
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart" />
                  Cart
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo ? (
              userHeader
            ) : (
              <LinkContainer to="/login">
                <Nav.Link href="/login">Sign In</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
