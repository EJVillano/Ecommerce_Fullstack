import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/cart/get-cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setCart(data.cart);
      });
  }, []);

  const checkout = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/orders/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(() => {
        Swal.fire({
          title: 'Checkout Successful!',
          icon: 'success',
          text: 'Your order has been created successfully'
        });
        setCart([]);
      })
      .catch(error => {
        console.error('Error during checkout:', error);
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'An error occurred during checkout. Please try again later.'
        });
      });
  };

  if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
    return <p>Cart is empty!</p>;
  }

  return (
    <div>
      <h2 className="my-5 pt-5">Shopping Cart</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.cartItems.map(item => (
            <tr key={item.productId}>
              <td>{item.productId}</td>
              <td></td>
              <td></td>
              <td>{item.quantity}</td>
              <td>${item.subtotal}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3">Total:</td>
            <td>${cart.totalPrice}</td>
          </tr>
        </tbody>
      </Table>
      <Button onClick={checkout}>Checkout</Button>
    </div>
  );
}
