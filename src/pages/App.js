import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Book from '../components/Book/Book';
import RoomsAvailability from '../components/ListBookings/RoomsAvailability';
import MyBooking from '../components/MyBooking/MyBooking';
import Snackbar from '../reusable-components/snackbar/SnackBar';
import { getLastUserUsed } from '../utils/localStorage';

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
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
  errorTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '30px',
  },
  errorSpan: {
    textAlign: 'center',
    fontSize: '20px',
  },
};

const App = ({ classes }) => {
  const dispatch = useDispatch();
  const [currentBookingRoom, setCurrentBookingRoom] = useState(undefined);
  async function fetchData() {
    try {
      await dispatch.rooms.setRoomsAvailability({});
      if (getLastUserUsed()) {
        setCurrentBookingRoom(
          await dispatch.rooms.getCurrentBooking({ user: getLastUserUsed() })
        );
      }
    } catch (error) {
      if (
        error.data.extra &&
        error.data.extra.ERROR_CODE === 'BACKEND_CONNECTION'
      ) {
        const ERROR =
          process.env.REACT_APP_GENERAL_ERROR_MESSAGE ||
          'Error happened trying to connect with the backend.';
        dispatch.global.setGeneralError(ERROR);
      }
      await dispatch.snackbar.openSnackbar({
        message: error.data.message,
        type: 'danger',
      });
    }
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

  const generalError = useSelector(state => state.global.generalError);
  if (generalError) {
    return (
      <div className={classes.container}>
        <span className={classes.errorTitle}>Error connecting with the middleware</span>
        <span className={classes.errorSpan}>{generalError}</span>
      </div>
    )
  }

  return (
    <div className={classes.container}>
      <h2 className={classes.text}>Welcome to the Booking Meeting App</h2>
      <div className={classes.contentContainer}>
        <Book onSubmit={fetchData} />
        <Divider orientation='vertical' />
        <div className={classes.rightContainer}>
          <RoomsAvailability />
          {currentBookingRoom && (
            <MyBooking room={currentBookingRoom} onUpdate={fetchData} />
          )}
        </div>
      </div>
      <Snackbar />
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

App.defaultProps = {};

export default withStyles(styles)(App);
