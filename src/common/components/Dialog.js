import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';

const DialogActionComponent = (props) => {
    return (
        <Dialog
            fullWidth={true}
            maxWidth={'sm'}
            open={true}
            onClose={props.addParents}
            aria-labelledby="max-width-dialog-title">
            <DialogTitle id="max-width-dialog-title" className="ModalHeading mb-1">
                Delete
                </DialogTitle>
            <DialogContent>
                <p>Are you sure you want to delete this record? </p>
            </DialogContent>

            <DialogActions>
                <Button
                    size="medium"
                    variant="outlined"
                    color="primary"
                    className="loginBtn mt-2"
                    disabled={props.deleting}
                    onClick={props.handleConfirmDialog}>Yes</Button>
                <Button
                    size="medium"
                    variant="outlined"
                    color="primary"
                    className="loginBtn mt-2"
                    disabled={props.deleting}
                    onClick={props.hideActionDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogActionComponent;