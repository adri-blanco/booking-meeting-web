import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Book from '../components/Book/Book';
import RoomsAvailability from '../components/ListBookings/RoomsAvailability';
import MyBooking from '../components/MyBooking/MyBooking';
import SnackbarDefault from '../reusable-components/snackbar/SnackBarDefault';
import { getLastUserUsed } from '../utils/localStorage';

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
  const [actualBookingRoom, setActualBookingRoom] = useState(undefined);
  async function fetchData() {
    await dispatch.rooms.getRoomsAvailability({});
    setActualBookingRoom(
      await dispatch.rooms.getActualBooking({ user: getLastUserUsed() })
    );
  }

  useEffect(() => {
    fetchData();
    const timer = setInterval(() => {
      fetchData();
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.container}>
      <h2 className={classes.text}>Welcome to the Booking Meeting App</h2>
      <div className={classes.contentContainer}>
        <Book onSubmit={fetchData} />
        <Divider orientation='vertical' />
        <div className={classes.rightContainer}>
          <RoomsAvailability />
          <MyBooking room={actualBookingRoom} />
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
