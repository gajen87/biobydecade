import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Tooltip, Typography } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LoaderComponent from '../../common/components/loader';
import DialogActionComponent from '../../common/components/Dialog';
import { years } from '../../common/util';

export const Step3 = (props) => {
    const { errors, dataSaving, userInfo } = props;
    useEffect(() => {
        props.getParentsDetails();
        props.fetchSpouses();
        props.fecthSignificants();
    }, []);

    return (
        <div className="mt-1 container">
            <Typography className="mb-1">Biography Table Wizard: Step 3 of 4</Typography>
            <div className="container-inside">
                <div className="heading_wrapper">
                    <h4 className="mb font-18 heading pb-1">Parents</h4>
                    {props.parentsLoaded &&
                        <Button
                            className="headingBtn"
                            startIcon={<AddIcon />}
                            variant="outlined"
                            color="secondary"
                            onClick={props.addParents}
                        >Add Parent</Button>
                    }
                </div>

                {!props.parentsLoaded ? <LoaderComponent /> :
                    <Fragment>
                        {
                            props.parents && props.parents.length > 0 ?
                                <div className="table tableParent">
                                    <div className="tableHeader pb-1 mt-2">
                                        <Grid container spacing={3} className="grow">
                                            <Grid item sm={2}>Parental Figure Type</Grid>
                                            <Grid item sm={2}>First Name</Grid>
                                            <Grid item sm={2}>Last Name</Grid>
                                            <Grid item sm={2}>Year of Birth</Grid>
                                            <Grid item sm={2}>Year of Death</Grid>
                                            <Grid item sm={1}>Link</Grid>
                                            <Grid item sm={1}>Action</Grid>
                                        </Grid>
                                    </div>

                                    {props.parents.map((item, index) => (
                                        <Grid container spacing={3} className="grow mb-1 stepTable">
                                            <Grid item sm={2} className="tableRow">
                                                {item.parent_type}
                                            </Grid>
                                            <Grid item sm={2} className="tableRow">
                                                {item.parent_first_name}
                                            </Grid>
                                            <Grid item sm={2} className="tableRow">
                                                {item.parent_last_name}
                                            </Grid>
                                            <Grid item sm={2} className="tableRow">
                                                {item.parent_year_of_birth}
                                            </Grid>
                                            <Grid item sm={2} className="tableRow">
                                                {item.parent_year_of_death ? item.parent_year_of_death : "-"}
                                            </Grid>
                                            <Grid item sm={1} className="tableRow">
                                                {item.link}
                                            </Grid>
                                            <Grid item sm={1} className="tableRow">
                                                <Tooltip title="Edit" arrow>
                                                    <IconButton onClick={() => props.editParentRecord(index)} aria-label="edit" className="p-0 mr-1">
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete" arrow>
                                                    <IconButton onClick={() => props.deleteParentRecord(index)} aria-label="delete" className="p-0">
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </div>
                                : <Grid container spacing={3} className="grow">
                                    <Grid item sm={12}>
                                        <p className="mt-2 align-center">No Records found</p></Grid>
                                </Grid>
                        }
                    </Fragment>
                }
            </div>

            <div className="container-inside">
                <div className="heading_wrapper">
                    <h4 className="mb font-18 heading pb-1">Spouses</h4>
                    {props.spousesLoaded &&
                        <Button
                            className="headingBtn"
                            startIcon={<AddIcon />}
                            variant="outlined"
                            color="secondary"
                            onClick={props.handleAddEditSpouse}
                        >Add Spouse</Button>
                    }
                </div>
                {!props.spousesLoaded ? <LoaderComponent /> :
                    <Fragment>
                        {props.spouses && props.spouses.length > 0 ?
                            <div className="table tableParent">
                                <div className="tableHeader pb-1 mt-2">
                                    <Grid container spacing={3} className="grow">
                                        <Grid item sm={2}>First Name</Grid>
                                        <Grid item sm={2}>Last Name</Grid>
                                        <Grid item sm={2}>Year of Birth</Grid>
                                        <Grid item sm={2}>Year of Marriage</Grid>
                                        <Grid item sm={1}>Year met</Grid>
                                        <Grid item sm={2}>Still Married</Grid>
                                        <Grid item sm={1}>Action</Grid>
                                    </Grid>
                                </div>

                                {props.spouses.map((item, index) => (
                                    <Grid key={index} container spacing={3} className="grow mb-1">
                                        <Grid item sm={2} className="tableRow">
                                            {item.spouse_first_name}
                                        </Grid>
                                        <Grid item sm={2} className="tableRow">
                                            {item.spouse_last_name}
                                        </Grid>
                                        <Grid item sm={2} className="tableRow">
                                            {item.spouse_birth_year}
                                        </Grid>
                                        <Grid item sm={2} className="tableRow">
                                            {item.marriage_year}
                                        </Grid>
                                        <Grid item sm={1} className="tableRow">
                                            {item.spouse_year_met}
                                        </Grid>
                                        <Grid item sm={2} className="tableRow">
                                            {item.still_married === 0 ? "No" : "Yes"}
                                        </Grid>
                                        <Grid item sm={1} className="tableRow">
                                            <Tooltip title="Edit" arrow>
                                                <IconButton onClick={() => props.editSpouse(index)} aria-label="edit" className="p-0 mr-1">
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete" arrow>
                                                <IconButton aria-label="delete" onClick={() => props.deleteSpouse(index)} className="p-0">
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                ))}
                            </div>
                            :
                            <Grid container spacing={3} className="grow">
                                <Grid item sm={12}>
                                    <p className="mt-2 align-center">No Records found</p>
                                </Grid>
                            </Grid>
                        }
                    </Fragment>
                }

                {props.showDeleteParentDialog &&
                    <DialogActionComponent
                        hideActionDialog={props.deleteParentRecord}
                        handleConfirmDialog={props.handleConfirmDialog}
                        deleting={props.deleting}
                    />
                }

                {props.showDeleteSpouseDialog &&
                    <DialogActionComponent
                        hideActionDialog={props.deleteSpouse}
                        handleConfirmDialog={props.handleSpouseConfirmDialog}
                        deleting={props.deleting}
                    />
                }

                <div className="actions-row mb-2">
                    <Button
                        size="medium"
                        variant="contained"
                        color="primary"
                        disabled={dataSaving}
                        onClick={props.handlePrevClick}
                        className="loginBtn mt-2 mr-1">Prev</Button>
                    <Button
                        size="medium"
                        variant="contained"
                        color="primary"
                        className="loginBtn mt-2 mr-1"
                        disabled={true}
                        onClick={props.handleNextClick}>Next
                    </Button>
                </div>
            </div>


            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                open={props.addParentModal}
                onClose={props.addParents}
                aria-labelledby="max-width-dialog-title">
                <DialogTitle id="max-width-dialog-title" className="ModalHeading">
                    Add Parent
                </DialogTitle>

                <form onSubmit={props.handleAddNewParent}>
                    <DialogContent>
                        {props.parent &&
                            <Grid container spacing={3} className="grow">
                                <Grid item sm={4} className="tableRow">
                                    <FormControl className="fwidth">
                                        <InputLabel id="demo-simple-select-label">Parental Figure Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            fullWidth
                                            name="parent_type"
                                            onChange={props.addParentHandleForm}
                                            value={props.parent.records[0].parent_type}
                                        >
                                            <MenuItem value={"Father"}>Father</MenuItem>
                                            <MenuItem value={"Mother"}>Mother</MenuItem>
                                        </Select>
                                        {errors && errors.parent_type &&
                                            <p className="error">{errors && errors.parent_type}</p>
                                        }
                                    </FormControl>
                                </Grid>

                                <Grid item sm={4} className="tableRow">
                                    <FormControl className="fwidth inputForm">
                                        <TextField onChange={props.addParentHandleForm} name="parent_first_name"
                                            fullWidth
                                            floatingLabelText='Input' style={{ flex: 1 }}
                                            value={props.parent.records[0].parent_first_name}
                                            placeholder="First Name"
                                            error={errors && errors.parent_first_name}
                                            helperText={errors && errors.parent_first_name}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item sm={4} className="tableRow">
                                    <FormControl className="fwidth inputForm">
                                        <TextField onChange={props.addParentHandleForm}
                                            name="parent_last_name"
                                            fullWidth
                                            value={props.parent.records[0].last_name}
                                            placeholder="Last Name"
                                            error={errors && errors.parent_last_name}
                                            helperText={errors && errors.parent_last_name} />
                                    </FormControl>
                                </Grid>

                                <Grid item sm={4} className="tableRow">
                                    <FormControl className="fwidth">
                                        <InputLabel id="year-of-birth">Year of birth</InputLabel>
                                        <Select
                                            onChange={props.addParentHandleForm}
                                            labelId="year-of-birth"
                                            value={props.parent.records[0].parent_year_of_birth}
                                            fullWidth
                                            name="parent_year_of_birth">
                                            {years().map(item => (
                                                <MenuItem value={item}>{item}</MenuItem>
                                            ))}
                                        </Select>
                                        <p className="error">{errors && errors.parent_year_of_birth}</p>
                                    </FormControl>
                                </Grid>

                                <Grid item sm={4} className="tableRow">
                                    <FormControl className="fwidth">
                                        <InputLabel id="year-of-death">Year of death</InputLabel>
                                        <Select
                                            onChange={props.addParentHandleForm}
                                            labelId="year-of-death"
                                            value={props.parent.records[0].parent_year_of_death}
                                            fullWidth
                                            name="parent_year_of_death">
                                            <MenuItem value=""></MenuItem>
                                            {years().map((item, key) => (
                                                <MenuItem
                                                    disabled={props.parent.records[0].parent_year_of_birth > item}
                                                    disabled={props.parent.records[0].parent_year_of_birth + 20 > item}
                                                    value={item}>
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <p className="error">{errors && errors.parent_year_of_death}</p>
                                    </FormControl>
                                </Grid>

                                <Grid item sm={4} className="tableRow">
                                    <FormControl className="fwidth inputForm">
                                        <TextField
                                            onChange={props.addParentHandleForm}
                                            name="link"
                                            fullWidth
                                            value={props.parent.records[0].parent_link}
                                            placeholder="Link"
                                            helperText={errors && errors.parent_link}
                                            error={errors && errors.parent_link} />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        }
                    </DialogContent>

                    <DialogActions className="pr-2 pt-2 pb-2">
                        <Button
                            type="submit"
                            size="medium"
                            variant="outlined"
                            color="primary"
                            disabled={props.savingForm}
                            className="loginBtn">Save</Button>
                        <Button
                            size="medium"
                            variant="outlined"
                            color="primary"
                            className="loginBtn"
                            disabled={props.savingForm}
                            onClick={props.handleCancelParentDialog}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* add Spouse dialog */}

            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                open={props.addSpouseDialog}
                onClose={props.handleAddEditSpouse}
                aria-labelledby="max-width-dialog-title">
                <DialogTitle id="max-width-dialog-title" className="ModalHeading mb-1">
                    Add Spouse
                </DialogTitle>

                <form onSubmit={props.handleAddNewSpouse}>
                    <DialogContent>
                        {props.spouse &&
                            <Fragment>
                                <Grid container spacing={3} className="grow">
                                    <Grid item sm={4} className="tableRow">
                                        <FormControl className="fwidth inputForm">
                                            <TextField onChange={props.handleSpouseForm} name="spouse_first_name"
                                                fullWidth
                                                value={props.spouse.spouse_first_name}
                                                placeholder="First Name"
                                                error={errors && errors.spouse_first_name}
                                                helperText={errors && errors.spouse_first_name}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item sm={4} className="tableRow">
                                        <FormControl className="fwidth inputForm">
                                            <TextField onChange={props.handleSpouseForm} name="spouse_last_name"
                                                fullWidth
                                                value={props.spouse.spouse_last_name}
                                                placeholder="Last Name"
                                                error={errors && errors.spouse_last_name}
                                                helperText={errors && errors.spouse_last_name}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item sm={4} className="tableRow">
                                        <FormControl className="fwidth">
                                            <InputLabel id="birth-year">Birth Year</InputLabel>
                                            <Select
                                                onChange={props.handleSpouseForm}
                                                labelId="birth-year"
                                                value={props.spouse.spouse_birth_year}
                                                fullWidth
                                                name="spouse_birth_year">
                                                {years().map((item, index) => (
                                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                                ))}
                                            </Select>
                                            <p className="error">{errors && errors.spouse_birth_year}</p>
                                        </FormControl>
                                    </Grid>

                                    <Grid item sm={4} className="tableRow">
                                        <FormControl className="fwidth">
                                            <InputLabel id="marriage-year">Marriage Year</InputLabel>
                                            <Select
                                                onChange={props.handleSpouseForm}
                                                labelId="marriage-year"
                                                value={props.spouse.marriage_year}
                                                fullWidth
                                                name="marriage_year">
                                                {years().map((item, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        disabled={props.spouse.spouse_birth_year > item}
                                                        disabled={props.spouse.spouse_birth_year + 18 > item}
                                                        value={item}>{item}</MenuItem>
                                                ))}
                                            </Select>
                                            <p className="error">{errors && errors.marriage_year}</p>
                                        </FormControl>
                                    </Grid>

                                    <Grid item sm={4} className="tableRow">
                                        <FormControl className="fwidth">
                                            <InputLabel id="year-you-met">Year You Met</InputLabel>
                                            <Select
                                                onChange={props.handleSpouseForm}
                                                labelId="year-you-met"
                                                value={props.spouse.spouse_year_met}
                                                fullWidth
                                                name="spouse_year_met">
                                                {years().map((item, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        disabled={props.spouse.spouse_birth_year > item || item > props.spouse.marriage_year}
                                                        value={item}>{item}</MenuItem>
                                                ))}
                                            </Select>
                                            <p className="error">{errors && errors.spouse_year_met}</p>
                                        </FormControl>
                                    </Grid>

                                    <Grid item sm={4} className="tableRow">
                                        <FormControlLabel
                                            className="fwidth"
                                            control={
                                                <Checkbox
                                                    checked={props.spouse.still_married}
                                                    onChange={props.handleSpouseForm}
                                                    name="still_married" />
                                            }
                                            label="Still Married"
                                        />
                                    </Grid>
                                </Grid>

                                {!props.spouse.still_married ?
                                    <Grid container spacing={3} className="grow">
                                        <Fragment>
                                            <Grid item sm={12} className="tableRow mt-2">
                                                <FormControl component="fieldset" className="genderLabels w100">
                                                    <FormLabel component="legend">Reason for end of marriage</FormLabel>
                                                    <RadioGroup aria-label="gender" name="reason" value={props.spouse.reason} onChange={props.handleSpouseForm}>
                                                        <FormControlLabel value="divorce" control={<Radio />} label="Divorce" />
                                                        <FormControlLabel value="death" control={<Radio />} label="Death of partner" />
                                                    </RadioGroup>
                                                    <p className="error">{errors && errors.reason}</p>
                                                </FormControl>
                                            </Grid>

                                            {props.spouse.reason === "death" &&
                                                <Grid item sm={4} className="tableRow">
                                                    <FormControl className="fwidth">
                                                        <InputLabel id="year-spouse-died-1">Year Your Spouse Died</InputLabel>
                                                        <Select
                                                            onChange={props.handleSpouseForm}
                                                            labelId="year-spouse-died-1"
                                                            value={props.spouse.spouse_year_of_death}
                                                            fullWidth
                                                            name="spouse_year_of_death">
                                                            {years().map((item, index) => (
                                                                <MenuItem
                                                                    key={index}
                                                                    disabled={item < props.spouse.marriage_year}
                                                                    value={item}>{item}</MenuItem>
                                                            ))}
                                                        </Select>
                                                        <p className="error">{errors && errors.spouse_year_of_death}</p>
                                                    </FormControl>
                                                </Grid>
                                            }
                                        </Fragment>
                                    </Grid>
                                    : ""
                                }
                            </Fragment>
                        }
                    </DialogContent>

                    <DialogActions className="pr-2 pt-1 pb-2">
                        <Button
                            type="submit"
                            size="medium"
                            variant="outlined"
                            color="primary"
                            disabled={props.savingSpouse}
                            className="loginBtn">Save</Button>
                        <Button
                            size="medium"
                            variant="outlined"
                            color="primary"
                            className="loginBtn"
                            disabled={props.savingSpouse}
                            onClick={props.handleAddEditSpouse}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </div>
    )
}
