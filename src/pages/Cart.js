import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(()=>{

    fetch(`${process.env.REACT_APP_API_URL}/cart/get-cart`,{
        headers:{
            Authorization: `Bearer ${ localStorage.getItem('token')}`
        }
    })
    .then(res=>res.json())
    .then(data=>{

        console.log(data);
        setCart(data.cart);
        
        
        
    })
},[])


  if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
    return <p>Cart is empty!</p>;
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
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
    </div>
  );
}


