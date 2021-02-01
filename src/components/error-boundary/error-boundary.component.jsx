import React from 'react';

import * as StyledComponents from './error-boundary.styles';

class ErrorBoundary extends React.Component {
    constructor() {
        super();

        this.state = {
            hasErrored: false,
        };
    }

    static getDerivedStateFromError(error) {
        // process the error

        return {
            hasErrored: true,
        };
    }

    componentDidCatch(error, info) {
        console.log('componentDidCatch', error, info);
    }

    render() {
        if (this.state.hasErrored) {
            return (
                <StyledComponents.ErrorImageOverlay>
                    <StyledComponents.ErrorImageContainer imageUrl='https://i.imgur.com/lKJiT77.png' />
                    <StyledComponents.ErrorImageText>Some error occurred</StyledComponents.ErrorImageText>
                </StyledComponents.ErrorImageOverlay>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;