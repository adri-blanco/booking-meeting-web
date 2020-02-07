import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { parseTime } from '../../utils/date';

const styles = {
  container: {
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: ({ availability }) => (availability ? 'green' : 'red'),
  },
};

function getTitleMessage(availability, owner, time, name) {
  if (!availability) {
    return `Room booked until ${parseTime(
      new Date(time)
    )} \n${owner} - ${name}`;
  }
  if (time) {
    return `Room available until ${parseTime(
      new Date(time)
    )} \n${owner} - ${name}`;
  }
  return `Room available`;
}

const AvailabilityMarker = ({ classes, availability, owner, time, name }) => {
  return (
    <div
      className={classes.container}
      title={getTitleMessage(availability, owner, time, name)}
    />
  );
};

AvailabilityMarker.propTypes = {
  classes: PropTypes.object.isRequired,
  availability: PropTypes.bool,
  owner: PropTypes.string,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  name: PropTypes.string,
};

AvailabilityMarker.defaultProps = {
  availability: false,
  owner: '',
  time: undefined,
  name: '',
};

export default withStyles(styles)(AvailabilityMarker);
