import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';
import SetAdmin from '../components/SetAdmin';


export default function AdminPanel({ productsData, fetchData }) {


    const [products, setProducts] = useState([])



    useEffect(() => {
        const productsArr = productsData.map(product => {
            return (
                <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>

                    <td><EditProduct product={product._id} fetchData={fetchData}/></td> 

                    <td><ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData}/></td>    
                </tr>
                )
        })

        setProducts(productsArr)

    }, [productsData])


    return(
        <>
                
            <div className="text-center mb-3">
                <h1 className="mt-5 pt-5">Admin Dashboard</h1>
                <SetAdmin />
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products}
                </tbody>
            </Table>    
        </>

        )
}