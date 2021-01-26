import React from 'react';
import { connect } from 'react-redux';
import * as cartActions from '../../redux/cart/cart.actions';
import './checkout-item.styles.scss';

const CheckoutItem = (props) => {
    const {
        item,
        clearItem,
        addItem,
        removeItem,
    } = props;
    const {
        name,
        quantity,
        price,
        imageUrl,
    } = item;

    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item'/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div
                    onClick={() => {removeItem(item)}}
                    className='arrow'
                >&#10094;</div>
                <span className='value'>{quantity}</span>
                <div
                    onClick={() => {addItem(item)}}
                    className='arrow'
                >&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <span
                className='remove-button'
                onClick={() => { clearItem(item) }}
            >&#10005;</span>
        </div>
    );
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clearItem(item) {
            dispatch(cartActions.clearItem(item));
        },
        addItem(item) {
            dispatch(cartActions.addItem(item));
        },
        removeItem(item) {
            dispatch(cartActions.removeItem(item));
        },
    };
};

export default connect(null, mapDispatchToProps)(CheckoutItem);