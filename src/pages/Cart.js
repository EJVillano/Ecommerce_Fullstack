import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Cart() {
  const [cart, setCart] = useState({ cartItems: [], totalPrice: 0 });
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState(1);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/cart/get-cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Data received from API:", data);
        if (data.cart && data.cart.cartItems) {
          setCart(data.cart);
          fetchProductsDetails(data.cart.cartItems);
        } else {
          console.error("Data structure from API is invalid:", data);
          setCart(null); // Set cart to null when no cart is found
        }
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  const fetchProductsDetails = (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
      return;
    }

    const promises = cartItems.map(item =>
      fetch(`${process.env.REACT_APP_API_URL}/products/${item.productId}`)
        .then(res => res.json())
    );

    Promise.all(promises)
      .then(products => {
        const updatedCart = cartItems.map((item, index) => {
          return {
            productId: item.productId,
            name: products[index].name,
            price: products[index].price,
            quantity: item.quantity,
            subtotal: item.subtotal
          };
        });
        setCart(prevCart => ({
          ...prevCart,
          cartItems: updatedCart
        }));
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  };

  const handleEditQuantity = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleSubmit = () => {
    fetch(`${process.env.REACT_APP_API_URL}/cart/update-cart-quantity`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ 
        productId: selectedItem.productId,
        quantity: newQuantity 
      }) // Sending the updated quantity
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to update quantity');
        }
      })
      .then(updatedCartItem => {
        // Fetch updated cart data
        fetch(`${process.env.REACT_APP_API_URL}/cart/get-cart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(res => res.json())
          .then(data => {
            if (data.cart && data.cart.cartItems) {
              setCart(data.cart);
            } else {
              console.error("Data structure from API is invalid:", data);
              setCart(null); // Set cart to null when no cart is found
            }
          })
          .catch(error => {
            console.error('Error fetching updated cart data:', error);
          });

        setShowModal(false);

        // Show SweetAlert confirmation
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          text: 'Quantity updated successfully.'
        });
      })
      .catch(error => {
        console.error('Error updating quantity:', error);
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'An error occurred while updating quantity. Please try again later.'
        });
      });
  };

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
        setCart({ cartItems: [], totalPrice: 0 });
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

  if (cart === null) {
    return (
      <div>
        <p className="my-5 pt-5">No cart available at the moment.</p>
        <Button variant="primary">Products</Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="my-5 pt-5">Shopping Cart</h2>
      {cart && cart.cartItems && cart.cartItems.length > 0 ? (
        <React.Fragment>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Edit Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cart.cartItems.map(item => (
                <tr key={item.productId}>
                  <td>{item.productId}</td>
                  <td>{item.name}</td>
                  <td>PHP{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>PHP{item.subtotal}</td>
                  <td>
                    <Button variant="info" onClick={() => handleEditQuantity(item)}>Edit</Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="4">Total:</td>
                <td>PHP{cart.totalPrice}</td>
              </tr>
            </tbody>
          </Table>
          <Button onClick={checkout}>Checkout</Button>
        </React.Fragment>
      ) : (
        <p className="my-5 pt-5">Cart is empty!</p>
      )}

      {/* Quantity Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formQuantity">
            <Form.Label>New Quantity:</Form.Label>
            <Form.Control
              type="number"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              min="1"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
