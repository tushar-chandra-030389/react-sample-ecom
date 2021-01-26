import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as cartSelectors from './../../redux/cart/cart.selectors';
import CheckoutItem from './../../components/checkout-item/checkout-item.componennt';
import StripeButton from './../../components/stripe-button/stripe-button.component';
import './checkout.styles.scss';

const Checkout = ({
    cartItems,
    cartTotal,
}) => {
    return (
        <div className='checkout-page'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map(cartItem => <CheckoutItem key={cartItem.id} item={cartItem} />)
            }

            <div className='total'>
                <span>Total: ${cartTotal}</span>
            </div>
            <div className='test-warning'>
                Please use the following CC details
                <br/>
                4242 4242 4242 4242 - 01/21 - 123
            </div>
            <StripeButton price={cartTotal} />
        </div>
    );
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
    cartTotal: cartSelectors.selectCartTotal,
    cartItems: cartSelectors.selectCartItems,
});

export default connect(mapStateToProps)(Checkout);