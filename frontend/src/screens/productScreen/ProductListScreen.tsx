import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listProducts, deleteProduct, createProduct } from '../../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants';
import { RouterDomComponentProps } from '../../models/react-router-dom.model';

const ProductListScreen: React.FC<RouterDomComponentProps> = ({ history }) => {
  const dispatch = useDispatch();

  // @ts-ignore
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // @ts-ignore
  const productDeleted = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDeleted;

  // @ts-ignore
  const productCreated = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreated;

  // @ts-ignore
  const currentUserLogin = useSelector((state) => state.userLogin);
  const { userInfo } = currentUserLogin;

  useEffect(
    () => {
      dispatch({ type: PRODUCT_CREATE_RESET });

      if (!userInfo || !userInfo.isAdmin) {
        history.push('/login');
      }

      if (successCreate) {
        // @ts-ignore
        history.push(`/admin/product/${createdProduct._id}/edit`);
      } else {
        dispatch(listProducts());
      }

      dispatch(listProducts());
    },
    // eslint-disable-next-line no-restricted-globals
    [dispatch, userInfo, history, successDelete, successCreate],
  );

  // @ts-ignore
  const deleteProductHander = (productId, productName) => {
    if (window.confirm(`Confirm deleting ${productName}?`)) {
      dispatch(deleteProduct(productId));
    }
  };

  const createNewProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createNewProductHandler}>
            <i className="fas fa-plus" /> Add new product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {/* @ts-ignore */}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {/* @ts-ignore */}
      {errorCreate && <message variant="danger">{errorCreate}</message>}
      {loading ? (
        <Loader />
      ) : error ? (
        // @ts-ignore
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>PRODUCT ID</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* @ts-ignore */}
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>{' '}
                    <Button variant="danger" className="btn-sm" onClick={() => deleteProductHander(product._id, product.name)}>
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
