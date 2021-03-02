import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';

const LoaderComponent = (props) => {
    return (
        <Grid container justify="center" className="mt-4">
            <CircularProgress />
        </Grid>
    );
}

export default LoaderComponent;