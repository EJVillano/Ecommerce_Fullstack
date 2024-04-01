
import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';


import UserContext from '../UserContext';

console.log(process.env.REACT_APP_API_URL);

export default function Login(props) {

    
    const { user, setUser } = useContext(UserContext);



   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [isActive, setIsActive] = useState(true);


    function authenticate(e) {

        console.log(process.env.REACT_APP_API_URL);

        
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/users/login`,{

        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

            email: email,
            password: password

        })
    })
    .then(res => res.json())
    .then(data => {

            console.log(data);

            


            
            if(typeof data.access !== "undefined"){

               
                localStorage.setItem('token', data.access);
                
                
                retrieveUserDetails(data.access);


                

                Swal.fire({
                    title:"Login Successful!",
                    icon: "success",
                    text: "Welcome Ecommerce"
                })


                
                setEmail('');
                setPassword('');
            
            } else if (data.error === "No Email Found") {

                

                Swal.fire({
                    title:`${email} not found`,
                    icon: "error",
                    text: "Check your login credentials and try again."
                })


            } else {

                
                Swal.fire({
                    title:`${email} does not exist`,
                    icon: "error",
                    text: "Check your login credentials and try again."
                })
            }
        })

    }


    const retrieveUserDetails = (token) =>{

       

        fetch(`${process.env.REACT_APP_API_URL}/users/details`,{
            headers:{
                Authorization: `Bearer ${ token }`
            }
        })
        .then(res=>res.json())
        .then(data=>{

            console.log(data);
            
            setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
            })
        })
    }

    useEffect(() => {
        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }
    }, [email, password]);

    console.log(user);

    return (
            (user.id !== null) ?
                <Navigate to="/products" />
                :
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <Container className="mt-5">
                        <Row className="justify-content-center">
                            <Col md={6}>
                                <div className="rounded p-4 border">
                                    <h1 className="text-center mb-4">Login</h1>
                                    <Form onSubmit={(e) => authenticate(e)}>
                                        <Form.Group>
                                            <Form.Label>Email address:</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Password:</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group className="text-center mt-4">
                                            {isActive ?
                                               <Button variant="primary" type="submit" id="submitBtn" className="w-100">Submit</Button>
                                               :
                                               <Button variant="danger" type="submit" id="submitBtn" disabled className="w-100">Submit</Button>
                                            }
                                        </Form.Group>
                                        <p className="text-center">Don't have an account yet? <Link to="/register" style={{ color: 'blue' }}>Click here</Link> to register.</p>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
        )
    }