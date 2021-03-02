import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { signUpUser, signUpUserFailure, signUpUserSuccess } from '../../Actions/loginAction';
import LoginImage from '../../common/components/loginImage';
import { AppMessages } from '../../common/config/messages';
import { emailValidation, validatePassword } from '../../common/util';

class SignupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            errors: {},
            userStatusError: ""
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        const userInfo = { ...this.state.userInfo };
        const errors = { ...this.state.errors };
        userInfo[name] = value;
        errors[name] = "";
        this.setState({ userInfo: userInfo, errors: errors, signingUp: false });
    }

    validateForm = () => {
        let fields = { ...this.state.userInfo };
        let errors = {};
        let formIsValid = true;

        if (!fields["first_name"]) {
            formIsValid = false;
            errors["first_name"] = AppMessages.common.fieldReq;
        }

        if (!fields["last_name"]) {
            formIsValid = false;
            errors["last_name"] = AppMessages.common.fieldReq;
        }

        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = AppMessages.common.fieldReq;
        }

        if (typeof fields["email"] !== "undefined") {
            if (!emailValidation(fields["email"])) {
                formIsValid = false;
                errors["email"] = AppMessages.forgotPassword.emailValid;
            }
        }

        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = AppMessages.common.fieldReq;
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = AppMessages.common.fieldReq;
        }

        if (typeof fields["password"] !== "undefined") {
            if (!validatePassword(fields["password"])) {
                formIsValid = false;
                errors["password"] = AppMessages.resetPassword.validPassword;
            }
        }

        if (!fields["cPassword"]) {
            formIsValid = false;
            errors["cPassword"] = AppMessages.common.fieldReq;
        }

        if (typeof fields["cPassword"] !== "undefined") {
            if (fields["cPassword"] !== fields["password"]) {
                formIsValid = false;
                errors["cPassword"] = AppMessages.common.matchedError;
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            this.setState({ signingUp: true });
            let userObj = {
                "first_name": this.state.userInfo.first_name,
                "password": this.state.userInfo.password,
                "email": this.state.userInfo.email,
                "username": this.state.userInfo.username
            }
            this.props.userSignup(userObj).then(res => {
                if (res.issuccess) {
                    this.setState({ signupCompleted: true, signingUp: false });
                } else {
                    this.setState({ userStatusError: res.data.message, signingUp: false });
                }
            });
        }
    }

    visitLogin = () => {
        this.props.history.push("/")
    }

    render() {
        return (
            <Fragment>
                <div>
                    <Grid container spacing={0}>
                        <LoginImage />
                        <Grid item sm={6} className="bg-White">
                            {!this.state.signupCompleted ?
                                <div className="signup-form-container">
                                    <Grid item sm={12} >
                                        <form onSubmit={this.handleSubmit}>
                                            <Typography component="h1" variant="h4">Signup</Typography>
                                            <Grid container spacing={3}>

                                                <Grid item sm={6}>
                                                    <TextField
                                                        margin="normal"
                                                        fullWidth
                                                        id="first_name"
                                                        label="First Name"
                                                        name="first_name"
                                                        autoComplete="First Name"
                                                        onChange={this.handleChange}
                                                    />
                                                    <p className="error">{this.state.errors["first_name"]}</p>
                                                </Grid>

                                                <Grid item sm={6}>
                                                    <TextField
                                                        margin="normal"
                                                        fullWidth
                                                        id="last_name"
                                                        label="Last Name"
                                                        name="last_name"
                                                        autoComplete="Last Name"
                                                        onChange={this.handleChange}
                                                    />
                                                    <p className="error">{this.state.errors["last_name"]}</p>
                                                </Grid>
                                            </Grid>
                                            <Grid sm={12}>
                                                <TextField
                                                    margin="normal"
                                                    fullWidth
                                                    id="email"
                                                    label="Email"
                                                    name="email"
                                                    autoComplete="email"
                                                    onChange={this.handleChange}
                                                />
                                                <p className="error">{this.state.errors["email"]}</p>
                                            </Grid>

                                            <Grid sm={12}>
                                                <TextField
                                                    margin="normal"
                                                    fullWidth
                                                    id="username"
                                                    label="Username"
                                                    name="username"
                                                    autoComplete="username"
                                                    onChange={this.handleChange}
                                                />
                                                <p className="error">{this.state.errors["username"]}</p>
                                            </Grid>

                                            <Grid sm={12}>
                                                <TextField
                                                    type="password"
                                                    margin="normal"
                                                    fullWidth
                                                    id="password"
                                                    label="Password"
                                                    name="password"
                                                    autoComplete="password"
                                                    onChange={this.handleChange}
                                                />
                                                <p className="error">{this.state.errors["password"]}</p>
                                            </Grid>

                                            <Grid sm={12}>
                                                <TextField
                                                    type="password"
                                                    margin="normal"
                                                    fullWidth
                                                    id="cPassword"
                                                    label="Confirm Password"
                                                    name="cPassword"
                                                    autoComplete="cPassword"
                                                    onChange={this.handleChange}
                                                />
                                                <p className="error">{this.state.errors["cPassword"]}</p>
                                            </Grid>
                                            <Button
                                                type="submit"
                                                size="medium"
                                                variant="contained"
                                                color="primary"
                                                disabled={this.state.signingUp}
                                                className="loginBtn mt-2 mr-1"
                                            >Submit</Button>

                                            {this.state.userStatusError &&
                                                <p className="error">{this.state.userStatusError}</p>
                                            }

                                            <div className="mt-2">
                                                <Typography className="grey-300 font-15 mt-2" variant="h4">Already registered? <Link to="/login">Sign in</Link></Typography>
                                            </div>
                                        </form>
                                    </Grid>
                                </div>
                                :
                                <div className="signin-form-container signup_success">
                                    <Typography component="h1" variant="h4">You've registered successfully!</Typography>
                                    <Button
                                        size="medium"
                                        variant="contained"
                                        color="primary"
                                        onClick={this.visitLogin}
                                        className="loginBtn mt-2 mr-1">
                                        Login
                                    </Button>
                                </div>
                            }
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        );
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        userSignup: (userInfo) => {
            return new Promise((resolve, rej) => {
                dispatch(signUpUser(userInfo))
                    .then(res => {
                        dispatch(signUpUserSuccess(res.payload.data))
                        resolve(res.payload.data)
                    }).catch(err => {
                        dispatch(signUpUserFailure(err))
                        rej(err)
                    })
            })
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(SignupComponent));