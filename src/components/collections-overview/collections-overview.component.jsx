import React from 'react';
import { connect } from 'react-redux';
import CollectionPreview from './../collection-preview/collection-preview.component';
import * as shopSelectors from '../../redux/shop/shop.selectors';

import './collections-overview.styles.scss';

const CollectionsOverview = ({
    collections
}) => {
    if (!collections) {
        return null;
    }

    return (
        <div className='collections-overview'>
            {collections.map(({ id, ...otherProps }) => {
                return <CollectionPreview key={id} {...otherProps} />
            })}
        </div>
    );
};

export default CollectionsOverview;