import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

// TODO remove ts-ignore and refactor

// @ts-ignore
const SearchBox: React.FC = ({ history }) => {
  const [searchProduct, setSearchProduct] = useState('');

  // @ts-ignore
  const submitHandler = (e) => {
    e.preventDefault();

    if (searchProduct.trim()) {
      history.push(`/search/${searchProduct}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form id="searchbox" onSubmit={submitHandler}>
      <Form.Control type="text" name="searchbox" placeholder="Search" className="mr-sm-2 ml-sm-5" onChange={(e) => setSearchProduct(e.target.value)}></Form.Control>
      <Button type="submit" variant="putline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
