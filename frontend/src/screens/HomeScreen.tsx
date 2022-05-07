import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import MetaData from '../components/MetaData';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from '../actions/productActions';
import ProductCarousel from '../components/ProductCarousel';

// TODO remove ts-ignore and refactor

// @ts-ignore
const HomeScreen: React.FC = ({ match }) => {
  const dispatch = useDispatch();

  const searchProduct = match.params.searchProduct;

  // @ts-ignore
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(searchProduct));
  }, [dispatch, searchProduct]);

  return (
    <>
      <MetaData />
      {!searchProduct ? (
        <>
          <ProductCarousel />
          <h2>Latest Baked Goods</h2>
        </>
      ) : (
        <>
          <Link to="/" className="btn btn-light">
            Go Back
          </Link>
          <h2>Search Results</h2>
        </>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        // @ts-ignore
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {/* @ts-ignore */}
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              {/* @ts-ignore */}
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
