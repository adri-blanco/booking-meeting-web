import React, { useEffect } from 'react';
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
    background: '#dfdfdf',
    borderRadius: '5px',
    padding: '4px',
  },
};

const Book = ({ classes }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch.rooms.getRooms();
  }, []);
  const rooms = useSelector(state => state.rooms.rooms);
  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <BookHeader />
        <BookForm rooms={rooms} />
      </div>
    </div>
  );
};

Book.propTypes = {
  classes: PropTypes.object.isRequired,
};

Book.defaultProps = {};

export default withStyles(styles)(Book);
