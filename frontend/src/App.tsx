import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/checkoutScreen/ShippingScreen';
import DeliveryScreen from './screens/checkoutScreen/DeliveryScreen';
import PaymentScreen from './screens/checkoutScreen/PaymentScreen';
import SummaryScreen from './screens/checkoutScreen/SummaryScreen';
import OrderDetailScreen from './screens/orderScreen/OrderDetailScreen';
import OrderListScreen from './screens/orderScreen/OrderListScreen';
import UserListScreen from './screens/userScreen/UserListScreen';
import UserEditScreen from './screens/userScreen/UserEditScreen';
import UserProfileScreen from './screens/userScreen/UserProfileScreen';
import ProductListScreen from './screens/productScreen/ProductListScreen';
import ProductEditScreen from './screens/productScreen/ProductEditScreen';
import ProductDetailScreen from './screens/productScreen/ProductDetailScreen';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={UserProfileScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/delivery" component={DeliveryScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/summary" component={SummaryScreen} />
          <Route path="/order/:id" component={OrderDetailScreen} />
          <Route path="/product/:id" component={ProductDetailScreen} />
          <Route path="/admin/userList" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/admin/productList" component={ProductListScreen} />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/admin/orderList" component={OrderListScreen} />
          <Route path="/search/:searchProduct" component={HomeScreen} />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
