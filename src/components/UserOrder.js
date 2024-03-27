import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }

      fetch(`${process.env.REACT_APP_API_URL}/orders/my-orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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

    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className='my-5 pt-5'>My Orders</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date Ordered</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{new Date(order.orderedOn).toLocaleDateString()}</td>
              <td>{order.productsOrdered.reduce((acc, cur) => acc + cur.quantity, 0)}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderPage;
