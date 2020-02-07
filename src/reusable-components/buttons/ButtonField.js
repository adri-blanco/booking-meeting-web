import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Button } from '@material-ui/core';

function ButtonField({
  children,
  variant,
  className,
  startIcon,
  endIcon,
  disabled,
  loading,
  color,
  onClick,
  type,
}) {
  return (
    <Button
      className={className}
      variant={variant}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      size='small'
      color={color}
      onClick={onClick}
      type={type}
    >
      {loading ? <CircularProgress size='24px' /> : children}
    </Button>
  );
}

ButtonField.propTypes = {
  variant: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  color: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

ButtonField.defaultProps = {
  variant: 'default',
  className: '',
  children: undefined,
  startIcon: undefined,
  endIcon: undefined,
  disabled: false,
  loading: false,
  color: undefined,
  type: undefined,
  onClick: () => {},
};

export default ButtonField;
