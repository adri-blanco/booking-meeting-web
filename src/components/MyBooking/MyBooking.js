import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MyBookProgress from './MyBookProgress';

const styles = {
  container: {
    borderRadius: '10px',
    padding: '10px',
  },
  textHeader: {
    textAlign: 'center',
  },
};

const MyBooking = ({ classes, room, startDate, endDate }) => (
  <div className={classes.container}>
    {room ? (
      <>
        <h4 className={classes.textHeader}>My actual Booking</h4>
        <h3 className={classes.textHeader}>{`${room.name} - ${room.floor}`}</h3>
        <MyBookProgress room={room} startDate={startDate} endDate={endDate} />
      </>
    ) : (
      <div className={classes.textHeader}>
        There are no bookings available now
      </div>
    )}
  </div>
);

MyBooking.propTypes = {
  classes: PropTypes.object.isRequired,
  room: PropTypes.object,
  startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

MyBooking.defaultProps = {
  room: undefined,
  startDate: undefined,
  endDate: undefined,
};

export default withStyles(styles)(MyBooking);
