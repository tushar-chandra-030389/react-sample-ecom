import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CollectionsOverview from './../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';  
import { firestore, convertCollectionsSnapshotToMap } from './../../firebase/firebase.utils';
import * as shopActions from './../../redux/shop/shop.actions';
import WithSpinner from './../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class Shop extends React.Component {
    state = {
        isLoading: true,
    };

    unsubsribeFromSnapshot = null;
    
    componentDidMount() {
        const { setShopData } = this.props;
        const collectionRef = firestore.collection('collections');

        this.unsubsribeFromSnapshot = collectionRef.onSnapshot(snapshot => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            setShopData(collectionMap);
            this.setState({ isLoading: false });
        });
    }

    componentWillUnmount() {
        this.unsubsribeFromSnapshot();
    }

    render() {
        const { match } = this.props;
        const { isLoading } = this.state;

        return (
            <div className='shop-page'>
                <Route
                    exact
                    path={`${match.path}`}
                    render={(props) => {
                        return (<CollectionsOverviewWithSpinner isLoading={isLoading} {...props}/>);
                    }}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => {
                        return (<CollectionPageWithSpinner isLoading={isLoading} {...props} />);
                    }}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setShopData(shopData) {
            dispatch(shopActions.setShopData(shopData));
        },
    };
}

export default connect(null, mapDispatchToProps)(Shop);
