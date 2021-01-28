import { connect } from 'react-redux';
import { compose } from 'redux';
import * as shopSelectors from './../../redux/shop/shop.selectors';
import WithSpinner from './../../components/with-spinner/with-spinner.component';
import CollectionOverview from './collections-overview.component';

const mapStateToProps = (state, ownProps) => ({
    collections: shopSelectors.selectShopCollectionsForOverview(state),
    isLoading: shopSelectors.selectShopDataFetching(state),
});

const composedHOC = compose(
    connect(mapStateToProps),
    WithSpinner
);

export default composedHOC(CollectionOverview);