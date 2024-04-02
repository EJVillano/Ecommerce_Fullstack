import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Cart() {
  const [cart, setCart] = useState({ cartItems: [], totalPrice: 0 });
  const [productMap, setProductMap] = useState({});

  useEffect(() => {
    console.log("Fetching cart data...");
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {
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
          setCart({ cartItems: [], totalPrice: 0 }); // Set cart to empty when no cart is found
        }
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  useEffect(() => {
    if (cart.cartItems.length > 0) {
      const totalPrice = cart.cartItems.reduce((acc, item) => acc + item.subtotal, 0);
      setCart(prevCart => ({
        ...prevCart,
        totalPrice: totalPrice
      }));
    }
  }, [cart.cartItems]);

  const fetchProductsDetails = (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
      return;
    }

    const productIds = cartItems.map(item => item.productId);
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products?ids=${productIds.join(',')}`)
      .then(res => res.json())
      .then(data => {
        const products = data.products;
        console.log("Products received:", products);
        const productDetailsMap = {};
        products.forEach(product => {
          productDetailsMap[product._id] = {
            name: product.name,
            price: product.price
          };
        });
        setProductMap(productDetailsMap);

        const updatedCart = cartItems.map(item => ({
          productId: item.productId,
          name: (productDetailsMap[item.productId] && productDetailsMap[item.productId].name) || 'Product Name Not Found',
          price: (productDetailsMap[item.productId] && productDetailsMap[item.productId].price) || 0,
          quantity: item.quantity,
          subtotal: item.subtotal
        }));

        setCart(prevCart => ({
          ...prevCart,
          cartItems: updatedCart
        }));
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  };

  const handleEditQuantity = (item, increment) => {
    const newQuantity = increment ? item.quantity + 1 : Math.max(1, item.quantity - 1);
    const updatedCartItem = { productId: item.productId, quantity: newQuantity };

    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/update-cart-quantity`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(updatedCartItem)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to update quantity');
      }
    })
    .then(data => {
      // Update the cart with the updated item
      const updatedCartItems = cart.cartItems.map(cartItem => {
        if (cartItem.productId === item.productId) {
          return {
            ...cartItem,
            quantity: newQuantity,
            subtotal: newQuantity * cartItem.price
          };
        }
        return cartItem;
      });
      setCart(prevCart => ({
        ...prevCart,
        cartItems: updatedCartItems
      }));
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

  const handleRemoveItem = (productId) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/${productId}/remove-from-cart`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        if (response.ok) {
          setCart(prevCart => ({
            ...prevCart,
            cartItems: prevCart.cartItems.filter(item => item.productId !== productId)
          }));
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            text: 'Item removed from cart successfully.'
          });
        } else {
          throw new Error('Failed to remove item from cart');
        }
      })
      .catch(error => {
        console.error('Error removing item from cart:', error);
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'An error occurred while removing item from cart. Please try again later.'
        });
      });
  };

  const clearCart = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/clear-cart`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to clear cart');
        }
      })
      .then(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {
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
        
        Swal.fire({
          title: 'Cart Cleared!',
          icon: 'success',
          text: 'Your cart has been cleared successfully.'
        });
      })
      .catch(error => {
        console.error('Error clearing cart:', error);
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'An error occurred while clearing the cart. Please try again later.'
        });
      });
  };

  const checkout = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
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

  if (!cart || !cart.cartItems) {
    return (
      <div>
        <p className="my-5 pt-5">No cart available at the moment.</p>
        <Button variant="primary">Products</Button>
      </div>
    );
  }

  return (
    <div className="cart-container" >
      <h2 className="my-5 pt-5">Shopping Cart</h2>
      {cart && cart.cartItems && cart.cartItems.length > 0 ? (
        <React.Fragment>
          {cart.cartItems.map(item => (
            <div key={item.productId} className="card mb-3 bg-pic">
              <div className="card-body row d-flex justify-content-between">
                <div className='col-6'>
                  
                  <h5 className="card-title mt-2">{item.name}</h5>
                  <p className="card-text">Price: ${item.price}</p>
                  <p className="card-text">
                    <Button variant="dark" className='mx-2' onClick={() => handleEditQuantity(item, false)}>-</Button>
                    {item.quantity}
                    <Button variant="dark" className='ml-2' onClick={() => handleEditQuantity(item, true)}>+</Button>
                  </p>
                  <p className="card-text text-success txt-sz-lg">₱ {item.subtotal}</p>                   
                  <Button variant="danger" onClick={() => handleRemoveItem(item.productId)}>Remove</Button>
                </div>
                <div className='col-6 col-sm-4 col-md-2'>
                  <img src={`./images/${item.name}.jpg`} alt={item.name} className="img-fluid" />
                </div>
              </div>
            </div>
          ))}
          <div className="text-center mb-4">
            <p className="font-weight-bold text-lg txt-sz-lg">Total: ₱ {cart.totalPrice}</p>
            <Button className="btn btn-success mx-2" onClick={checkout}>Checkout</Button>
            <Button className="btn btn-danger mx-2" onClick={clearCart}>Clear Cart</Button>
          </div>
        </React.Fragment>
      ) : (
        <p className="my-5 pt-5">Cart is empty!</p>
      )}
    </div>
  );
  
}
