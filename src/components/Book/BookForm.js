/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { withStyles } from '@material-ui/core/styles';
import DatePickerFieldDefault from '../../reusable-components/form/DatePickerFieldDefault';
import HourPickerFieldDefault from '../../reusable-components/form/HourPickerFieldDefault';
import SelectFieldDefault from '../../reusable-components/form/SelectFieldDefault';
import TextInputFieldDefault from '../../reusable-components/form/TextInputFieldDefault';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
  },
  select: {
    textIndent: '8px',
    fontSize: '16px',
  },
  label: {
    marginTop: '8px',
    marginBottom: '2px',
    marginLeft: '4px',
  },
  button: {
    fontSize: '16px',
    padding: '8px 16px',
    cursor: 'pointer',
  },
  buttons: {
    width: '100%',
    marginTop: '16px',
    marginBottom: '8px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
};

function parseRooms(rooms) {
  return rooms.map(room => ({
    value: room.id.toString(),
    text: `${room.name} (${room.floor})`,
  }));
}

function getDefaultDate(type) {
  const date = new Date();
  switch (type) {
    case 'start':
      return date;
    case 'end':
      return new Date(date.getTime() + 15 * 60 * 1000);
    default:
      return date;
  }
}

const BookForm = ({ onSubmit, rooms, classes }) => {
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        name: 'Meeting name',
        date: getDefaultDate(),
        startHour: getDefaultDate('start'),
        endHour: getDefaultDate('end'),
      }}
      render={({ handleSubmit, form, submitting, pristine }) => (
        <form onSubmit={handleSubmit} className={classes.container}>
          <div className={classes.field}>
            <TextInputFieldDefault
              name='userId'
              label='User ID'
              placeholder='User ID'
            />
          </div>
          <div className={classes.field}>
            <TextInputFieldDefault
              name='name'
              label='Meeting Name'
              placeholder='Meeting Name'
            />
          </div>
          <div className={classes.field}>
            <SelectFieldDefault
              name='room'
              label='room'
              text='room'
              options={parseRooms(rooms)}
              required
            />
          </div>
          <div className={classes.field}>
            <DatePickerFieldDefault
              name='date'
              label='date'
              className={classes.selectField}
            />
          </div>
          <div className={classes.field}>
            <HourPickerFieldDefault
              name='startHour'
              label='startHour'
              className={classes.selectField}
            />
          </div>
          <div className={classes.field}>
            <HourPickerFieldDefault
              name='endHour'
              label='endHour'
              className={classes.selectField}
            />
          </div>
          <div className={classes.buttons}>
            <button
              type='submit'
              disabled={submitting || pristine}
              className={classes.button}
            >
              Book
            </button>
            <button
              type='button'
              onClick={form.reset}
              disabled={submitting || pristine}
              className={classes.button}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    />
  );
};

BookForm.propTypes = {
  classes: PropTypes.object.isRequired,
  rooms: PropTypes.array.isRequired,
  onSubmit: PropTypes.func,
};

BookForm.defaultProps = {
  onSubmit: () => {},
};

export default withStyles(styles)(BookForm);
