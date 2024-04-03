import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


export default function Register(){

	const {user} = useContext(UserContext);
    const navigate = useNavigate();
	console.log(user);


	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");	
	const [email,setEmail] = useState("");
    const [mobileNo,setMobileNo] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isActive, setIsActive] = useState(false);

    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(mobileNo);
    console.log(password);
    console.log(confirmPassword);


    function registerUser(e){

    	
    	e.preventDefault();

    	fetch(`${process.env.REACT_APP_API_BASE_URL}/users/`,{

    		method:'POST',
    		headers:{
    			"Content-Type":"application/json"
    		},
    		body: JSON.stringify({

    			firstName: firstName,
    			lastName: lastName,
    			email: email,
    			mobileNo: mobileNo,
    			password: password

    		})
    	}).then(res=>res.json())
    	.then(data =>{

    		
    		console.log(data)
    		
    		if(data.message === "Registered Successfully"){

    			setFirstName('');
    			setLastName('');
    			setEmail('');
    			setMobileNo('');
    			setPassword('');
    			setConfirmPassword('');

    			Swal.fire({
                    title:"Register Successful!",
                    icon: "success",
                    text: "Welcome Ecommerce"
                })
                .then(() => {
                    navigate('/');
                });

    		}else if (data.error === "Email invalid"){
    			alert("Email is invalid")
    		}else if(data.error === "Mobile number invalid"){
    			alert("Mobile number is invalid")
    		}else if(data.error === "Password must be atleast 8 characters"){
    			alert("Password must be at least 8 characters")
    		}else{
    			alert("Something went wrong")
    		}


    	})




    }



    

    useEffect(()=>{

    	if((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !=="" && confirmPassword !=="") && (password === confirmPassword) && (mobileNo.length === 11)){

    		setIsActive(true)

    	}else{
    		setIsActive(false)
    	}

    },[firstName, lastName, email, mobileNo, password, confirmPassword])

    console.log("token",user.token)
    console.log("access",user.access)
    console.log("email", user.email)

    return (
           (user.id !== null) ?
               <Navigate to="/products" />
               :
               <div className="d-flex justify-content-center align-items-center vh-100 mt-5">
                   <Container>
                       <Row className="justify-content-center">
                           <Col md={6}>
                               <div className="rounded p-4 border">
                                   <h1 className="text-center mb-4">Register</h1>
                                   <Form onSubmit={(e) => registerUser(e)}>
                                       <Form.Group>
                                           <Form.Label>First Name:</Form.Label>
                                           <Form.Control
                                               type="text"
                                               placeholder="Enter First Name"
                                               required
                                               value={firstName}
                                               onChange={e => { setFirstName(e.target.value) }}
                                           />
                                       </Form.Group>

                                       <Form.Group>
                                           <Form.Label>Last Name:</Form.Label>
                                           <Form.Control
                                               type="text"
                                               placeholder="Enter Last Name"
                                               required
                                               value={lastName}
                                               onChange={e => { setLastName(e.target.value) }}
                                           />
                                       </Form.Group>

                                       <Form.Group>
                                           <Form.Label>Email:</Form.Label>
                                           <Form.Control
                                               type="email"
                                               placeholder="Enter Email"
                                               required
                                               value={email}
                                               onChange={e => { setEmail(e.target.value) }}
                                           />
                                       </Form.Group>

                                       <Form.Group>
                                           <Form.Label>Mobile No:</Form.Label>
                                           <Form.Control
                                               type="number"
                                               placeholder="Enter 11 Digit No."
                                               required
                                               value={mobileNo}
                                               onChange={e => { setMobileNo(e.target.value) }}
                                           />
                                       </Form.Group>

                                       <Form.Group>
                                           <Form.Label>Password:</Form.Label>
                                           <Form.Control
                                               type="password"
                                               placeholder="Enter Password"
                                               required
                                               value={password}
                                               onChange={e => { setPassword(e.target.value) }}
                                           />
                                       </Form.Group>

                                       <Form.Group>
                                           <Form.Label>Confirm Password:</Form.Label>
                                           <Form.Control
                                               type="password"
                                               placeholder="Confirm Password"
                                               required
                                               value={confirmPassword}
                                               onChange={e => { setConfirmPassword(e.target.value) }}
                                           />
                                       </Form.Group>

                                       {/*conditionally render submit button based on the isActive state*/}
                                       <Form.Group className="text-center mt-4">
                                           {isActive ?
                                               <Button variant="primary" type="submit" id="submitBtn" className="w-100">Submit</Button>
                                               :
                                               <Button variant="danger" type="submit" id="submitBtn" disabled className="w-100">Please enter your registration details</Button>
                                           }
                                       </Form.Group>
                                       <p className="text-center">Already have an account? <Link to="/login" style={{ color: 'blue' }}>Click here</Link> to log in.</p>
                                   </Form>
                               </div>
                           </Col>
                       </Row>
                   </Container>
               </div>
       )
}