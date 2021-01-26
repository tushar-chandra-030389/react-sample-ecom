import React from 'react';
import FormInput from './../form-input/form-input.component';
import CustomButton from './../custom-button/custom-button.components';
import { auth, signInWithGoogle } from './../../firebase/firebase.utils';
import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignInWithGoogle = this.handleSignInWithGoogle.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' });
        } catch (e) {
            console.log('Sign in failed', e)
        }
    }

    handleChange(e) {
        const {
            value,
            name,
        } = e.target;

        this.setState({
            [name]: value,
        });
    }

    handleSignInWithGoogle() {
        signInWithGoogle();
    }

    render() {
        const { email, password } = this.state;

        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        value={email}
                        required
                        type='email'
                        handleChange={this.handleChange}
                        label='Email'
                    />
                    <FormInput
                        name='password'
                        type='password'
                        required
                        value={password}
                        handleChange={this.handleChange}
                        label='Password'
                    />
                    <div className='buttons'>
                        <CustomButton type='submit'>
                            Sign in
                        </CustomButton>
                        <CustomButton type='button' onClick={this.handleSignInWithGoogle} isGoogleSignIn>
                            Sign in with google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;