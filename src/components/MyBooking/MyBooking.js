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

function getActualBooking(room) {
  const now = new Date();
  if (room) {
    return room.meetings.filter(booking => {
      return (
        new Date(booking.startTime) <= now && new Date(booking.endTime) > now
      );
    });
  }
  return {};
}
const MyBooking = ({ classes, room }) => {
  const actualBooking = getActualBooking(room);
  return (
    <div className={classes.container}>
      {room ? (
        <>
          <h4 className={classes.textHeader}>My current Booking</h4>
          <h3 className={classes.textHeader}>
            {`${room.name} - ${room.floor}`}
          </h3>
          {<MyBookProgress booking={actualBooking[0]} />}
        </>
      ) : (
        <div className={classes.textHeader}>
          There are no bookings available now
        </div>
      )}
    </div>
  );
};

MyBooking.propTypes = {
  classes: PropTypes.object.isRequired,
  room: PropTypes.object,
};

MyBooking.defaultProps = {
  room: undefined,
};

export default withStyles(styles)(MyBooking);
