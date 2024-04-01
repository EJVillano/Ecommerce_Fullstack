import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function productCard({ productProp }) {
    const { _id, name, description, price } = productProp;

    const imageSrc = `./images/${name}.jpg`;

    return (
        <Card className="mt-3 col-12 col-md-4 col-lg-3 m-2">
            <Card.Img variant="top" src={imageSrc} alt={name} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Footer className='text-center'>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>PhP{price}</Card.Text>
                </Card.Footer>
        

                <Link className="btn btn-dark" to={`/products/${_id}`}>Details</Link>

            </Card.Body>
        </Card>
    );
}