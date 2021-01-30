import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CollectionsOverview from './../../components/collections-overview/collections-overview.container';
import CollectionPage from '../collection/collection.container'; 
import * as shopActions from './../../redux/shop/shop.actions';
import * as shopSelectors from './../../redux/shop/shop.selectors';

const Shop = ({
    match,
    isFetching,
    startShopDataFetch,
}) => {
    React.useEffect(() => {
        startShopDataFetch();
    }, [startShopDataFetch]);

    return (
        <div className='shop-page'>
            <Route
                exact
                path={`${match.path}`}
                // render={(props) => {
                //     return (<CollectionsOverview isLoading={isFetching} {...props}/>);
                // }}
                component={CollectionsOverview}
            />
            <Route
                path={`${match.path}/:collectionId`}
                component={CollectionPage}
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isFetching: shopSelectors.selectShopDataFetching(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startShopDataFetch() {
            dispatch(shopActions.fetchingShopDataStart());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
