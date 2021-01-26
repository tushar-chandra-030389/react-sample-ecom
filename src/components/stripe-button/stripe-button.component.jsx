import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeButton = ({
    price
}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IDr5wBOAdkdRAhq9V73AMWvCouQE5lUXSjsp3U4cSIdOCzSDVEsIMs3px4hsN1wOT84FGUjcCAS0SKV4qCmlE4t00c3gr506d';

    const onToken = token => {
        console.log('Payment successful', token);
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='ecom'
            billingAddress
            shippingAddress
            description={`Your total is $${price}`}
            amount={priceForStripe}
            pannelLabel='Pay now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeButton;