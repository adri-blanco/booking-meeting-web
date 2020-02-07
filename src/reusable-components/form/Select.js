import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Select as MaterialSelect, MenuItem } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  textFieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '28px',
  },
  selectInput: {
    fontSize: '16px',
  },
  textLabel: {
    fontSize: '12px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: '14px',
    color: '#a9a8ab',
  },
  spanLabel: {
    flex: 1,
  },
  icon: {
    width: '24px',
    height: '24px',
    marginRight: '12px',
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    verticalAlign: 'center',
  },
});

const Select = ({
  label,
  value,
  disabled,
  className,
  error,
  showError,
  onChange,
  onBlur,
  onFocus,
  helperText,
  options,
}) => {
  const classes = useStyles();
  const [selectValue, setSelectValue] = useState(value);
  function handleChange(event) {
    setSelectValue(event.target.value);
    onChange(event);
  }
  useEffect(() => {
    setSelectValue(value);
  }, [value]);
  return (
    <div className={classnames(classes.textFieldContainer, className)}>
      <InputLabel classes={{ root: classes.textLabel }} error={showError}>
        {label}
      </InputLabel>

      <MaterialSelect
        classes={{ root: classes.selectInput }}
        value={selectValue}
        onChange={handleChange}
        disabled={disabled}
        variant='outlined'
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            <div className={classes.optionContainer}>
              {option.icon && (
                <img src={option.icon} alt='icon' className={classes.icon} />
              )}
              <span>{option.text || option.value}</span>
            </div>
          </MenuItem>
        ))}
      </MaterialSelect>
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

Select.propTypes = {
  value: PropTypes.string,
  label: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  showError: PropTypes.bool,
  helperText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

Select.defaultProps = {
  value: '',
  label: '',
  disabled: false,
  className: '',
  error: undefined,
  showError: false,
  helperText: undefined,
  options: [],
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
};

export default Select;
