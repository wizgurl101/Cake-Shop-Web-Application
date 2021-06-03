import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { listProducts } from "../actions/productActions.js";

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch();

  // get all products
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // get current log in user info
  const currentUserLogin = useSelector((state) => state.userLogin);
  const { userInfo } = currentUserLogin;

  useEffect(() => {
    // if current user is not admin, redirect to login page
    if (!userInfo.isAdmin) {
      history.pushState("/login");
    }
  }, [userInfo, history]);

  // FUNCTIONS
  const deleteProductHander = () => {
    console.log("deleted product");
  };

  const createNewProductHandler = () => {
    console.log("add new product");
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createNewProductHandler}>
            <i className="fas fa-plus" />
            Add new product
          </Button>
        </Col>
      </Row>
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
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteProductHander(product._id)}
                    >
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
