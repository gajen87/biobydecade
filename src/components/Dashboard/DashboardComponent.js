import React, { Component, Fragment } from 'react';
import HeaderComponent from '../Header/HeaderComponent';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { postUserBio, postUserBioFailure, postUserBioSuccess, userBio, userBioFailure, userBioSuccess } from "../../Actions/biographicalTableStepOne"
import { AppMessages } from '../../common/config/messages';
import { checkExtension } from '../../common/util';
import LoaderComponent from '../../common/components/loader';
import { Step1 } from '../BiographyTableWizard/Step1';
import { Step2 } from '../BiographyTableWizard/Step2';
import UsersList from '../UsersList/UsersList';
import { withRouter } from 'react-router-dom';
import { getUsers, getUsersFailure, getUsersSuccess } from '../../Actions/dashboard';

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            currentStep: 1,
            isLoading: true
        }
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.props.getUsersList().then(res => {
            this.setState({ users: res.data, isLoading: false });
        }).catch(err => {
            console.log("Error")
        })
    }

 
    handleEditClick = (item) => {
        this.props.history.push({
            pathname: `/biography-table/${item}`,
            id: item,
            isNew: false
        })
    }

    addNewUser = () => {
        this.props.history.push({
            pathname: `biography-table/${0}`,
            isNew: true
        });
    }

    render() {
        return (
            <Fragment>
                {this.state.isLoading ?
                    <LoaderComponent /> :
                    <Fragment>
                        <UsersList
                            userdata={this.state.users}
                            handleEditClick={this.handleEditClick}
                            addNewUser={this.addNewUser} />
                    </Fragment>
                }
            </Fragment>
        );
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        getUsersList: () => {
            return new Promise((resolve, rej) => {
                dispatch(getUsers())
                    .then(res => {
                        dispatch(getUsersSuccess(res.payload.data))
                        resolve(res.payload.data)
                    }).catch(err => {
                        dispatch(getUsersFailure(err))
                        rej(err)
                    })
            })
        },
        getUserBio: () => {
            return new Promise((resolve, rej) => {
                dispatch(userBio())
                    .then(res => {
                        dispatch(userBioSuccess(res.payload.data))
                        resolve(res.payload.data)
                    }).catch(err => {
                        dispatch(userBioFailure(err))
                        rej(err)
                    })
            })
        },
        postUserBio: (userBio) => {
            return new Promise((resolve, rej) => {
                dispatch(postUserBio(userBio))
                    .then(res => {
                        dispatch(postUserBioSuccess(res.payload.data))
                        resolve(res.payload.data)
                    }).catch(err => {
                        dispatch(postUserBioFailure(err))
                        rej(err)
                    })
            })
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(withSnackbar(DashboardComponent)));