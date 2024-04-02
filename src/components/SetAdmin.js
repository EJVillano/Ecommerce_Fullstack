import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Adminify() {
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState('');

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleUserIdChange = (e) => setUserId(e.target.value);

    const handleSetAsAdmin = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}/set-as-admin`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to set user as admin');
            }
            return response.json();
        })
        .then(data => {
            // Handle success
            console.log('User set as admin:', data);
            setShowModal(false);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'User set as admin successfully.',
            });
        })
        .catch(error => {
            // Handle error
            console.error('Error setting user as admin:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to set user as admin.',
            });
        });
    };

    return (
        <>
            <Button variant="primary" onClick={handleShowModal}>
                Set User as Admin
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Set User as Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formUserId">
                        <Form.Label>User ID:</Form.Label>
                        <Form.Control type="text" placeholder="Enter User ID" value={userId} onChange={handleUserIdChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSetAsAdmin} disabled={!userId}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
