import React from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.components';
import * as userActions from './../../redux/user/user.actions';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    async handleSubmit(e) {
        e.preventDefault();
        const {
            displayName,
            email,
            password,
            confirmPassword,
        } = this.state;

        if (password !== confirmPassword) {
            return;
        }

        this.props.onSignUp({
            displayName,
            email,
            password,
        });

        this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
    }

    render() {
        const {
            displayName,
            email,
            password,
            confirmPassword, 
        } = this.state;

        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        required
                        value={displayName}
                        label='Display Name'
                        name='displayName'
                        handleChange={this.handleChange}
                    />
                    <FormInput
                        type='text'
                        required
                        value={email}
                        label='Email'
                        name='email'
                        handleChange={this.handleChange}
                    />
                    <FormInput
                        type='password'
                        required
                        value={password}
                        label='Password'
                        name='password'
                        handleChange={this.handleChange}
                    />
                    <FormInput
                        type='password'
                        required
                        value={confirmPassword}
                        label='Confirm password'
                        name='confirmPassword'
                        handleChange={this.handleChange}
                    />

                    <CustomButton type='submit'>
                        SIGN UP
                    </CustomButton>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignUp(input) {
            dispatch(userActions.signUpStart(input));
        }
    };
};

export default connect(null, mapDispatchToProps)(SignUp);
