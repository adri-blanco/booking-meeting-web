import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Book from '../components/Book/Book';
import RoomsAvailability from '../components/ListBookings/RoomsAvailability';
import MyBooking from '../components/MyBooking/MyBooking';
import store from '../state/store';

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

const App = ({ classes }) => (
  <Provider store={store}>
    <div className={classes.container}>
      <h2 className={classes.text}>Welcome to the Booking Meeting App</h2>
      <div className={classes.contentContainer}>
        <Book />
        <Divider orientation='vertical' />
        <div className={classes.rightContainer}>
          <RoomsAvailability />
          <MyBooking
            room={{
              id: 118428,
              name: 'Tetris',
              floor: '4th Floor',
            }}
            startDate={new Date(new Date().getTime() - 5 * 60 * 1000)}
            endDate={new Date(new Date().getTime() + 10 * 60 * 1000)}
          />
        </div>
      </div>
    </div>
  </Provider>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

App.defaultProps = {};

export default withStyles(styles)(App);
