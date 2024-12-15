import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

//Route Components
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import AppNavbar from './components/AppNavbar';
import Products from './pages/Products';
import ProductView from './pages/ProductView';
import AddProduct from './pages/AddProduct';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Order from './pages/Order';
import './App.css';
import { UserProvider } from './UserContext';


function App() {

 
  const [user, setUser] = useState({

    id: null,
    isAdmin: null 

  })

  
  const unsetUser = () =>{
    localStorage.clear()
  }

  
  useEffect(()=>{
   
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res=>res.json())
    .then(data=>{

      console.log(data)

      if(typeof data.user !== "undefined"){
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        })
      }else{
        setUser({
          id: null,
          isAdmin: null
        })
      }

    })
  },[])


  return (
    <UserProvider value={{user, setUser, unsetUser}}>
    
        <Router>
         
            < AppNavbar />
            <Container fluid>
                  <Routes>
                  
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/products/:productId" element={<ProductView/>}/>
                    <Route path="/addProduct" element={<AddProduct/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/" element={<Login/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="*" element={<Error />} />
                  </Routes>
            </Container>
        </Router>
      </UserProvider>
    );

}


export default App;
