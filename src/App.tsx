import React, { Fragment } from 'react';
import "./App.scss";
import AppRoute from './routes';
import { SnackbarProvider } from 'notistack';
import InstagramIcon from '@material-ui/icons/Instagram';
import Cancel from '@material-ui/icons/Cancel';
import { Button } from '@material-ui/core';
import HeaderComponent from './components/Header/HeaderComponent';

function App() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      classes={{
        containerRoot: 'custom-snackbar',
        variantSuccess: 'custom-snackbar-success',
        variantError: 'custom-snackbar-error',
        variantWarning: 'custom-snackbar-warning',
        variantInfo: 'custom-snackbar-info',
      }}>
      <AppRoute />
    </SnackbarProvider>
  );
}

export default App;
