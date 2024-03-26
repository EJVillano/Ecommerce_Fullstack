import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import SearchByPrice from './SearchByPrice';


export default function UserView({productsData}) {

    console.log(productsData)


    const [products, setProducts] = useState([])

    useEffect(() => {
        const productsArr = productsData.map(product => {

          
            if(product.isActive === true) {
                return (
                    <ProductCard productProp={product} key={product._id}/>
                    )
            } else {
                return null;
            }
        })

        
        setProducts(productsArr)

    }, [productsData])

    return(
        <>
        <SearchByPrice/>
            <>
                { products }
            </>
        </>
        )
}