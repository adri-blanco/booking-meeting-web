import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { useSelector } from 'react-redux';
import { dispatch } from '../state/store';

const styles = {
  container: {
    height: '100%',
    width: '60%',
    margin: '10px',
    display: 'flex',
    flexFlow: 'column',
  },
};

const RoomsAvailability = ({ classes }) => {
  useEffect(() => {
    dispatch.rooms.getRooms();
  });
  const rooms = useSelector(state => state.rooms.rooms);
  return (
    <div className={classes.container}>
      <span>Rooms Availability</span>
      {rooms.map(room => (
        <span key={room.id}>{room.name}</span>
      ))}
    </div>
  );
};

RoomsAvailability.propTypes = {
  classes: PropTypes.object.isRequired,
};

RoomsAvailability.defaultProps = {};

export default withStyles(styles)(RoomsAvailability);
