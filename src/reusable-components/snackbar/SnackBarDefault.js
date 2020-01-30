import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';

export default function SnackbarDefault() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const message = useSelector(state => state.snackbar.message);

  useEffect(() => {
    setOpen(message !== '');
  }, [message]);

  const handleClose = async (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    await dispatch.snackbar.openSnackbar({ message: '' });
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
    />
  );
}
