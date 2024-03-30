import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function productCard({ productProp }) {
    const { _id, name, description, price } = productProp;

    return (
        <Card className="mt-3">
            <Card.Img variant="top" src="./images/rt.jpg" alt={name} style={{ width: '400px', height: '400px', objectFit: 'cover' }} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>PhP{price}</Card.Text>
        

                <Link className="btn btn-dark" to={`/products/${_id}`}>Details</Link>

            </Card.Body>
        </Card>
    );
}