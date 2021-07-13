import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  // state variables for user personal info form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userLogin);
  const { loading, error, user } = userDetails;

  const userUpdatedProfile = useSelector((state) => state.userUpdatedProfile);
  const { success: successUpdatedProfile } = userUpdatedProfile;

  const userOrdersList = useSelector((state) => state.userOrdersList);
  const {
    loading: loadingUserOrdersList,
    error: errorUserOrdersList,
    orders,
  } = userOrdersList;

  useEffect(() => {
    if (!userInfo) {
      history.pushState("/login");
    } else {
      // get user details
      if (!user.name) {
        // get user details and list orders
      }
    }
  });

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
