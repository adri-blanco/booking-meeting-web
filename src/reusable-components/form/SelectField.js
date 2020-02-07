import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import Select from './Select';

const SelectField = ({
  disabled,
  label,
  name,
  required,
  helperText,
  hide,
  options,
  className,
}) => {
  function validate(text) {
    if (required && (!text || text === '')) {
      return 'required';
    }
    return null;
  }

  return (
    <Field
      name={name}
      render={({ input, meta }) => (
        <Select
          onChange={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          value={input.value}
          label={label}
          disabled={disabled}
          showError={meta.touched && meta.error !== undefined}
          error={meta.error}
          helperText={helperText}
          hide={hide}
          options={options}
          className={className}
        />
      )}
      validate={!disabled ? validate : undefined}
    />
  );
};

SelectField.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  helperText: PropTypes.string,
  hide: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
};

SelectField.defaultProps = {
  disabled: false,
  label: '',
  required: false,
  helperText: undefined,
  hide: false,
  options: [],
  className: '',
};

export default SelectField;
