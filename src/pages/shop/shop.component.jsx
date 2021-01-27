import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CollectionsOverview from './../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';  
import { firestore, convertCollectionsSnapshotToMap } from './../../firebase/firebase.utils';
import * as shopActions from './../../redux/shop/shop.actions';

class Shop extends React.Component {
    unsubsribeFromSnapshot = null;
    
    componentDidMount() {
        const { setShopData } = this.props;
        const collectionRef = firestore.collection('collections');

        this.unsubsribeFromSnapshot = collectionRef.onSnapshot(snapshot => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            setShopData(collectionMap);
        });
    }

    componentWillUnmount() {
        this.unsubsribeFromSnapshot();
    }

    render() {
        const { match } = this.props;

        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
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
