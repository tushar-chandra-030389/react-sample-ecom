import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from './../../firebase/firebase.utils';
import CartIcon from './../cart-icon/cart-icon.component';
import CartDropdown from './../cart-dropdown/cart-dropdown.components';
import * as cartActions from './../../redux/cart/cart.actions';
import * as userActions from './../../redux/user/user.actions';
import * as cartSelectors from './../../redux/cart/cart.selectors';
import * as userSelectors from './../../redux/user/user.selectors';
import * as StyledComponents from './header.styles';
import './header.styles.scss';

const Header = ({
    currentUser,
    cartHidden,
    toggleCartHidden,
    signOut,
}) => {
    return (
        <div className='header'>
            <StyledComponents.LogoContainer to='/'>
                <Logo className='logo' />
            </StyledComponents.LogoContainer>
            <StyledComponents.OptionsContainer>
                <StyledComponents.OptionLink to='/shop' >
                    SHOP
                </StyledComponents.OptionLink>
                <StyledComponents.OptionLink className='option' to='/contact'>
                    CONTACT
                </StyledComponents.OptionLink>
                {currentUser ? (
                    <StyledComponents.OptionDiv onClick={signOut}>
                            SIGN OUT
                        </StyledComponents.OptionDiv>
                    ) : (
                        <StyledComponents.OptionLink to='/signin'>
                            SIGN IN
                        </StyledComponents.OptionLink>
                    )
                }
                <CartIcon
                    onToggle={toggleCartHidden}
                />
            </StyledComponents.OptionsContainer>
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
        },
        signOut() {
            dispatch(userActions.signOutStart());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
