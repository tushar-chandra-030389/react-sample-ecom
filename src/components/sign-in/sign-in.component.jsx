import React,  { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from './../form-input/form-input.component';
import CustomButton from './../custom-button/custom-button.components';
import { auth } from './../../firebase/firebase.utils';
import * as userActions from './../../redux/user/user.actions';
import './sign-in.styles.scss';

const SignIn = ({
    onGoogleSignIn,
    onEmailSignIn,
}) => {
    console.log('Render')

    React.useEffect(() => {
        console.log('ComponentDidMount -> effect');

        return () => {
            console.log('ComponentWillUnMount -> effect');
        };
    }, []);

    React.useEffect(() => {
        console.log('ComponentDidUpdate -> effect');
    });

    // React.useEffect(() => {
    //     console.log('ComponentWillReceiveProps -> effect');
    // }, [props.x]);

    const [
        credentials,
        setCredentials,
    ] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = credentials;

        try {
            onEmailSignIn(email, password);
            setCredentials({ email: '', password: '' });
        } catch (e) {
            console.log('Sign in failed', e)
        }
    };

    const handleChange = (e) => {
        const {
            value,
            name,
        } = e.target;

        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name='email'
                    value={credentials.email}
                    required
                    type='email'
                    handleChange={handleChange}
                    label='Email'
                />
                <FormInput
                    name='password'
                    type='password'
                    required
                    value={credentials.password}
                    handleChange={handleChange}
                    label='Password'
                />
                <div className='buttons'>
                    <CustomButton type='submit'>
                        Sign in
                        </CustomButton>
                    <CustomButton type='button' onClick={onGoogleSignIn} isGoogleSignIn>
                        Sign in with google
                        </CustomButton>
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGoogleSignIn() {
            dispatch(userActions.googleSignInStart());
        },
        onEmailSignIn(email, password) {
            dispatch(userActions.emailSignInStart(email, password));
        },
    };
};

export default connect(null, mapDispatchToProps)(SignIn);