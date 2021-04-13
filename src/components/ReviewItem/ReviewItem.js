import React from 'react';
import { Button } from '@material-ui/core';
import './ReviewItem.css'

const ReviewItem = (props) => {
    console.log(props);
    const { name, quantity, key, price, img } = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px',
    };
    return (
        <div style={reviewItemStyle} className="d-flex review-item review-style">
            <div className="image-div p-2">
                <img className="review-image-class" src={img} alt="" />
            </div>
            <div className="content-div">
                <h4 className="product-name">{name}</h4>
                <p>Quantity: {quantity}</p>
                <br />
                <p className='price-tag-class'> <small> <strong>Price: ${price}</strong> </small> </p>
                <Button onClick={() => props.removeProduct(key)} variant="contained" color="secondary"> Remove </Button>
            </div>

        </div>
    );
};

export default ReviewItem;