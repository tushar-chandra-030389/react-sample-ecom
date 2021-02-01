import React, { Component, lazy, Suspense } from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  addCollectionAndDocuments,
  getIfHasShopCollections
} from './firebase/firebase.utils';
import * as userActions from './redux/user/user.actions';
import * as userSelectors from './redux/user/user.selectors';
import SHOP_DATA from './redux/shop/shop.data';
import Spinner from './components/spinner/spinner.component';
import Header from './components/header/header.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import './App.css';

const HomePage = lazy((() => import('./pages/homepage/homepage.component')));
const ShopPage = lazy((() => import('./pages/shop/shop.component')));
const SignInAndSignUp = lazy((() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component')));
const Checkout = lazy((() => import('./pages/checkout/checkout.component')));

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
    <ErrorBoundary>
      <Suspense
        fallback={<Spinner />}
      >
        <Switch>
          
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={Checkout} />
            <Route
              exact
              path='/signin'
              render={() => currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp />)} />
          
        </Switch>
      </Suspense>
    </ErrorBoundary>
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
