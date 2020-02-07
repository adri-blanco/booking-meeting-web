import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import BookForm from './BookForm';

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

const Book = ({ classes, onSubmit }) => {
  const dispatch = useDispatch();
  const rooms = useSelector(state => state.rooms.rooms);

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <h4 className={classes.text}>Book a room</h4>
        <BookForm
          rooms={rooms}
          onSubmit={async values => {
            await dispatch.rooms.bookRoom(values, onSubmit);
            await onSubmit();
          }}
        />
      </div>
    </div>
  );
};

Book.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

Book.defaultProps = {
  onSubmit: () => {},
};

export default withStyles(styles)(Book);
