import { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import PreviewProduct from './PreviewProduct';

export default function FeaturedProducts(){

	const [preview, setPreview] = useState([]);

	useEffect(()=>{

		fetch(`${process.env.REACT_APP_API_URL}/products/`)
		.then(res=>res.json())
		.then(data=>{
			console.log(data)

			console.log(data.products)


			const numbers = [];
			const featured = [];



			const generateRandomNums = () =>{

				let randomNum = Math.floor(Math.random() * data.products.length)

				if(numbers.indexOf(randomNum) === -1){
					numbers.push(randomNum)
				}else{
					generateRandomNums()
				}
			}


			for(let i = 0; i<5; i++){
				generateRandomNums()

				featured.push(	

					<PreviewProduct key={data.products[numbers[i]]._id} data={data.products[numbers[i]]}  breakPoint={2}/>
				)

			}



			setPreview(featured)



		})


	},[])


	return(

			<>
				<h2 className="text-center">Featured Products</h2>
				<CardGroup className="justify-content-center">

					{preview}

				</CardGroup>
			</>


		)

}