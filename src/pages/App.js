import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import Book from '../components/Book/Book';
import RoomsAvailability from '../components/RoomsAvailability';
import store from '../state/store';

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    margin: '10px',
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
};

const App = ({ classes }) => (
  <Provider store={store}>
    <div className={classes.container}>
      <span>Booking Meeting Front</span>
      <div className={classes.contentContainer}>
        <Book />
        <RoomsAvailability />
      </div>
    </div>
  </Provider>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

App.defaultProps = {};

export default withStyles(styles)(App);
