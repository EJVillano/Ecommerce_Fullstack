import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function productCard({ productProp }) {
    const { _id, name, description, price } = productProp;

    const imageSrc = `./images/${name}.jpg`;

    return (
        <Card className="mt-3 col-12 col-md-4 col-lg-3 m-2 p-0">
            <Card.Img variant="top" src={imageSrc} alt={name} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
            <Card.Footer className='text-center'>
                <div className='row justify-between-around'>
                    <div className='col-6 txt-sz-lg'>
                        <p className='m-0'>₱ {price}</p>
                    </div>
                    <div className='col-6'>
                        <Link className="btn btn-dark mt-2" to={`/products/${_id}`}>Details</Link>
                    </div>
                </div>
            </Card.Footer>
            
        </Card>
    );
}