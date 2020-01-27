import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: '24px',
    marginTop: '16px',
    marginBottom: '16px',
  },
};

const BookHeader = ({ classes }) => (
  <h4 className={classes.text}>Book a room</h4>
);

BookHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

BookHeader.defaultProps = {};

export default withStyles(styles)(BookHeader);
