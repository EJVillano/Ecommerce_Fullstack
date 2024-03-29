import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';



export default function EditProduct({product, fetchData}){

	const [productId, setProductId] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [showEdit, setShowEdit] = useState(false);



	const openEdit = (productId) =>{

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res=>res.json())
		.then(data=>{

			console.log(data);
			console.log(data.product)
			console.log(data.product._id);
			console.log(data.product.name)



			setProductId(data.product._id);
			setName(data.product.name);
			setDescription(data.product.description);
			setPrice(data.product.price);
		})

		setShowEdit(true)

	}

	const closeEdit = () =>{

		setShowEdit(false);
		setName('');
		setDescription('');
		setPrice('');

	}


	const editProduct = (e, productId) =>{

		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/products/${ productId }/update`, {
	        method: 'PATCH',
	        headers: {
	            'Content-Type': 'application/json',
	            Authorization: `Bearer ${localStorage.getItem('token')}`
	        },
	        body: JSON.stringify({
	            name: name,
	            description: description,
	            price: price
	        })
	    })
	    .then(res => res.json())
	    .then(data => {
	        console.log(data)

	        if(data.message === "Product updated successfully") {
	            Swal.fire({
	                title: 'Success!',
	                icon: 'success',
	                text: 'Product Successfully Updated'
	            })
	            closeEdit();
	            fetchData();
	            
	        } else {
	            Swal.fire({
	                title: 'Error!',
	                icon: 'error',
	                text: 'Please try again'
	            })
	            closeEdit();
	            fetchData();
	            
	        }
	    })
	}



	return(

		<>
			<Button variant = "primary" size="sm" onClick={()=>openEdit(product)}>Edit</Button>


			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => editProduct(e, productId)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Product</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group controlId="productName">
							<Form.Label>Name</Form.Label>
							<Form.Control
							type="text"
							value={name}
							onChange={e=>setName(e.target.value)}
							required/>
						</Form.Group>
						<Form.Group controlId="productDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control
							type="text"
							value={description}
							onChange={e=>setDescription(e.target.value)}
							required/>
						</Form.Group>
						<Form.Group controlId="productPrice">
							<Form.Label>Price</Form.Label>
							<Form.Control
							type="text" 
							value={price}
							onChange={e=>setPrice(e.target.value)}
							required/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
		)

}