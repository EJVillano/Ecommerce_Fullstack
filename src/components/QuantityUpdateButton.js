import React from 'react';
import { Button } from 'react-bootstrap';

const QuantityUpdateButton = ({ productId, quantity, handleUpdateQuantity }) => {
  const handleIncreaseQuantity = () => {
    handleUpdateQuantity(productId, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    // Ensure quantity doesn't go below 1
    if (quantity > 1) {
      handleUpdateQuantity(productId, quantity - 1);
    }
  };

  return (
    <div>
      <Button variant="outline-primary" onClick={handleDecreaseQuantity}>-</Button>{' '}
      <span>{quantity}</span>
      <Button variant="outline-primary" onClick={handleIncreaseQuantity}>+</Button>
    </div>
  );
};

export default QuantityUpdateButton;
