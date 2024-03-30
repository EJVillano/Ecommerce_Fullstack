// OrderPage.js

import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/all-orders`,{
        headers:{
            Authorization: `Bearer ${ localStorage.getItem('token')}`
        }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        return response.json();
      })
      .then(data => {
        setOrders(data.orders);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  };

  return (
    <div>
      <h2>All Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center bg-dark text-white">
            <th>Order ID</th>
            <th>User ID</th>
            <th>Total Price</th>
            <th>Ordered On</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>{new Date(order.orderedOn).toLocaleString()}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderPage;
