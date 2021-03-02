import { Button, Checkbox, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';


export const Step2 = (props) => {
    const { errors, dataSaving, userInfo } = props;

    return (
        <div className="mt-1 container">
            <Typography className="mb-1">Biography Table Wizard: Step 2 of 4</Typography>
            <div className="container-inside">
                <h4 className="mb font-18 heading pb-1">Personal Info</h4>
                <form onSubmit={props.saveUserInfoStep2}>
                    <Grid container spacing={3} className="grow">
                        <Grid item sm={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    fullWidth
                                    disableFuture
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Birth Date *"
                                    name="birth_date"
                                    value={userInfo.birth_date ? userInfo.birth_date : null}
                                    onChange={(e) => props.handleDateChange(e, "birth_date")}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    error={errors && errors.birth_date}
                                />
                                <p className="error">{errors && errors.birth_date}</p>
                            </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item sm={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="city_of_birth"
                                label="City of Birth *"
                                name="city_of_birth"
                                value={userInfo.city_of_birth}
                                autoComplete="Death Date"
                                helperText={errors && errors.city_of_birth}
                                error={errors && errors.city_of_birth}
                                onChange={props.handleChange}
                            />
                        </Grid>

                        <Grid item sm={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="county_of_birth"
                                label="County of Birth"
                                name="county_of_birth"
                                autoComplete="Death Date"
                                value={userInfo.county_of_birth}
                                helperText={errors && errors.county_of_birth}
                                error={errors && errors.county_of_birth}
                                onChange={props.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} className="grow">

                        <Grid item sm={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="state_of_birth"
                                label="State of Birth"
                                name="state_of_birth"
                                autoComplete="Death Date"
                                value={userInfo.state_of_birth}
                                helperText={errors && errors.state_of_birth}
                                error={errors && errors.state_of_birth}
                                onChange={props.handleChange}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="country_of_birth"
                                label="Country of Birth"
                                name="country_of_birth"
                                value={userInfo.country_of_birth}
                                helperText={errors && errors.country_of_birth}
                                error={errors && errors.country_of_birth}
                                onChange={props.handleChange}
                            />
                        </Grid>
                    </Grid>

                    <div className="links mt-2">
                        <h4 className="mb-1 font-18 heading pb-1 mb-1">Gender</h4>
                        <Grid container spacing={3}>
                            <Grid item sm={4}>
                                <FormControl component="fieldset" className="genderLabels w100">
                                    <RadioGroup aria-label="gender" name="gender" value={userInfo.gender} onChange={props.handleChange}>
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    </RadioGroup>
                                    <p className="error">{errors && errors.gender}</p>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <FormControlLabel
                            className="mt-2"
                            control={
                                <Checkbox
                                    checked={userInfo.still_alive}
                                    onChange={props.handleAliveField}
                                    color="primary"
                                    name="still_alive"
                                    className="checkBoxStyle"
                                />
                            }
                            label="Still Alive"
                        />
                    </div>

                    {!userInfo.still_alive &&
                        <div className="links mt-2">
                            <h4 className="font-18 heading pb-1">Death Information (If deceased)</h4>
                            <Grid container spacing={3}>
                                <Grid item sm={4}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            fullWidth
                                            name="death_date"
                                            margin="normal"
                                            id="date-picker-inline"
                                            disableFuture
                                            label="Death Date *"
                                            value={userInfo.death_date ? userInfo.death_date : null}
                                            onChange={(e) => props.handleDateChange(e, "death_date")}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                        <p className="error">{errors && errors.death_date}</p>
                                    </MuiPickersUtilsProvider>
                                </Grid>

                                <Grid item sm={4}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="city_of_death"
                                        label="City of Death *"
                                        name="city_of_death"
                                        autoComplete="City of Birth"
                                        value={userInfo.city_of_death}
                                        helperText={errors && errors.city_of_death}
                                        error={errors && errors.city_of_death}
                                        onChange={props.handleChange}
                                    />
                                </Grid>

                                <Grid item sm={4}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="county_of_death"
                                        label="County of Death"
                                        name="county_of_death"
                                        autoComplete="County of Death"
                                        value={userInfo.county_of_death}
                                        helperText={errors && errors.county_of_death}
                                        error={errors && errors.county_of_death}
                                        onChange={props.handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item sm={4}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="state_of_death"
                                        label="State of Death"
                                        name="state_of_death"
                                        value={userInfo.state_of_death}
                                        autoComplete="State of Death"
                                        helperText={errors && errors.state_of_death}
                                        error={errors && errors.state_of_death}
                                        onChange={props.handleChange}
                                    />
                                </Grid>

                                <Grid item sm={4}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="country_of_death"
                                        label="Country of Death"
                                        name="country_of_death"
                                        autoComplete="State of Death"
                                        value={userInfo.country_of_death}
                                        helperText={errors && errors.country_of_death}
                                        error={errors && errors.country_of_death}
                                        onChange={props.handleChange}
                                    />
                                </Grid>

                                <Grid item sm={4}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="burial_place"
                                        label="Burial Place"
                                        name="burial_place"
                                        autoComplete="Burial Place"
                                        value={userInfo.burial_place}
                                        helperText={errors && errors.burial_place}
                                        error={errors && errors.burial_place}
                                        onChange={props.handleChange}
                                    />
                                </Grid>

                            </Grid>
                        </div>
                    }

                    <div className="actions-row">
                        <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            disabled={dataSaving}
                            onClick={props.handlePrevClick}
                            className="loginBtn mt-2 mr-1">Prev</Button>
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
                            className="loginBtn mt-2 mr-1"
                            disabled={props.match.params.id === "0"}
                            onClick={props.handleNextClick}>Next
                    </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
