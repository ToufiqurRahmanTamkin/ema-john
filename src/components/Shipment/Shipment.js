import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [shippingData, setShippingData] = useState(null);

    const onSubmit = data => {
        setShippingData(data)
    };

    const handlePaymentSuccess = paymentId => {
        const savedCart = getDatabaseCart();
        const orderDetails = { 
            ...loggedInUser, 
            products: savedCart, 
            shipment: shippingData,
            paymentId,
            orderTime: new Date() 
        };

        fetch('http://localhost:5000/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        }).then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder();
                    alert('order placed successfully');
                }
            })
    }
    console.log(watch("example")); // watch input value by passing the name of it
    return (
        <div className="shippingMainDiv">
            <div style={{display: shippingData ? 'none': 'block'}} className="shippingAddressDiv">
                < form className="ship-form" onSubmit={handleSubmit(onSubmit)} >
                    < input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="enter your name" />
                    {errors.name && <span className="error">Name is required</span>}

                    < input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="enter your email" />
                    {errors.name && <span className="error">Email is required</span>}

                    < input name="address" ref={register({ required: true })} placeholder="enter your address" />
                    {errors.name && <span className="error">Address is required</span>}

                    < input name="phone" ref={register({ required: true })} placeholder="enter your phone" />
                    {errors.name && <span className="error">Phone Number is required</span>}

                    <input type="submit" />
                </form >
            </div>
            <div style={{display: shippingData ? 'block': 'none'}} className="paymentDiv">
                <h2 className="paymentTitle">Payment</h2>
                <ProcessPayment handlePayment={handlePaymentSuccess} />
            </div>
        </div>
    );
};

export default Shipment;