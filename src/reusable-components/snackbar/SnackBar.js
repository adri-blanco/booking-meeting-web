import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Snackbar as MaterialSnackbar,
  SnackbarContent,
} from '@material-ui/core';

function getColorByType(type) {
  switch (type) {
    case 'normal':
      return 'black';
    case 'alert':
      return 'orange';
    case 'danger':
      return 'crimson';
    default:
      return 'black';
  }
}

export default function Snackbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const snackbar = useSelector(state => state.snackbar);

  useEffect(() => {
    setOpen(snackbar.message !== '');
  }, [snackbar.message]);

  const handleClose = async (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    await dispatch.snackbar.openSnackbar({ message: '' });
    setOpen(false);
  };

  return (
    <MaterialSnackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <SnackbarContent
        style={{
          backgroundColor: getColorByType(snackbar.type),
        }}
        message={snackbar.message}
      />
    </MaterialSnackbar>
  );
}
