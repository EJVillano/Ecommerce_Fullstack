import { useEffect, useState, useContext } from 'react';

import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import UserContext from '../UserContext';

export default function Products(){

	const { user } = useContext(UserContext);
	const [products, setProducts] = useState([])

	useEffect(()=>{
		fetch(`${process.env.REACT_APP_API_URL}/products/all`,{
            headers:{
                Authorization: `Bearer ${ localStorage.getItem('token')}`
            }
        })
		.then(res=>res.json())
		.then(data=>{
			console.log(data)
			const productData = data.products
			setProducts(productData)
	
		})
	},[]);


	const fetchData = () =>{

		fetch(`${process.env.REACT_APP_API_URL}/products/all`,{
            headers:{
                Authorization: `Bearer ${ localStorage.getItem('token')}`
            }
        })
		.then(res => res.json())
		.then(data =>{
			console.log(data);
			setProducts(data.products);
		})
	}

	useEffect(()=>{

		fetchData();

	},[])




		return(
            <>
                {
                    (user.isAdmin === true) ?

                        <AdminView productsData={products} fetchData={fetchData} />
                        :
                        <UserView productsData={products} />
                }
            </>
        )
}