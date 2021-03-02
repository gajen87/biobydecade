import { Grid } from '@material-ui/core';
import React from 'react';
import bioLogo from "../../assets/bioLogo.png";

const LoginImage = () => {
    return (
        <Grid item xs={6} className="loginBg">
            <img className="theme-bg-img" src={bioLogo}></img>
        </Grid>
    );
}

export default LoginImage;