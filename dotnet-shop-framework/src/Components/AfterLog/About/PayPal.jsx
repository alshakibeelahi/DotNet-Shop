import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = () => {
  const paypalOptions = {
    clientId: 'AVmEAzGogaeT0pVHi-N0OviOUVE4N1-7cwVcZBI_QA9SLNBTlXg--o2gf9a1cCc8nly90Q4n4VNa4N3D',
    currency: 'USD',
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: '10.00', // Enter the amount to be paid
        },
      }],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function(details) {
      console.log(data,details);
      alert('Transaction completed by ' + details.payer.name.given_name);
    });
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
