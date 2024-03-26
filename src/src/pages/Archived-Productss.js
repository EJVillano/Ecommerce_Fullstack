import {useEffect, useState} from 'react';
// import productsData from '../data/productsData.js';
import ProductCard from '../components/ProductCard';


export default function Products(){

	const [products, setProducts] = useState([])

	useEffect(()=>{

		fetch(`${process.env.REACT_APP_API_URL}/products/`)
		.then(res=>res.json())
		.then(data=>{
			console.log(data);
			console.log(typeof data)
			console.log(data.products)
			setProducts(data.products.map(product=>{
					return(
						<ProductCard key={product._id} productProp={product}/>
					)
				}));
		});
	},[]);




		return (
			<>
				<h1>Products</h1>
				{products}
			</>
		)
}