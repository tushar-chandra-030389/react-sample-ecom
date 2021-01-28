import { connect } from 'react-redux';
import { compose } from 'redux';
import * as shopSelectors from './../../redux/shop/shop.selectors';
import WithSpinner from './../../components/with-spinner/with-spinner.component';
import Collection from './collection.component';

const mapStateToProps = (state, ownProps) => {
    const {
        match: {
            params: {
                collectionId,
            },
        },
    } = ownProps;

    const selectShopCollection = shopSelectors.createSelectShopCollection();
    
    return(state) => ({
        collection: selectShopCollection(state, collectionId),
        isLoading: shopSelectors.selectShopDataFetching(state),
    });
};

const composedHOC = compose(
    connect(mapStateToProps),
    WithSpinner, // If we move this above, HOC WithSpinner won't get isLoading PROP
);

export default composedHOC(Collection);