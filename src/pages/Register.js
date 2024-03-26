import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';


export default function Register(){

	const {user} = useContext(UserContext);

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

    	fetch(`${process.env.REACT_APP_API_URL}/users/`,{

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

    			alert("Registration successful!")

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

		(user.id !== null)?
		<Navigate to="/products" />
		:
		<Form onSubmit={(e)=>registerUser(e)}>
			<h1 className="my-5 text-center">Register</h1>
			<Form.Group>
				<Form.Label>First Name:</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter First Name"
					required
					value={firstName}
					onChange={e=>{setFirstName(e.target.value)}}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Last Name:</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter Last Name"
					required
					value={lastName}
					onChange={e=>{setLastName(e.target.value)}}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Email:</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter Email"
					required
					value={email}
					onChange={e=>{setEmail(e.target.value)}}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Mobile No:</Form.Label>
				<Form.Control
					type="number"
					placeholder="Enter 11 Digit No."
					required
					value={mobileNo}
					onChange={e=>{setMobileNo(e.target.value)}}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Password:</Form.Label>
				<Form.Control
					type="password"
					placeholder="Enter Password"
					required
					value={password}
					onChange={e=>{setPassword(e.target.value)}}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Confirm Password:</Form.Label>
				<Form.Control
					type="password"
					placeholder="Confirm Password"
					required
					value={confirmPassword}
					onChange={e=>{setConfirmPassword(e.target.value)}}
				/>
			</Form.Group>

			
			{isActive ?
				<Button variant="primary" type="submit" id="submitBtn">Submit</Button>
				:
				<Button variant="danger" type="submit" id="submitBtn" disabled>Submit</Button>
			}
			

		</Form>
	)
}

