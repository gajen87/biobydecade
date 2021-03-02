import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography } from "@material-ui/core";
import { Link, withRouter } from 'react-router-dom';
import LoginImage from '../../common/components/loginImage';
import { connect } from 'react-redux';
import { loginUser, loginUserFailure, loginUserSuccess } from '../../Actions/loginAction';
import { emailValidation } from '../../common/util'
import { AppMessages } from '../../common/config/messages';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {},
            isValid: true,
        }
    }

    handleChange = e => {
        let errors = { ...this.state.error }
        errors[e.target.name] = ""
        this.setState({ [e.target.name]: e.target.value, errorMsg: "" }, () => {
            this.setState({ isValid: false, error: errors });
            console.log(this.state)
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        let errors = this.state.error;
        if (!emailValidation(this.state.userName)) {
            errors.userName = AppMessages.forgotPassword.emailValid;
            this.setState({ error: errors, errorMsg: "" });
            return false;
        } else if (!this.state.password) {
            errors.password = AppMessages.common.fieldReq;
            this.setState({ error: errors, errorMsg: "" });
            console.log(this.state)
            return false;
        } else {
            this.setState({ isValid: true });
            this.props.loginUser({ email: this.state.userName, password: this.state.password }).then(res => {
                this.setState({ isValid: false });
                if (res.issuccess) {
                    localStorage.setItem('user', JSON.stringify(res));
                    this.props.history.push("/dashboard");
                } else {
                    this.setState({ error: true, errorMsg: res.message, loginProgress: false });
                }
            }).catch(err => {
                this.setState({ error: true, loginProgress: false, isValid: false });
            });
        }

    }

    render() {
        const useStyles = makeStyles((theme) => ({
            root: {
                flexGrow: 1,
            },
            paper: {
                padding: theme.spacing(2),
                textAlign: 'center',
                color: theme.palette.text.secondary,
            },
        }));
        return (
            <div className={useStyles.root}>
                <Grid container spacing={0}>

                    <LoginImage />
                    <Grid item sm={6} className="bg-White">
                        <div className="signin-form-container">
                            <form onSubmit={this.handleSubmit}>
                                <Typography component="h1" variant="h4">Sign in</Typography>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="userName"
                                    label="Email Address"
                                    name="userName"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={this.handleChange}
                                />
                                <p className="error">{this.state.error && this.state.error.userName}</p>

                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.handleChange}
                                />

                                <p className="error">{this.state.error && this.state.error.password}</p>

                                <div className="mt-1">
                                    <Link to="/forgot-password">
                                        <span className="f-12">Forgot Password?</span>
                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    size="medium"
                                    variant="contained"
                                    color="primary"
                                    className="loginBtn mt-2 mr-1"
                                    disabled={this.state.isValid}
                                >Sign In</Button>

                                {this.state.errorMsg &&
                                    <p className="error mt-1">{this.state.errorMsg}</p>
                                }

                                <Typography className="grey-300 font-15 mt-2" variant="h4">Don't have account? <Link to="/signup">Signup now</Link>
                                </Typography>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (userInfo) => {
            return new Promise((resolve, rej) => {
                dispatch(loginUser(userInfo))
                    .then(res => {
                        dispatch(loginUserSuccess(res.payload.data))
                        resolve(res.payload.data)
                    }).catch(err => {
                        dispatch(loginUserFailure(err))
                        rej(err)
                    })
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(withRouter(LoginComponent));
