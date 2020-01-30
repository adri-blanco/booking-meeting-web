import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import BookForm from './BookForm';
import { setLastUserUsed } from '../../utils/localStorage';

const styles = {
  container: {
    height: '100%',
    width: '40%',
    margin: '16px',
  },
  innerContainer: {
    background: '#ffffff',
    padding: '8px',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: '24px',
    marginTop: '16px',
    marginBottom: '16px',
  },
};

const Book = ({ classes }) => {
  const dispatch = useDispatch();

  const onSubmit = useCallback(async values => {
    const { name, date, startHour, endHour, room, userId } = values;
    const dateIni = new Date(date);
    const startHourDate = new Date(startHour);
    const dateEnd = new Date(date);
    const endHourDate = new Date(endHour);
    dateIni.setHours(
      startHourDate.getHours(),
      startHourDate.getMinutes(),
      0,
      0
    );
    dateEnd.setHours(endHourDate.getHours(), endHourDate.getMinutes(), 0, 0);
    setLastUserUsed(userId);
    const response = await dispatch.rooms.bookRoom({
      authId: userId,
      startHour: dateIni.toISOString(),
      endHour: dateEnd.toISOString(),
      roomId: room,
      authName: userId,
      eventName: name,
    });
    return response;
  });

  const rooms = useSelector(state => state.rooms.rooms);

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <h4 className={classes.text}>Book a room</h4>
        <BookForm rooms={rooms} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

Book.propTypes = {
  classes: PropTypes.object.isRequired,
};

Book.defaultProps = {};

export default withStyles(styles)(Book);
