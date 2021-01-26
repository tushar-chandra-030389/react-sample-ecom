import React from 'react';
import { connect } from 'react-redux';
import MenuItem from './../menu-item/menu-item.component';
import * as directorySelectors from './../../redux/directory/directory.selector';
import './directory.styles.scss';

const Directory = ({ sections }) => {
    const menuItems = sections.map(
        ({ title, id, imageUrl, size, linkUrl }) => (   // (id, ...menuItemProps)
            <MenuItem                                   // <MenuItem {...menuItemProps} />
                key={id}
                title={title}
                imageUrl={imageUrl}
                size={size}
                linkUrl={linkUrl}
            />
        )
    );

    return (
        <div className='directory-menu'>
            {menuItems}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    sections: directorySelectors.getDirectory(state),
});

export default connect(mapStateToProps)(Directory);
