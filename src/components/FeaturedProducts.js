import React, { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import PreviewProduct from './PreviewProduct';

export default function FeaturedProducts() {
    const [newArrivals, setNewArrivals] = useState([]);
    const [specials, setSpecials] = useState([]);

    useEffect(() => {
        // Fetching products
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`)
            .then(res => res.json())
            .then(data => {
                const newProducts = data.products.filter(product => !product.name.includes('Titan Essentials'));
                const specialsProducts = data.products.filter(product => product.name.includes('Titan Essentials'));

                const newFeatured = generateFeaturedProducts(newProducts);
                const specialsFeatured = generateFeaturedProducts(specialsProducts);

                setNewArrivals(newFeatured);
                setSpecials(specialsFeatured);
            });
    }, []);

    // Function to generate random featured products
    const generateFeaturedProducts = (products) => {
        const numbers = [];
        const featured = [];
        const maxItems = Math.min(products.length, 4);

        const generateRandomNums = () => {
            let randomNum = Math.floor(Math.random() * products.length);
            if (numbers.indexOf(randomNum) === -1) {
                numbers.push(randomNum);
            } else {
                generateRandomNums();
            }
        };

        for (let i = 0; i < maxItems; i++) {
            generateRandomNums();
            featured.push(
                <PreviewProduct key={products[numbers[i]]._id} data={products[numbers[i]]} breakPoint={3} />
            );
        }
        return featured;
    };

    return (
        <>
            <h2 className="text-center m-5">SHOES</h2>
            <CardGroup className="justify-content-center">
                {newArrivals}
            </CardGroup>
            <h2 className="text-center m-5">SHIRTS</h2>
            <CardGroup className="justify-content-center">
                {specials}
            </CardGroup>
        </>
    );
}
