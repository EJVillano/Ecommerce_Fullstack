import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/all-orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
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
        fetchUserNames(data.orders);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  };

  const fetchUserNames = async (orders) => {
    const userIds = orders.map(order => order.userId);
    const uniqueUserIds = [...new Set(userIds)]; // Get unique user ids
    const newNames = {};

    for (const userId of uniqueUserIds) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const userData = await response.json();
        const userName = `${userData.user.firstName} ${userData.user.lastName}`;
        newNames[userId] = userName;
      } catch (error) {
        console.error(`Error fetching user details for user ID ${userId}:`, error);
        newNames[userId] = 'Unknown';
      }
    }

    setUserNames(newNames);
  };

  return (
    <div className='my-5 pt-5 text-center'>
      <h2>All Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center bg-dark text-white">
            <th>Order ID</th>
            <th>User Name</th>
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
}
