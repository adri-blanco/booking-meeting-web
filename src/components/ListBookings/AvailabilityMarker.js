import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { parseTime } from '../../utils/date';

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
  },
};

const AvailabilityMarker = ({ classes, availability, owner, time }) => {
  return (
    <div
      className={classNames(
        classes.container,
        { [classes.available]: availability },
        { [classes.unavailable]: !availability }
      )}
      title={
        !availability
          ? `Room booked by ${owner} until ${parseTime(new Date(time))}`
          : `Room available ${time ? `until ${parseTime(new Date(time))}` : ''}`
      }
    />
  );
};

AvailabilityMarker.propTypes = {
  classes: PropTypes.object.isRequired,
  availability: PropTypes.bool,
  owner: PropTypes.string,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

AvailabilityMarker.defaultProps = {
  availability: false,
  owner: undefined,
  time: undefined,
};

export default withStyles(styles)(AvailabilityMarker);
