import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';

const styles = {
  container: {
    height: '100%',
    width: '40%',
    margin: '10px',
  },
};

const Book = ({ classes }) => (
  <div className={classes.container}>
    <span>Book</span>
  </div>
);

Book.propTypes = {
  classes: PropTypes.object.isRequired,
};

Book.defaultProps = {};

export default withStyles(styles)(Book);
