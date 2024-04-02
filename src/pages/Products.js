import { useEffect, useState, useContext } from 'react';

import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import UserContext from '../UserContext';
import ScrollBehavior from '../components/ScrollBehavior';

export default function Products(){

	const { user } = useContext(UserContext);
	const [products, setProducts] = useState([])

	useEffect(()=>{
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`,)
		.then(res=>res.json())
		.then(data=>{
			console.log(data)
			const productData = data.products
			setProducts(productData)
	
		})
	},[]);


	const fetchData = () =>{

		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`)
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

                        <AdminView/>
                        :
						<>
							<h1 className="my-5 pt-5 text-center">Products</h1>
                        	<UserView productsData={products} />
							<ScrollBehavior/>
						</>
                }
            </>
        )
}