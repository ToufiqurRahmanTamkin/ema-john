import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Product = (props) => {
    const { img, name, seller, price, stock, key } = props.product;
    return (
        <div className="product">
            <div> <img className="imageClass" src={img} alt="" /> </div>

            <div className="product-div">
                <h4 className="product-name">
                    <Link to={"/product/" + key}>{name}</Link> </h4>
                <br />
                <p> <small>by: {seller}</small> </p>
                <p className="priceClass">${price}</p>
                <p> <small>Only {stock} left in stock - Order Soon</small> </p>

                {
                    props.showAddToCart === true &&
                    <Button onClick={() => props.handleAddProduct(props.product)} variant="contained" color="primary"><FontAwesomeIcon icon={faShoppingCart}/> Add to Cart </Button>
                }
            </div>

        </div>
    );
};

export default Product;