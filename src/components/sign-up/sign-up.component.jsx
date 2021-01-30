import React from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.components';
import * as userActions from './../../redux/user/user.actions';

import './sign-up.styles.scss';

const SignUp = ({
    onSignUp,
}) => {
    const [
        signUpData,
        setSignUpData
    ] = React.useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const {
            displayName,
            email,
            password,
            confirmPassword,
        } = signUpData;

        if (password !== confirmPassword) {
            return;
        }

        onSignUp({
            displayName,
            email,
            password,
        });

        setSignUpData({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
    };

    const handleChange = (e) => {
        const {
            value,
            name,
        } = e.target;

        setSignUpData({
            ...signUpData,
            [name]: value,
        });
    };

    return (
        <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    required
                    value={signUpData.displayName}
                    label='Display Name'
                    name='displayName'
                    handleChange={handleChange}
                />
                <FormInput
                    type='text'
                    required
                    value={signUpData.email}
                    label='Email'
                    name='email'
                    handleChange={handleChange}
                />
                <FormInput
                    type='password'
                    required
                    value={signUpData.password}
                    label='Password'
                    name='password'
                    handleChange={handleChange}
                />
                <FormInput
                    type='password'
                    required
                    value={signUpData.confirmPassword}
                    label='Confirm password'
                    name='confirmPassword'
                    handleChange={handleChange}
                />

                <CustomButton type='submit'>
                    SIGN UP
                </CustomButton>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignUp(input) {
            dispatch(userActions.signUpStart(input));
        }
    };
};

export default connect(null, mapDispatchToProps)(SignUp);
