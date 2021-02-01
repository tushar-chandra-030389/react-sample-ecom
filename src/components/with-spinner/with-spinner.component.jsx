import React from 'react';

import Spinner from './../spinner/spinner.component';

const WithSpinner = (WrappedComponent) => {
    const Spinner = ({ isLoading, ...othehrProps }) => {
        return isLoading ? (
            <Spinner />
        ) : (
            <WrappedComponent {...othehrProps} />
        );
    };

    return Spinner;
};

export default WithSpinner;
