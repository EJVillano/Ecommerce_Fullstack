import { useState, useEffect } from 'react';
import { Table, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';
import SetAdmin from './SetAdmin';

export default function AdminPanel({ productsData, fetchData }) {
    const [products, setProducts] = useState([]);

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
               );
           });

           setProducts(productsArr);
       }, [productsData, fetchData]);

       return (
         <>
           <h1 className="text-center my-5 pt-5">Admin Dashboard</h1>
           <div className="text-center mb-3 row d-flex justify-content-center">
             <Button as={Link} to="/addProduct" variant="primary" >Add New Product</Button>{' '}
             <Button as={Link} to="/order" variant="success">Show User Orders</Button>
             <SetAdmin className="m-3"/>
           </div>
           <Table striped bordered hover responsive>
             <thead>
               <tr className="text-center bg-dark text-white">
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
       );
   }