import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import * as cartSelectors from '../../redux/cart/cart.selectors';
import './cart-icon.styles.scss';

const CartIcon = ({
    totalCount,
    onToggle,
}) => {
    return (
        <div
            onClick={onToggle}
            className='cart-icon'
        >
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{totalCount}</span>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        totalCount: cartSelectors.selctCartItemsCount(state),
    };
};

export default connect(mapStateToProps)(CartIcon);
