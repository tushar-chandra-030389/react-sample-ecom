import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from './../../firebase/firebase.utils';
import CartIcon from './../cart-icon/cart-icon.component';
import CartDropdown from './../cart-dropdown/cart-dropdown.components';
import * as cartActions from './../../redux/cart/cart.actions';
import * as cartSelectors from './../../redux/cart/cart.selectors';
import * as userSelectors from './../../redux/user/user.selectors';
import './header.styles.scss';

const Header = ({
    currentUser,
    cartHidden,
    toggleCartHidden,
}) => {
    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <div className='options'>
                <Link className='option' to='/shop' >
                    SHOP
                </Link>
                <Link className='option' to='/contact'>
                    CONTACT
                </Link>
                {currentUser ? (
                        <div className='option' onClick={() => auth.signOut()}>
                            SIGN OUT
                        </div>
                    ) : (
                        <Link className='option' to='/signin'>
                            SIGN IN
                        </Link>
                    )
                }
                <CartIcon
                    onToggle={toggleCartHidden}
                />
            </div>
            <CartDropdown
                hidden={cartHidden}
            />
        </div>
    );
};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
    currentUser: userSelectors.selectCurrentUser,
    cartHidden: cartSelectors.selectCartHidden,
});

const mapDispatchToProps = (dispatch) => {
    return {
        toggleCartHidden() {
            dispatch(cartActions.toggleCartHidden())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
