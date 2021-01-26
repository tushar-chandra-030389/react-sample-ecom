import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CustomButton from './../custom-button/custom-button.components';
import CartItem from './../cart-item/cart-item.component';
import * as cartSelectors from '../../redux/cart/cart.selectors';
import * as cartActions from './../../redux/cart/cart.actions';
import './cart-dropdown.styles.scss';

const CartDropdown = ({
    hidden,
    cartItems,
    history,
    dispatch,
    onToggle,
}) => {
    return (!hidden && (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {cartItems.length ?
                    cartItems.map((cartItem) => {
                        return <CartItem key={cartItem.id} item={cartItem} />
                    }) :
                    <span className='empty-message'>Cart empty</span>
                }
            </div>
            <CustomButton
                onClick={() => {
                    dispatch(cartActions.toggleCartHidden());
                    history.push('/checkout');
                }}
            >
                GO TO CHECKOUT
            </CustomButton>
        </div>
    ));
};

const mapStateToProps = (state, ownProps) => {
    return {
        cartItems: cartSelectors.selectCartItems(state),
    };
};

export default withRouter(connect(mapStateToProps)(CartDropdown));
