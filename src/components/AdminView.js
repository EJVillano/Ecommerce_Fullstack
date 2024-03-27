import { useEffect, useState, useContext } from 'react';
import AdminPanel from '../components/AdminPanel';
import UserContext from '../UserContext';

export default function AdminProducts(){

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
					<AdminPanel productsData={products} fetchData={fetchData} />
			</>
		
		
		)
}