import React, { Component } from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Checkout from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import {
  addCollectionAndDocuments,
  getIfHasShopCollections
} from './firebase/firebase.utils';
import * as userActions from './redux/user/user.actions';
import * as userSelectors from './redux/user/user.selectors';
import SHOP_DATA from './redux/shop/shop.data';
import './App.css';

const App = ({
  currentUser,
  checkUser
}) => {
  React.useEffect(() => {
    checkUser();

    getIfHasShopCollections().then(hasShopCollectionInFireStore => {
      if (!hasShopCollectionInFireStore) {
        addCollectionAndDocuments('collections', SHOP_DATA.map(({ title, items }) => ({ title, items })));
      }
    });
  }, [checkUser, getIfHasShopCollections]);

  return <div className='App'>
    <Header />
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={ShopPage} />
      <Route exact path='/checkout' component={Checkout} />
      <Route
        exact
        path='/signin'
        render={() => currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp />)} />
    </Switch>
  </div>;

};

const mapStateToProps = (state, ownProps) => ({
  currentUser: userSelectors.selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    checkUser: () =>  dispatch(userActions.checkUserSession()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
