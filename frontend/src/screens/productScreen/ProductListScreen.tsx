import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message.js';
import Loader from '../../components/Loader.js';
import { listProducts, deleteProduct, createProduct } from '../../actions/productActions.js';
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants.js';

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch();

  // get all products
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // delete a product
  const productDeleted = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDeleted;

  // create a product
  const productCreated = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreated;

  // get current log in user info
  const currentUserLogin = useSelector((state) => state.userLogin);
  const { userInfo } = currentUserLogin;

  useEffect(() => {
    // reset product object in state after creating a new product
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    // if creating a new product was successful, redirect user to product edit screen
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }

    dispatch(listProducts());
  }, [dispatch, userInfo, history, successDelete, successCreate]);

  // FUNCTIONS
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
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <message variant="danger">{errorCreate}</message>}
      {loading ? (
        <Loader />
      ) : error ? (
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
