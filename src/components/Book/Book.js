import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import BookHeader from './BookHeader';
import BookForm from './BookForm';

const styles = {
  container: {
    height: '100%',
    width: '40%',
    margin: '10px',
  },
  innerContainer: {
    background: '#efefef',
    borderRadius: '5px',
    padding: '24px',
  },
};

const Book = ({ classes }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch.rooms.getRooms();
  }, []);

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
    const response = await dispatch.rooms.bookRoom({
      authId: userId,
      startHour: dateIni,
      endHour: dateEnd,
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
        <BookHeader />
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
