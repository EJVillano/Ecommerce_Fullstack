import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar(){


	
	const { user } = useContext(UserContext);


	return (

		<Navbar bg="dark" expand="lg" variant="dark" fixed="top">
			<Container fluid className='text-light'>
			  <Navbar.Brand as={Link} to="/">TITANIA</Navbar.Brand>
			  <Navbar.Toggle aria-controls="basic-navbar-nav" />
			  <Navbar.Collapse id="basic-navbar-nav">
			    <Nav className="ml-auto">
			      <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
			      <Nav.Link as={NavLink} to="/products" exact="true">Products</Nav.Link>

			     

			      	{(user.id !== null) ? 

	      	            user.isAdmin ?
	      	            <>
	      	                <Nav.Link as={Link} to="/addProduct">Add Product</Nav.Link>
							<Nav.Link as={Link} to="/order"> Orders</Nav.Link>
	      	                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
	      	            </>
	      	            :
	      	            <>
	      	                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
							<Nav.Link as={Link} to="/cart">Cart</Nav.Link>
							<Nav.Link as={Link} to="/order">My Orders</Nav.Link>
	      	                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
	      	            </>
		      	        : 
	      	            <>
	      	                <Nav.Link as={Link} to="/login">Login</Nav.Link>
	      	                <Nav.Link as={Link} to="/register">Register</Nav.Link>
							
	      	            </>
		      	    }
			      
			    </Nav>
			  </Navbar.Collapse>

		  </Container>
		
		</Navbar>


	)
}