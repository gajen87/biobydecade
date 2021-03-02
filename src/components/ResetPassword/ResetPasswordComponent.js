import { Button, CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { postChangePassword, postChangePasswordFailure, postChangePasswordSuccess, postResetPasswordLink, postResetPasswordLinkFailure, postResetPasswordLinkSuccess } from '../../Actions/loginAction';
import LoginImage from '../../common/components/loginImage';
import { AppMessages } from '../../common/config/messages';
import { validatePassword } from '../../common/util';

class ResetPasswordComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            cPassword: "",
            errors: {},
            inProcess: true,
            isLoading: true
        }
    }

    componentDidMount() {
        let data = window.location.href.split('=')[1];
        this.props.postResetLink({ key: data }).then(res => {
            this.setState({ isLoading: false });
            if (res.issuccess) {
                this.setState({ emailData: res.data });
            } else {
                this.setState({ linkExpired: true });
            }
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, error: "", inProcess: false, errors: {}, inProcess: false });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let errors = { ...this.state.errors }
        if (this.state.password === '' && this.state.cPassword === '') {
            errors.password = AppMessages.common.fieldReq;
            errors.cPassword = AppMessages.common.fieldReq;
            this.setState({ errors: errors });
            return false;
        } else if (this.state.password === '') {
            errors.password = AppMessages.common.fieldReq;
            this.setState({ errors: errors });
            return false
        } else if (this.state.cPassword === '') {
            errors.cPassword = AppMessages.common.fieldReq;
            this.setState({ errors: errors });
        } else if (this.state.password === this.state.cPassword) {
            if (!validatePassword(this.state.password)) {
                errors.password = AppMessages.resetPassword.validPassword
                this.setState({ errors: errors });
            } else {
                this.setState({ inProcess: true });
                let obj = {
                    "new_password": this.state.password,
                    "email": this.state.emailData.emailid
                }
                this.props.postChangePassword(obj).then(res => {
                    if (res.issuccess) {
                        this.setState({
                            isPasswordUpdated: true
                        })
                    }
                }).catch(err => {
                    this.props.enqueueSnackbar('Something went wrong', {
                        variant: 'Error',
                    })
                })
            }
        } else {
            errors.cPassword = AppMessages.common.matchedError
            this.setState({ errors: errors });
        }
    }

    visitLogin = () => {
        this.props.history.push("/")
    }

    render() {
        return (
            <div>
                <Grid container spacing={0}>
                    <LoginImage />
                    <Grid item sm={6} className="bg-White">
                        <div className="signin-form-container">
                            {!this.state.isPasswordUpdated ?
                                < Fragment>
                                    {!this.state.isLoading ?
                                        <Fragment>
                                            {!this.state.linkExpired ?
                                                <form onSubmit={this.handleSubmit}>
                                                    <Typography component="h1" variant="h4">Reset Password</Typography>
                                                    <TextField
                                                        margin="normal"
                                                        type="password"
                                                        fullWidth
                                                        id="userName"
                                                        label="Password"
                                                        name="password"
                                                        autoComplete="Password"
                                                        onChange={this.handleChange}
                                                    />
                                                    {this.state.errors &&
                                                        <p className="error">{this.state.errors.password}</p>
                                                    }

                                                    <TextField
                                                        margin="normal"
                                                        type="password"
                                                        fullWidth
                                                        id="userName"
                                                        label="Confirm password"
                                                        name="cPassword"
                                                        autoComplete="Confirm password"
                                                        onChange={this.handleChange}
                                                    />

                                                    {this.state.errors &&
                                                        <p className="error">{this.state.errors.cPassword}</p>
                                                    }

                                                    <Button
                                                        type="submit"
                                                        size="medium"
                                                        variant="contained"
                                                        color="primary"
                                                        disabled={this.state.inProcess}
                                                        className="loginBtn mt-2 mr-1"
                                                    >Submit</Button>
                                                </form> :
                                                <div className="signup_success">
                                                    <Typography component="h1" variant="h4">Expired!</Typography>
                                                    <p>Link expired or used</p>
                                                    <Button
                                                        size="medium"
                                                        variant="contained"
                                                        color="primary"
                                                        className="loginBtn mt-2 mr-1">
                                                        <Link to="/login">Login</Link>
                                                    </Button>
                                                </div>
                                            }
                                        </Fragment>
                                        : <CircularProgress />
                                    }
                                </Fragment>
                                :
                                <div className="reset-success">
                                    <Typography component="h1" variant="h4">Password updated!</Typography>
                                    <Typography className="grey-300 font-15">You can use your updated password to sign in to your account.</Typography>
                                    <div>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className="mt-2"
                                            onClick={this.visitLogin}
                                        >Sign in</Button>
                                    </div>
                                </div>
                            }

                        </div>

                    </Grid>
                </Grid>
            </div >
        );
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        postResetLink: (userInfo) => {
            return new Promise((resolve, rej) => {
                dispatch(postResetPasswordLink(userInfo))
                    .then(res => {
                        dispatch(postResetPasswordLinkSuccess(res.payload.data))
                        resolve(res.payload.data)
                    }).catch(err => {
                        dispatch(postResetPasswordLinkFailure(err))
                        rej(err)
                    })
            })
        },
        postChangePassword: (passwordObj) => {
            return new Promise((resolve, rej) => {
                dispatch(postChangePassword(passwordObj))
                    .then(res => {
                        dispatch(postChangePasswordSuccess(res.payload.data))
                        resolve(res.payload.data)
                    }).catch(err => {
                        dispatch(postChangePasswordFailure(err))
                        rej(err)
                    })
            })
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(withSnackbar(ResetPasswordComponent)));