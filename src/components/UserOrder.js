import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, Alert, Spinner, Table } from 'react-bootstrap';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        setError('Token not found');
        return;
      }
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`, {
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
          const productIds = data.orders.reduce((acc, order) => {
            return [...acc, ...order.productsOrdered.map(item => item.productId)];
          }, []);
          fetchProducts(productIds, token);
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
          setError('Failed to fetch orders');
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const fetchProducts = (productIds, token) => {
      Promise.all(
        productIds.map(productId => {
          return fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to fetch product');
              }
              return response.json();
            })
            .then(product => {
              return { [productId]: { name: product.product.name, price: product.product.price, image: product.product.name.toLowerCase() + '.jpg' } };
            })
            .catch(error => {
              console.error('Error fetching product:', error);
              return {};
            });
        })
      )
        .then(products => {
          const mergedProducts = Object.assign({}, ...products);
          setProducts(mergedProducts);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          setError('Failed to fetch products');
        });
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (orders.length === 0) {
    return <Alert variant="info">No orders found.</Alert>;
  }

  return (
    <div>
      <h1 className='my-5 pt-5'>My Orders</h1>
      <Accordion>
        {orders.map((order, index) => (
          <div key={order._id} style={{ marginBottom: '20px' }}>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={index.toString()} style={{ width: '100%', textAlign: 'left' }}>
                  <div className='row align-items-center'>
                    <div className='col-5 col-md-4'>
                      {new Date(order.orderedOn).toLocaleDateString()}
                    </div>
                    <div className='col-4'>
                      {order.status}
                    </div>
                    <div className='col-5 col-md-4'>
                      ₱ {order.totalPrice.toFixed(2)}
                    </div>
                    <div className='col-12 text-right'>
                      <span className="down-arrow"></span>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={index.toString()}>
                <Card.Body>
                  <Table striped bordered hover reponsive m-0 p-0>
                    <thead>
                      <tr>
                      </tr>
                    </thead>
                    <tbody>
                      {order.productsOrdered.map(item => (
                        <tr key={item.productId}>
                          {/* <td className="text-center"><img src={`../images/${products[item.productId]?.image}`} alt={products[item.productId]?.name} style={{ maxWidth: '50px', maxHeight: '50px' }} /></td> */}
                          <td>{item.quantity}x {products[item.productId]?.name}</td>
                          <td>₱ {(products[item.productId]?.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </div>
        ))}
      </Accordion>
    </div>
  );
};

export default OrderPage;
