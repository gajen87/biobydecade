import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import LoginImage from '../../common/components/loginImage';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Fragment>
                <div>
                    <Grid container spacing={0}>
                        <LoginImage />

                        <Grid item sm={6}>
                            <div className="signin-form-container">
                                <Grid item sm={12}>
                                    <form>
                                        <Typography component="h1" variant="h4">Forgot Password</Typography>
                                        <Typography className="grey-300 font-15 mb-2" variant="h4">Enter your registered email id.</Typography>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="userName"
                                            label="Email Address"
                                            name="userName"
                                            autoComplete="email"
                                            autoFocus
                                        />
                                        <Button
                                            type="submit"
                                            size="medium"
                                            variant="contained"
                                            color="primary"
                                            className="loginBtn mt-2 mr-1"
                                        >Submit</Button>

                                        <div className="mt-2">
                                            <Typography className="grey-300 font-15">Back to <Link to="/sign-up">Sign in</Link></Typography>
                                        </div>
                                    </form>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        );
    }
}

export default ForgotPassword;