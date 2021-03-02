import { Button, Grid, InputAdornment, TextField, Typography } from '@material-ui/core';
import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

export const Step1 = (props) => {
    const { errors, dataSaving, userInfo } = props;
    const inputRef = React.useRef<HTMLInputElement>(null);

    const onButtonClick = () => {
        if (inputRef.current !== null) {
            inputRef.current.click();
        }
    }

    return (
        <div className="mt-1 container">
            <Typography className="mb-1">Biography Table Wizard: Step 1 of 4</Typography>
            <div className="container-inside">
                <h4 className="mb font-18 heading pb-1">Personal Info</h4>
                <form onSubmit={props.saveUserInfo}>
                    <Grid container spacing={3} className="grow">
                        <Grid item sm={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="first_name"
                                label="First Name *"
                                name="first_name"
                                helperText={errors && errors.first_name}
                                error={errors && errors.first_name}
                                onChange={props.handleChange}
                                value={userInfo.first_name}
                            />
                        </Grid>

                        <Grid item sm={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="middle_name"
                                label="Middle Name"
                                name="middle_name"
                                value={userInfo.middle_name}
                                helperText={errors && errors.middle_name}
                                error={errors && errors.middle_name}
                                onChange={props.handleChange}
                            />
                        </Grid>

                        <Grid item sm={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="last_name"
                                value={userInfo.last_name}
                                label="Last Name *"
                                name="last_name"
                                helperText={errors && errors.last_name}
                                error={errors && errors.last_name}
                                onChange={props.handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} className="grow">
                        <Grid item sm={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="maiden_name"
                                label="Maiden Name"
                                name="maiden_name"
                                value={userInfo.maiden_name}
                                helperText={errors && errors.maiden_name}
                                error={errors && errors.maiden_name}
                                onChange={props.handleChange}
                            />
                        </Grid>

                        <Grid item sm={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                value={userInfo.preferred_name}
                                id="preferred_name"
                                label="Preferred Name *"
                                name="preferred_name"
                                helperText={errors && errors.preferred_name}
                                error={errors && errors.preferred_name}
                                onChange={props.handleChange}
                            />
                        </Grid>

                        <Grid item sm={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="suffix"
                                label="suffix"
                                name="suffix"
                                value={userInfo.suffix}
                                autoComplete="suffix"
                                helperText={errors && errors.suffix}
                                error={errors && errors.suffix}
                                onChange={props.handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} className="grow">
                        <Grid item sm={6} className="">
                            <div className="uploadProfilePic">
                                <input
                                    style={{ "width": 0, "height": 0, "visibility": "hidden" }}
                                    ref={inputRef}
                                    type="file"
                                    onChange={props.onFileChange}
                                />
                                <span className="mr-1">Profile Picture</span>
                                <Button
                                    size="medium"
                                    variant="contained"
                                    color="primary"
                                    className="loginBtn mr-1"
                                    onClick={onButtonClick}>Upload
                                </Button>
                                <div className="imageBox">
                                    {userInfo.profile_picture &&
                                        <React.Fragment>
                                            {props.newUpload ?
                                                <img src={"data:image/png;base64," + userInfo.profile_picture} />
                                                : <img src={userInfo.profile_picture} />
                                            }
                                        </React.Fragment>
                                    }
                                </div>
                            </div>
                            {errors && errors.fileSizeErr &&
                                <p className="mt-1 error">{errors.fileSizeErr}</p>
                            }
                        </Grid>
                    </Grid>

                    <div className="links mt-2">
                        <h4 className="mb-1 font-18 heading pb-1 mb-2">Add Links</h4>
                        <Grid container spacing={3}>
                            <Grid item sm={4}>
                                <TextField
                                    className=""
                                    fullWidth
                                    id="input-with-icon-textfield"
                                    name="facebook_link"
                                    placeholder="Enter facebook link"
                                    value={userInfo.facebook_link}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FacebookIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={props.handleChange}
                                />
                            </Grid>

                            <Grid item sm={4}>
                                <TextField
                                    className=""
                                    fullWidth
                                    id="input-with-icon-textfield"
                                    name="twitter_link"
                                    value={userInfo.twitter_link}
                                    placeholder="Enter twitter link"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <TwitterIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={props.handleChange}
                                />
                            </Grid>

                            <Grid item sm={4}>
                                <TextField
                                    className=""
                                    fullWidth
                                    id="input-with-icon-textfield"
                                    name="instagram_link"
                                    value={userInfo.instagram_link}
                                    placeholder="Enter instagram link"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <InstagramIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={props.handleChange}
                                />
                            </Grid>

                            <Grid item sm={3}>
                                <TextField
                                    className=""
                                    fullWidth
                                    id="input-with-icon-textfield"
                                    label="Other link"
                                    name="other_link"
                                    value={userInfo.other_link}
                                    onChange={props.handleChange}
                                />
                            </Grid>
                        </Grid>
                    </div>

                    <div className="actions-row">
                        <Button
                            type="submit"
                            size="medium"
                            variant="contained"
                            color="primary"
                            disabled={dataSaving}
                            className="loginBtn mt-2 mr-1">Save</Button>
                        <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            disabled={props.match.params.id === "0"}
                            onClick={props.handleNextClick}
                            className="loginBtn mt-2 mr-1">Next
                    </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}
