import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DateFnsUtils from '@date-io/date-fns';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';

const useStyles = makeStyles({
  checkboxContainer: {
    marginBottom: '24px',
  },
  textLabel: {
    fontSize: '16px',
    color: '#67676c',
    width: '100%',
    marginTop: '0',
  },
  textInfoStyle: {
    margin: 0,

    fontSize: '12px',
    color: '#a9a8ab',
  },
  datepicker: {
    width: '100%',
  },
});

const HourPicker = ({
  label,
  disabled,
  className,
  error,
  showError,
  onChange,
  onBlur,
  onFocus,
  helperText,
  value,
}) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : null
  );
  const handleDateChange = date => {
    setSelectedDate(new Date(date).toISOString());
    onChange(new Date(date).toISOString());
  };
  return (
    <div className={classnames(classes.checkboxContainer, className)}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker
          variant='inline'
          ampm={false}
          inputVariant='outlined'
          format='HH:mm'
          margin='normal'
          label={label}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          value={selectedDate}
          onChange={handleDateChange}
          classes={{ root: classes.textLabel }}
        />
      </MuiPickersUtilsProvider>
      {!showError && helperText && (
        <FormHelperText classes={{ root: classes.textInfoStyle }}>
          {helperText}
        </FormHelperText>
      )}
      {showError && (
        <FormHelperText
          classes={{ root: classes.textInfoStyle }}
          error={showError}
        >
          {error}
        </FormHelperText>
      )}
    </div>
  );
};

HourPicker.propTypes = {
  label: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  showError: PropTypes.bool,
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

HourPicker.defaultProps = {
  label: '',
  disabled: false,
  className: '',
  error: undefined,
  showError: false,
  helperText: undefined,
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  value: undefined,
};

export default HourPicker;
