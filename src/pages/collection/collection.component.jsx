import React from 'react';
import { connect } from 'react-redux';
import CollectionItem from '../../components/collection-item/collection-item.component';
import * as shopSelector from '../../redux/shop/shop.selectors';
import './collection.styles.scss';

const CollectionPage = ({ match, collection }) => {
    if (!collection) {
        return null;
    }

    const {
        title,
        items,
    } = collection;

    return (
        <div className='collection-page'>
            <h2 className='title'>{title.toUpperCase()} PAGE</h2>
            <div className='items'>
                {
                    items.map(item => <CollectionItem key={item.id} item={item} />)
                }
            </div>
        </div>
    );
};

export default CollectionPage;