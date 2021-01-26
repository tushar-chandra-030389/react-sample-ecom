import React from 'react';
import Directory from './../../components/directory/directory.component';
import { HomePageContainer } from './homepage.styles';
import './homepage.styles.scss';

const HomePage = () => (
    <HomePageContainer>
        <h1>Welcome to my Homepage</h1>
        <Directory />
    </HomePageContainer>
);

export default HomePage;