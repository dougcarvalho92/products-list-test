import React from "react";

import "./styles.css";

import { Card } from "react-bootstrap";

const ProductItem = ({ product, ...props }) => {
  return (
    <Card>
      <Card.Img variant="top" src={product.image_url} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
