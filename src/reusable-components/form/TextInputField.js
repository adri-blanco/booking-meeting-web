import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import TextField from './TextInput';

const TextInputField = ({
  disabled,
  placeholder,
  label,
  name,
  required,
  helperText,
  hide,
  errorOnLive,
  minLength,
  maxLength,
}) => {
  function validate(text) {
    if (required && (!text || text === '')) {
      return 'Required';
    }
    if (text && minLength && text.length < minLength) {
      return `Need at least ${minLength} characters`;
    }
    if (text && maxLength && text.length > maxLength) {
      return `Need as much ${maxLength} characters`;
    }
    return null;
  }
  return (
    <Field
      name={name}
      render={({ input, meta }) => {
        return (
          <TextField
            name={input.name}
            onChange={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            value={input.value}
            label={label}
            disabled={disabled}
            showError={
              meta.touched &&
              meta.error !== undefined &&
              (errorOnLive || meta.submitFailed)
            }
            placeholder={placeholder}
            error={meta.error}
            helperText={helperText}
            hide={hide}
          />
        );
      }}
      validate={!disabled ? validate : undefined}
    />
  );
};

TextInputField.propTypes = {
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  helperText: PropTypes.string,
  hide: PropTypes.bool,
  errorOnLive: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
};

TextInputField.defaultProps = {
  disabled: false,
  placeholder: '',
  label: '',
  required: false,
  helperText: undefined,
  hide: false,
  errorOnLive: false,
  minLength: undefined,
  maxLength: undefined,
};

export default TextInputField;
