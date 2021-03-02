import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { postUserBio, postUserBioFailure, postUserBioSuccess, userBio, userBioFailure, userBioSuccess } from '../Actions/biographicalTableStepOne';
import BiographyTable from '../components/BiographyTableWizard/BiographyTable';


export const mapStateToProps = (state) => {
    return {
        roles: state.addResource.roles
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BiographyTable));
