import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgotPassword, forgotPasswordFailure, forgotPasswordSuccess } from '../../Actions/loginAction';
import LoginImage from '../../common/components/loginImage';
import { AppMessages } from '../../common/config/messages';
import { emailValidation } from '../../common/util';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, error: "", inProcess: false });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.email) {
            this.setState({ error: AppMessages.common.fieldReq });
            return false
        } else if (!emailValidation(this.state.email)) {
            this.setState({ error: AppMessages.forgotPassword.emailValid });
            return false
        } else {
            this.setState({ inProcess: true });
            this.props.forgotPass({ email: this.state.email }).then(res => {
                if (res.issuccess) {
                    this.setState({ emailSent: true, inProcess: true });
                } else {
                    this.setState({ error: AppMessages.forgotPassword.emailNotFound });
                }
            }).catch(err => {
                this.setState({ inProcess: false });
                this.props.enqueueSnackbar('Something went wrong', {
                    variant: 'Error',
                })
            })
        }
    }

    render() {
        return (
            <Fragment>
                <div>
                    <Grid container spacing={0}>
                        <LoginImage />

                        <Grid item sm={6} className="bg-White">
                            <div className="signin-form-container">
                                {!this.state.emailSent ?
                                    <Grid item sm={12}>
                                        <form onSubmit={this.handleSubmit}>
                                            <Typography component="h1" variant="h4">Forgot Password</Typography>
                                            <Typography className="grey-300 font-15 mb-2" variant="h4">Enter your registered email id.</Typography>
                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                id="userName"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                autoFocus
                                                onChange={this.handleChange}
                                            />
                                            {this.state.error &&
                                                <p className="error">{this.state.error}</p>
                                            }

                                            <Button
                                                type="submit"
                                                size="medium"
                                                variant="contained"
                                                color="primary"
                                                className="loginBtn mt-2 mr-1"
                                                disabled={this.state.inProcess}
                                            >Submit</Button>

                                            <div className="mt-2">
                                                <Typography variant="h4" className="grey-300 font-15">Back to <Link to="/sign-up">Sign in</Link></Typography>
                                            </div>
                                        </form>
                                    </Grid>
                                    :
                                    <Grid item sm={12}>
                                        <div>
                                            <Typography component="h1" variant="h4">Success</Typography>
                                            <Typography className="grey-300 font-15 mb-2" variant="h4">An Email with instructions to create a new password has been sent to you.</Typography>
                                        </div>
                                    </Grid>
                                }
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        );
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        forgotPass: (userInfo) => {
            return new Promise((resolve, rej) => {
                dispatch(forgotPassword(userInfo))
                    .then(res => {
                        dispatch(forgotPasswordSuccess(res.payload.data))
                        resolve(res.payload.data)
                    }).catch(err => {
                        dispatch(forgotPasswordFailure(err))
                        rej(err)
                    })
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(withSnackbar(ForgotPassword));