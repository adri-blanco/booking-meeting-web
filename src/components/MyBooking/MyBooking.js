import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MyBookProgress from './MyBookProgress';

const styles = {
  container: {
    margin: '16px',
    marginTop: '24px',
  },
  textHeader: {
    textAlign: 'center',
  },
};

function getCurrentBooking(room) {
  const now = new Date();
  if (room) {
    return room.meetings.filter(
      booking => new Date(booking.startTime) <= now && new Date(booking.endTime) > now
    )[0];
  }
  return {};
}
const MyBooking = ({ classes, room, onUpdate }) => {
  const currentBooking = getCurrentBooking(room);
  return (
    <div className={classes.container}>
      <h4 className={classes.textHeader}>My current Booking</h4>
      <h4 className={classes.textHeader}>{currentBooking.name}</h4>
      <div className={classes.textHeader}>
        <span>{`${room.name} - ${room.floor}`}</span>
      </div>
      <MyBookProgress
        booking={currentBooking}
        roomId={room.id}
        onUpdate={onUpdate}
      />
    </div>
  );
};

MyBooking.propTypes = {
  classes: PropTypes.object.isRequired,
  room: PropTypes.object,
  onUpdate: PropTypes.func,
};

MyBooking.defaultProps = {
  room: undefined,
  onUpdate: () => {},
};

export default withStyles(styles)(MyBooking);
