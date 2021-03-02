import React, { Component } from "react";
import { Route, Switch, Redirect, BrowserRouter, withRouter } from 'react-router-dom';
import BiographyTable from "../components/BiographyTableWizard/BiographyTable";
import { Step1 } from "../components/BiographyTableWizard/Step1";
import DashboardComponent from "../components/Dashboard/DashboardComponent";
import ForgotPasswordComponent from "../components/ForgotPassword/ForgotPasswordComponent";
import HeaderComponent from "../components/Header/HeaderComponent";
import LoginComponent from "../components/Login/LoginComponent";
import ResetPasswordComponent from "../components/ResetPassword/ResetPasswordComponent";
import SignupComponent from "../components/SignUp/SignupComponent";
import { getLocalStorageItem } from "../services/StorageService";

class AppRoute extends Component {

    render() {
        const checkForAuthorization = () => {
            if (!getLocalStorageItem("user")) {
                localStorage.clear();
                this.props.history.push("/")
            } else {
                return true
            }
        }

        const RenderRoute = (props) => {
            checkForAuthorization()
            return (
                <div>
                    <HeaderComponent />
                    {props.children}
                </div>
            )
        }

        /** render router only when user is loggedIn */
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route
                {...rest}
                render={(props) =>
                    getLocalStorageItem('user') ? (
                        <Component {...props} />
                    ) : (
                            <Redirect
                                to={{
                                    pathname: '/',
                                    state: { from: props.location },
                                }}
                            />
                        )
                }
            />
        );

        return (
            <Switch>
                <Route path={"/"} exact component={LoginComponent} ></Route>
                <Route exact path='/forgot-password' component={ForgotPasswordComponent} />
                <Route exact path='/signup' component={SignupComponent} />
                <Route exact path='/reset-password' component={ResetPasswordComponent} />
                <RenderRoute>
                    <PrivateRoute exact path='/dashboard' component={DashboardComponent} />
                    <PrivateRoute exact path='/biography-table/:id' component={BiographyTable} />
                </RenderRoute>
                <Redirect from='*' to='/' />
            </Switch>
        )
    }
}

export default withRouter(AppRoute);