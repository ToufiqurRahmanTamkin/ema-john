import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './SplitCardForm';


const stripePromise = loadStripe("pk_test_51Ie5ewEzBKc2BTGOC1FOTmFA5MVomfyXO0Jge9CVCci6NmhU2gIftg5DiaS4A5bYbSwxUur9aIEeFu60sDKigPKH00x9bCU1S3");
const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment} />
            {/* <SplitCardForm handlePayment = {handlePayment}/> */}
        </Elements>
    );
};

export default ProcessPayment;