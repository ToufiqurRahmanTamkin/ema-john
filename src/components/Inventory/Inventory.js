import React from 'react';
import './Inventory.css'
import { Button } from '@material-ui/core';
import { Table } from 'react-bootstrap';

const Inventory = () => {

    const handleAddProduct = () => {
        const product = {};
        fetch('http://localhost:5000/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
    }
    return (
        // <button onClick={handleAddProduct}>Add Product</button> 
        <form className="manageProduct mt-5">
            {/* <form action="">
                <p><span>name</span><input type="text" /></p>
                <p><span>Price</span><input type="text" /></p>
                <p><span>Quantity</span><input type="text" /></p>
                <p><span>Product Image</span><input type="file" /></p>

                <Button variant="contained" color="primary" onClick={handleAddProduct}>Add New Product</Button>
            </form> */}
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" placeholder="Product Name" /></td>
                        <td><input type="text" placeholder="Product Price" /></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td><input type="text" placeholder="Product Quantity" /></td>
                        <td><input type="file" placeholder="Product Image" /></td>
                    </tr>
                </tbody>
            </Table>
            {/* <Button variant="contained" color="primary" onClick={handleAddProduct}>Add Product</Button> */}
            <Button variant="contained" color="secondary" onClick={handleAddProduct}>Add Product</Button>
        </form>
    );
};

export default Inventory;