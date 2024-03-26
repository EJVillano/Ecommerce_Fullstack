import {useContext, useState, useEffect } from 'react';
import {Row, Col} from 'react-bootstrap';
import UserContext from '../UserContext';
import { useNavigate,Navigate } from 'react-router-dom';
import ResetPassword from '../components/ResetPassword';
import UpdateProfile from '../components/UpdateProfile';


export default function Profile(){

    const {user} = useContext(UserContext);

    const [ details, setDetails ] = useState({})

    useEffect(()=>{

        fetch(`${process.env.REACT_APP_API_URL}/users/`,{
            headers:{
                Authorization: `Bearer ${ localStorage.getItem('token')}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            console.log(data.user)
            console.log(data.user._id)

            if(typeof data.user._id !== "undefined"){

                setDetails(data.user);
            }

        })
    },[])



    return (
        (details.id === null) ?
        <Navigate to="/products" />
        :
        <>
            <Row>
                <Col className="p-5 bg-primary text-white">
                    <h1 className="my-5 ">Profile</h1>
                    <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
                    <hr />
                    <h4>Contacts</h4>
                    <ul>
                        <li>Email: {`${details.email}`}</li>
                        <li>Mobile No: {`${details.mobileNo}`}</li>
                    </ul>
                </Col>
            </Row>
            <Row className='pt-4 mt-4'>
                <Col>
                    <ResetPassword/>
                    <UpdateProfile/>
                </Col>
                
                    
                
            </Row>
        </>

    )

}