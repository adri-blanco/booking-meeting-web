import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  textFieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '28px',
  },
  textInput: {
    fontSize: '16px',
  },
  textLabel: {
    fontSize: '12px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spanLabel: {
    flex: 1,
  },
});

const TextInput = ({
  label,
  value,
  disabled,
  className,
  placeholder,
  error,
  showError,
  onChange,
  onBlur,
  onFocus,
  hide,
  helperText,
}) => {
  const classes = useStyles();
  const [inValue, setInValue] = useState(value);
  function handleChange(e) {
    setInValue(e.target.value);
    onChange(e);
  }
  useEffect(() => {
    setInValue(value);
  }, [value]);
  return (
    <div className={classnames(classes.textFieldContainer, className)}>
      <TextField
        classes={{ root: classes.textInput }}
        value={inValue}
        label={label}
        variant='outlined'
        disabled={disabled}
        placeholder={placeholder}
        error={showError}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        type={hide ? 'password' : 'text'}
      />
      {!showError && helperText && (
        <FormHelperText classes={{ root: classes.textLabel }}>
          {helperText}
        </FormHelperText>
      )}
      {showError && (
        <FormHelperText classes={{ root: classes.textLabel }} error={showError}>
          <span className={classes.spanLabel}>{error}</span>
        </FormHelperText>
      )}
    </div>
  );
};

TextInput.propTypes = {
  value: PropTypes.string,
  label: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  hide: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  showError: PropTypes.bool,
  helperText: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

TextInput.defaultProps = {
  value: '',
  label: '',
  disabled: false,
  className: '',
  hide: false,
  placeholder: '',
  error: undefined,
  showError: false,
  helperText: undefined,
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
};

export default TextInput;
