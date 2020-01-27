import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    borderRadius: '10px',
    padding: '10px',
  },
  available: {
    backgroundColor: 'green',
  },
  unavailable: {
    backgroundColor: 'red',
  }
};

const AvailabilityMarker = ({ classes, availability }) => (
  <div className={classNames(classes.container, { [classes.available]: availability }, { [classes.unavailable]: !availability })} title='Availability' />
);

AvailabilityMarker.propTypes = {
  classes: PropTypes.object.isRequired,
  availability: PropTypes.bool,
};

AvailabilityMarker.defaultProps = {
  availability: false,
};

export default withStyles(styles)(AvailabilityMarker);
