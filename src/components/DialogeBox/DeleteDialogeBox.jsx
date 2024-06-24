import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function DeleteDialogeBox({ open, deleteCancelClick, deleteOkClick }) {


  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Alert Message?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are You Sure
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteCancelClick}>Cancel</Button>
        <Button onClick={deleteOkClick}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}