import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { userBio, userBioFailure, userBioSuccess } from '../Actions/biographicalTableStepOne';
import UsersList from '../components/UsersList/UsersList';

export const mapStateToProps = (state) => {
    return {
        roles: state.addResource.roles
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        userList: () => {
            return new Promise((resolve, reject) => {
                try {
                    dispatch(userBio()).then((response) => {
                        dispatch(userBioSuccess(response.payload.data));
                        resolve(response.payload.data);
                    }).catch((error) => {
                        reject(error)
                        dispatch(userBioFailure(error));
                    });
                } catch (error) {
                    reject(error);
                }
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UsersList));
