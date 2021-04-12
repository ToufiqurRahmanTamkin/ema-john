import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import './ProductDetails.css'

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        fetch('http://localhost:5000/product/'+productKey)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setProduct(data)
        });

    },[productKey])

    return (
        <div className="productDetailsMainClass">
            <h1 className="productDetailsClass">Your Product Details</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;