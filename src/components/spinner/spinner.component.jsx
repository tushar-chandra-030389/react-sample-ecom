import React from 'react';

import * as Styles from './spinner.styles';

const Spinner = () => {
    return (
        <Styles.SpinnerOverlay>
            <Styles.SpinnerContainer />
        </Styles.SpinnerOverlay>
    );
}; 

export default Spinner;