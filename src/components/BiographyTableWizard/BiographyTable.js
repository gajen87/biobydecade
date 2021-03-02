import * as React from 'react';
import {
    postUserBio, postUserBioFailure, postUserBioSuccess, userBio, userBioFailure, userBioSuccess, getUserBioById,
    getUserBioByIdSuccess, getUserBioByIdFailure, updateUserBio, updateUserBioSuccess, updateUserBioFailure,
    postuserbirthinfo, postuserbirthinfoSuccess, postuserbirthinfoFailure, getParents, getParentsSuccess, getParentsFailure,
    postParents, postParentsSuccess, postParentsFailure, deleteParent, putParent, getSpouses, postSpouse, deleteSpouse, putSpouse, getSignificants
} from '../../Actions/biographicalTableStepOne';
import LoaderComponent from '../../common/components/loader';
import { AppMessages } from '../../common/config/messages';
import { checkExtension } from '../../common/util';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';
import { Step3 } from './Step3';

class BiographyTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 1,
            isLoading: true,
            userInfo: {
                first_name: "",
                last_name: "",
                middle_name: "",
                maiden_name: "",
                preferred_name: "",
                city_of_birth: ""
            },
            parents: []
        };
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        if (id == 0) {
            this.setState({ isLoading: false });
        } else {

            this.props.getUserByBioId(id).then(res => {
                this.setState({ userInfo: res.data[0], isLoading: false });
            })
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const userInfo = { ...this.state.userInfo };
        const errors = { ...this.state.errors };

        if (name === "still_alive") {
            userInfo[name] = e.target.checked;
        } else {
            userInfo[name] = value;
            errors[name] = "";
        }

        this.setState({ userInfo: userInfo, errors: errors });
        console.log(this.state.userInfo)
    }

    handlePrevClick = () => {
        this.setState({ currentStep: this.state.currentStep - 1 });
    }

    validateForm = () => {
        let fields = { ...this.state.userInfo };
        let errors = {};
        let formIsValid = true;

        if (fields["first_name"] === "") {
            formIsValid = false;
            errors["first_name"] = AppMessages.common.fieldReq;
        }

        if (fields["last_name"] === "") {
            formIsValid = false;
            errors["last_name"] = AppMessages.common.fieldReq;
        }

        if (fields["preferred_name"] === "" || fields["preferred_name"] === null) {
            formIsValid = false;
            errors["preferred_name"] = AppMessages.common.fieldReq;
        }

        this.setState({ errors: errors })
        return formIsValid;
    }

    onFileChange = (event) => {
        //return if none selected
        if (!event.target.files[0]) {
            return false
        }
        const errors = { ...this.state.errors };
        let formData = { ...this.state.userInfo }

        //check if file extension supported
        if (checkExtension(event.target.files[0])) {
            //show error if file size greater than 500KB
            if (event.target.files[0].size > 512000) {
                errors.fileSizeErr = AppMessages.common.fileSizeErr
                this.setState({ errors: errors });
                return false;
            } else {
                var file = event.target.files[0];
                var reader = new FileReader();
                reader.onload = () => {
                    var base64result = reader.result.split(',')[1];
                    formData["profile_picture"] = base64result;
                    this.setState({ userInfo: formData, newUpload: true });
                }
                reader.readAsDataURL(file);
            }
        } else {
            //show msg
            this.setState({ errorMsg: AppMessages.forgotPassword.emailValid, messageType: "error" });
            return false;
        }
    }

    handleNextClick = () => {
        this.setState({ currentStep: this.state.currentStep + 1 });
    }

    handleAliveField = (e) => {
        e.preventDefault();
        const { name, checked } = e.target;
        const userInfo = { ...this.state.userInfo };
        userInfo[name] = checked;
        this.setState({ userInfo: userInfo });
    }

    validateDeathForm = () => {
        let fields = { ...this.state.userInfo };
        let errors = {};
        let formIsValid = true;
        if (fields["birth_date"] === "") {
            formIsValid = false;
            errors["birth_date"] = AppMessages.common.fieldReq;
        }

        if (fields["city_of_birth"] === "" || fields["city_of_birth"] === null) {
            formIsValid = false;
            errors["city_of_birth"] = AppMessages.common.fieldReq;
        }

        if (fields["gender"] === "" || fields["gender"] === null) {
            formIsValid = false;
            errors["gender"] = AppMessages.common.fieldReq;
        }

        if (!fields["still_alive"]) {
            if (fields["death_date"] === "" || fields["death_date"] === null) {
                formIsValid = false;
                errors["death_date"] = AppMessages.common.fieldReq;
            }

            if (fields["city_of_death"] === "" || fields["city_of_death"] === null) {
                formIsValid = false;
                errors["city_of_death"] = AppMessages.common.fieldReq;
            }
        }

        this.setState({ errors: errors })
        return formIsValid;
    }

    saveUserInfo = (e) => {
        e.preventDefault();
        let id = Number(this.props.match.params.id);
        let userObj = {
            "bio_id": this.state.userInfo.bio_id,
            "last_name": this.state.userInfo.last_name,
            "facebook_link": this.state.userInfo.facebook_link,
            "instagram_link": this.state.userInfo.instagram_link,
            "preferred_name": this.state.userInfo.preferred_name,
            "middle_name": this.state.userInfo.middle_name,
            "twitter_link": this.state.userInfo.twitter_link,
            "maiden_name": this.state.userInfo.maiden_name,
            "suffix": this.state.userInfo.suffix,
            "first_name": this.state.userInfo.first_name,
            "other_link": this.state.userInfo.other_link,
            "profile_picture": this.state.userInfo.profile_picture ? this.state.userInfo.profile_picture : ""
        }
        if (this.validateForm()) {
            this.setState({ dataSaving: true });
            if (!!id) {
                console.log(userObj)
                this.props.updateUserBio(userObj).then(res => {
                    this.props.enqueueSnackbar('Data saved successfully', {
                        variant: 'Success',
                    });
                    this.setState({ dataSaving: false });
                }).catch(err => {
                    this.setState({ dataSaving: false });
                    this.props.enqueueSnackbar('Something went wrong.', {
                        variant: 'error',
                    });
                })
            } else {
                delete userObj.bio_id;
                this.props.postUserBio(userObj).then(res => {
                    this.props.history.push(`/biography-table/${res.data.bio_Id}`);
                }).catch(err => {
                    this.props.enqueueSnackbar('Something went wrong.', {
                        variant: 'error',
                    });
                })
            }
        }
    }

    convertDate = (date) => {
        let d = new Date(date);
        return d.toLocaleDateString();
    }

    addNewParent = () => {

    }

    saveUserInfoStep2 = (e) => {
        e.preventDefault();
        if (this.validateDeathForm()) {
            let userObj = {
                "bio_id": this.state.userInfo.bio_id,
                "state_of_birth": this.state.userInfo.state_of_birth,
                "gender": this.state.userInfo.gender,
                "country_of_death": this.state.userInfo.country_of_death,
                "county_of_birth": this.state.userInfo.county_of_birth,
                "county_of_death": this.state.userInfo.county_of_death,
                "burial_place": this.state.userInfo.burial_place,
                "state_of_death": this.state.userInfo.state_of_death,
                "still_alive": this.state.userInfo.still_alive,
                "birth_date": this.convertDate(this.state.userInfo.birth_date),
                "death_date": this.convertDate(this.state.userInfo.death_date),
                "city_of_death": this.state.userInfo.city_of_death,
                "city_of_birth": this.state.userInfo.city_of_birth,
                "country_of_birth": this.state.userInfo.country_of_birth
            }
            this.setState({ dataSaving: true });
            this.props.postuserbirthinfo(userObj).then(res => {
                this.props.enqueueSnackbar('Data saved successfully', {
                    variant: 'Success',
                });
                this.setState({ dataSaving: false });
            });
        }
    }

    handleDateChange = (date, name) => {
        let user = { ...this.state.userInfo }
        const errors = { ...this.state.errors };
        user[name] = date;
        errors[name] = "";
        this.setState({ userInfo: user, errors: errors });
    }

    addParents = () => {
        let newParent = {
            "bio_id": this.state.userInfo.bio_id,
            "records": [
                {
                    "parent_first_name": "",
                    "parent_year_of_death": "",
                    "parent_link": "",
                    "parent_year_of_birth": "",
                    "parent_type": "",
                    "parent_last_name": "",
                    "parent_id": 0
                }
            ]
        }
        this.setState({ addParentModal: !this.state.addParentModal, parent: newParent });
    }


    addParentHandleForm = (event) => {
        let { name, value } = event.target;
        let parentObj = { ...this.state.parent };
        const errors = { ...this.state.errors };
        errors[name] = "";
        parentObj.records[0][name] = value;
        this.setState({ parent: parentObj, errors: errors });

    }

    validateParentForm = () => {
        let fields = { ...this.state.parent.records[0] };
        let errors = {};
        let formIsValid = true;

        if (fields["parent_type"] === "") {
            formIsValid = false;
            errors["parent_type"] = AppMessages.common.fieldReq;
        }

        if (fields["parent_first_name"] === "") {
            formIsValid = false;
            errors["parent_first_name"] = AppMessages.common.fieldReq;
        }

        if (fields["parent_last_name"] === "") {
            formIsValid = false;
            errors["parent_last_name"] = AppMessages.common.fieldReq;
        }

        if (fields["parent_year_of_birth"] === "") {
            formIsValid = false;
            errors["parent_year_of_birth"] = AppMessages.common.fieldReq;
        }

        if (fields["parent_year_of_birth"] && fields["parent_year_of_death"]) {
            if (Number(fields["parent_year_of_death"]) < Number(fields["parent_year_of_birth"])) {
                formIsValid = false;
                errors["parent_year_of_death"] = AppMessages.common.yearOfDeath;
            }
        }

        this.setState({ errors: errors })
        return formIsValid;
    }

    handleAddNewParent = (event) => {
        event.preventDefault();
        if (this.validateParentForm()) {
            this.setState({ savingForm: true });
            if (this.state.parent.records[0].parent_id && this.state.parent.records[0].parent_id > 0) {
                let putObj = {
                    "parent_type": this.state.parent.records[0].parent_type,
                    "parent_year_of_birth": this.state.parent.records[0].parent_year_of_birth,
                    "parent_last_name": this.state.parent.records[0].parent_last_name,
                    "parent_link": this.state.parent.records[0].parent_link,
                    "parent_year_of_death": this.state.parent.records[0].parent_year_of_death,
                    "parent_first_name": this.state.parent.records[0].parent_first_name
                }
                this.props.putParent(this.state.parent.records[0].parent_id, putObj).then(res => {
                    this.getParentsDetails();
                    this.props.enqueueSnackbar('Parent updated successfully', {
                        variant: 'Success',
                    });
                    this.setState({ addParentModal: false, savingForm: false });
                }).catch(err => {
                    this.props.enqueueSnackbar('Something went wrong', {
                        variant: 'Error',
                    });
                })
            } else {
                this.props.postParents(this.state.parent).then(res => {
                    this.getParentsDetails();
                    this.props.enqueueSnackbar('Data saved successfully', {
                        variant: 'Success',
                    });
                    this.setState({ addParentModal: false, savingForm: false });
                }).catch(err => {
                    this.props.enqueueSnackbar('Something went wrong', {
                        variant: 'Error',
                    });
                });
            }

        }
    }


    /**
     * Method to fetch parents details
     */

    getParentsDetails = () => {
        this.setState({ parentsLoaded: false });
        this.props.getParents(this.state.userInfo.bio_id).then(res => {
            this.setState({ parentsLoaded: true });
            if (res.issuccess) {
                this.setState({ parents: res.data });
            } else {
                this.setState({ parents: [] });
            }
        }).catch(err => {
            this.props.enqueueSnackbar('Something went wrong.', {
                variant: 'error',
            });
        })
    }

    deleteParentRecord = (index) => {
        this.setState({ showDeleteParentDialog: !this.state.showDeleteParentDialog, currentParentIndex: this.state.parents[index] });
    }

    handleConfirmDialog = () => {
        this.setState({ deleting: true });
        this.props.deleteParent(this.state.currentParentIndex.parent_id).then(res => {
            this.setState({ showDeleteParentDialog: false, deleting: false });
            this.getParentsDetails();
        })
    }

    handleCancelParentDialog = () => {
        this.setState({ addParentModal: !this.state.addParentModal, errors: {} });
    }

    editParentRecord = (index) => {
        let parentObj = {
            "bio_id": this.state.userInfo.bio_id,
            "records": JSON.parse(JSON.stringify([this.state.parents[index]]))
        }
        this.setState({ addParentModal: !this.state.addParentModal, parent: parentObj });
    }


    // Spouses section

    fetchSpouses = () => {
        this.setState({ spousesLoaded: false });
        this.props.getSpouses(this.state.userInfo.bio_id).then(res => {
            this.setState({ spousesLoaded: true });
            if (res.issuccess) {
                this.setState({ spouses: res.data });
            }else{
                this.setState({ spouses: [] });
            }
        }).catch(err => {
            this.props.enqueueSnackbar('Something went wrong.', {
                variant: 'error',
            });
        });
    }

    handleAddEditSpouse = () => {
        let addSpouse = {
            "bio_id": this.state.userInfo.bio_id,
            "spouse_last_name": "",
            "reason": "",
            "spouse_year_of_death": "",
            "spouse_year_met": "",
            "spouse_first_name": "",
            "still_married": false,
            "marriage_year": "",
            "spouse_birth_year": "",
            "spouse_id": 0
        }
        this.setState({ addSpouseDialog: !this.state.addSpouseDialog, spouse: addSpouse, errors: "" });
    }

    handleSpouseForm = (event) => {
        const { name, value } = event.target;
        let spouseObj = { ...this.state.spouse };
        let errors = { ...this.state.errors };
        spouseObj[name] = value;
        errors[name] = "";
        if (name === "still_married") {
            const { checked } = event.target;
            spouseObj[name] = checked;
            errors[name] = "";
        }
        this.setState({ spouse: spouseObj, errors: errors });
    }

    validateSpouseForm = () => {
        let fields = { ...this.state.spouse };
        let errors = {};
        let formIsValid = true;

        if (fields["spouse_first_name"] === "") {
            formIsValid = false;
            errors["spouse_first_name"] = AppMessages.common.fieldReq;
        }

        if (fields["spouse_last_name"] === "") {
            formIsValid = false;
            errors["spouse_last_name"] = AppMessages.common.fieldReq;
        }

        if (fields["spouse_birth_year"] === "") {
            formIsValid = false;
            errors["spouse_birth_year"] = AppMessages.common.fieldReq;
        }

        if (fields["marriage_year"] === "") {
            formIsValid = false;
            errors["marriage_year"] = AppMessages.common.fieldReq;
        }

        if (fields["spouse_birth_year"] && fields["marriage_year"]) {
            if (fields["spouse_birth_year"] > fields["marriage_year"]) {
                formIsValid = false;
                errors["marriage_year"] = AppMessages.common.marriage_year;
            }
        }

        if (fields["spouse_birth_year"] && fields["marriage_year"] && fields["spouse_year_met"]) {
            if (fields["spouse_year_met"] < fields["spouse_birth_year"]) {
                formIsValid = false;
                errors["spouse_year_met"] = AppMessages.common.year_met;
            }
        }

        if (fields["spouse_year_met"] === "") {
            formIsValid = false;
            errors["spouse_year_met"] = AppMessages.common.fieldReq;
        }

        if (!fields["still_married"]) {
            if (fields["reason"] === "") {
                formIsValid = false;
                errors["reason"] = AppMessages.common.fieldReq;
            }

        }
        if (fields["reason"] === "death") {
            if (fields["spouse_year_of_death"] === "") {
                formIsValid = false;
                errors["spouse_year_of_death"] = AppMessages.common.fieldReq;
            }
        }

        this.setState({ errors: errors })
        return formIsValid;
    }

    handleAddNewSpouse = (event) => {
        event.preventDefault();
        if (this.validateSpouseForm()) {
            this.setState({ savingSpouse: true });
            if (this.state.spouse.spouse_id > 0) {
                this.props.updateSpouse(this.state.spouse.spouse_id, this.state.spouse).then(res => {
                    this.setState({ savingSpouse: false, addSpouseDialog: false });
                    this.fetchSpouses();
                })
            } else {
                this.props.postSpouse(this.state.spouse).then(res => {
                    this.setState({ savingSpouse: false, addSpouseDialog: false });
                    this.fetchSpouses();
                })
            }
        }
    }

    deleteSpouse = (index) => {
        this.setState({ showDeleteSpouseDialog: !this.state.showDeleteSpouseDialog, currentSpouseIndex: this.state.spouses[index] });
    }

    handleSpouseConfirmDialog = () => {
        let spouseObj = this.state.currentSpouseIndex;
        this.setState({ deleting: true });
        this.props.deleteSpouse(spouseObj.spouse_id).then(res => {
            this.setState({ showDeleteSpouseDialog: false, deleting: false });
            this.fetchSpouses();
        });
    }

    editSpouse = (index) => {
        let currentObj = this.state.spouses[index];
        this.setState({ spouse: currentObj, addSpouseDialog: true });
    }

    // Significant
    fecthSignificants = () => {
        this.props.fetchSignificantOther(this.state.userInfo.bio_id).then(res => {
            this.setState({ significantLoaded: true });
            if (res.issuccess) {
                this.setState({ significantOthers: res.data });
            }
        }).catch(err => {
            this.props.enqueueSnackbar('Something went wrong.', {
                variant: 'error',
            });
        });
    }

    addSignificantDialog = () => {
        let addSignificant = {
            "bio_id": this.state.userInfo.bio_id,
            "start_year": "",
            "last_name": "",
            "reason": "",
            "link": "",
            "year_of_death": "",
            "first_name": "",
            "year_met": "",
            "still_together": true,
            "birth_year": ""
        }
    }

    handleSignificantDialog = () => {
        this.setState({ addSignificant: !this.state.addSignificant });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.isLoading ? <LoaderComponent /> :
                    <React.Fragment>
                        {this.state.currentStep === 1 ?
                            <Step1
                                {...this.state}
                                {...this.props}
                                handleChange={this.handleChange}
                                saveUserInfo={this.saveUserInfo}
                                onFileChange={this.onFileChange}
                                handleNextClick={this.handleNextClick}
                            />
                            : this.state.currentStep === 2 ?
                                <Step2
                                    {...this.state}
                                    {...this.props}
                                    handleDateChange={this.handleDateChange}
                                    handleChange={this.handleChange}
                                    handleAliveField={this.handleAliveField}
                                    saveUserInfoStep2={this.saveUserInfoStep2}
                                    onFileChange={this.onFileChange}
                                    handlePrevClick={this.handlePrevClick}
                                    handleNextClick={this.handleNextClick}
                                /> : this.state.currentStep === 3 ?

                                    <Step3
                                        {...this.state}
                                        {...this.props}
                                        handlePrevClick={this.handlePrevClick}
                                        addParents={this.addParents}
                                        getParentsDetails={this.getParentsDetails}
                                        deleteParentRecord={this.deleteParentRecord}
                                        editParentRecord={this.editParentRecord}
                                        addParentHandleForm={this.addParentHandleForm}
                                        handleAddNewParent={this.handleAddNewParent}
                                        handleCancelParentDialog={this.handleCancelParentDialog}
                                        handleConfirmDialog={this.handleConfirmDialog}

                                        fetchSpouses={this.fetchSpouses}
                                        handleAddEditSpouse={this.handleAddEditSpouse}
                                        handleSpouseForm={this.handleSpouseForm}
                                        deleteSpouse={this.deleteSpouse}
                                        handleAddNewSpouse={this.handleAddNewSpouse}
                                        handleSpouseConfirmDialog={this.handleSpouseConfirmDialog}
                                        editSpouse={this.editSpouse}

                                        fecthSignificants={this.fecthSignificants}
                                        handleSignificantDialog={this.handleSignificantDialog}
                                        addSignificantDialog={this.addSignificantDialog}
                                    />
                                    : ""
                        }
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export const mapStateToProps = (state) => {
    return {
        roles: state
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        updateUserBio: (userInfo) => {
            return new Promise((resolve, rej) => {
                dispatch(updateUserBio(userInfo))
                    .then(res => {
                        dispatch(updateUserBioSuccess(res.payload.data))
                        resolve(res.payload.data)
                    }).catch(err => {
                        dispatch(updateUserBioFailure(err))
                        rej(err)
                    })
            })
        },

        getUserByBioId: (id) => {
            return new Promise((resolve, rej) => {
                dispatch(getUserBioById(id))
                    .then(res => {
                        dispatch(getUserBioByIdSuccess(res.payload.data))
                        resolve(res.payload.data)
                    }).catch(err => {
                        dispatch(getUserBioByIdFailure(err))
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
        },
        postuserbirthinfo: (userBio) => {
            return new Promise((resolve, rej) => {
                dispatch(postuserbirthinfo(userBio))

                    .then(res => {
                        dispatch(postuserbirthinfoSuccess(res.payload.data))
                        resolve(res.payload.data)
                    }).catch(err => {
                        dispatch(postuserbirthinfoFailure(err))
                        rej(err)
                    })
            })
        },
        getParents: (biodId) => {
            return new Promise((resolve, rej) => {
                dispatch(getParents(biodId))
                    .then(res => {
                        dispatch(getParentsSuccess(res.payload.data))
                        resolve(res.payload.data)
                    }).catch(err => {
                        dispatch(getParentsFailure(err))
                        rej(err)
                    })
            })
        },

        postParents: (biodId) => {
            return new Promise((resolve, rej) => {
                dispatch(postParents(biodId))
                    .then(res => {
                        dispatch(postParentsSuccess(res.payload.data))
                        resolve(res.payload.data)
                    }).catch(err => {
                        dispatch(postParentsFailure(err))
                        rej(err)
                    })
            })
        },

        deleteParent: (parent_id) => {
            return new Promise((resolve, rej) => {
                dispatch(deleteParent(parent_id))
                    .then(res => {
                        resolve(res.payload.data)
                    })
            })
        },
        putParent: (parent_id, parentObj) => {
            return new Promise((resolve, rej) => {
                dispatch(putParent(parent_id, parentObj))
                    .then(res => {
                        resolve(res.payload.data)
                    })
            })
        },
        getSpouses: (biodId) => {
            return new Promise((resolve, rej) => {
                dispatch(getSpouses(biodId))
                    .then(res => {
                        resolve(res.payload.data)
                    })
            })
        },
        postSpouse: (spouseObj) => {
            return new Promise((resolve, rej) => {
                dispatch(postSpouse(spouseObj))
                    .then(res => {
                        resolve(res.payload.data)
                    }).catch(err => {
                        rej(err)
                    })
            })
        },
        deleteSpouse: (spouse_id) => {
            return new Promise((resolve, rej) => {
                dispatch(deleteSpouse(spouse_id))
                    .then(res => {
                        resolve(res.payload.data)
                    }).catch(err => {
                        rej(err)
                    })
            })
        },
        updateSpouse: (spouse_id, spouseObj) => {
            return new Promise((resolve, rej) => {
                dispatch(putSpouse(spouse_id, spouseObj))
                    .then(res => {
                        resolve(res.payload.data)
                    }).catch(err => {
                        rej(err)
                    })
            })
        },
        fetchSignificantOther: (biodId) => {
            return new Promise((resolve, rej) => {
                dispatch(getSignificants(biodId))
                    .then(res => {
                        resolve(res.payload.data)
                    })
            })
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withSnackbar(BiographyTable)));