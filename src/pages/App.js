import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Book from '../components/Book/Book';
import RoomsAvailability from '../components/ListBookings/RoomsAvailability';
import MyBooking from '../components/MyBooking/MyBooking';
import SnackbarDefault from '../reusable-components/snackbar/SnackBarDefault';

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    // background: '#f7ddc6',
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  rightContainer: {
    width: '60%',
    marginLeft: '16px',
    marginRight: '24px',
  },
  text: {
    textAlign: 'center',
  },
};

const App = ({ classes }) => {
  const dispatch = useDispatch();
  const [actualBooking, setActualBooking] = useState(undefined);
  async function fetchData() {
    setActualBooking(
      await dispatch.rooms.getActualBooking({ user: 'adrian.lopez.fouz' })
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={classes.container}>
      <h2 className={classes.text}>Welcome to the Booking Meeting App</h2>
      <div className={classes.contentContainer}>
        <Book />
        <Divider orientation='vertical' />
        <div className={classes.rightContainer}>
          <RoomsAvailability />
          <MyBooking room={actualBooking} />
        </div>
      </div>
      <SnackbarDefault />
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

App.defaultProps = {};

export default withStyles(styles)(App);
