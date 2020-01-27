import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {},
  text: {
    color: 'black',
    textAlign: 'center',
  },
  separator: {
    background: '#cdcdcd',
    height: '2px',
    margin: '4px',
  },
};

const BookHeader = ({ classes }) => (
  <div className={classes.container}>
    <h4 className={classes.text}>Book a room</h4>
    <div className={classes.separator} />
  </div>
);

BookHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

BookHeader.defaultProps = {};

export default withStyles(styles)(BookHeader);
