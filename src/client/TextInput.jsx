import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import FleurimondTheme from '../theme'; // Import the theme

// Size variants with width and height adjustments
const sizeStyles = {
  small: css`
    font-size: 12px;
    padding: 0.5rem;
    width: 150px;
    height: 30px;
  `,
  medium: css`
    font-size: 15px;
    padding: 0.75rem;
    width: 200px;
    height: 40px;
  `,
  large: css`
    font-size: 18px;
    padding: 1rem;
    width: 300px;
    height: 50px;
  `,
};

// Container for the input field
const Container = styled.div`
  position: relative;
  margin-bottom: 1.5rem;

  label {
    font-size: 14px;
    margin-bottom: 0.5rem;
    display: block;
    color: ${props =>
      props.error
        ? FleurimondTheme.colors.error
        : FleurimondTheme.colors.primaryText};
  }
`;

// Styled input field with dynamic size
const InputField = styled.input`
  color: ${FleurimondTheme.colors.primaryText};
  box-sizing: border-box;
  letter-spacing: 1px;
  border: 1px solid
    ${props => (props.error ? FleurimondTheme.colors.error : '#ccc')};
  border-radius: 4px;
  transition: border-color 0.3s ease;
  ${props => sizeStyles[props.size] || sizeStyles.medium}

  &:focus {
    outline: none;
    border-color: ${FleurimondTheme.colors.primaryText};
  }
`;

// Error message styling
const ErrorText = styled.div`
  color: ${FleurimondTheme.colors.error};
  font-size: 12px;
  position: absolute;
  bottom: -1.5rem;
  left: 0;
  width: 100%;
  height: 1.5rem;
  line-height: 1.5rem;
  overflow: hidden;
`;

const TextInput = ({
  title = '',
  name,
  value,
  onChange,
  onBlur,
  error = '',
  required = false,
  size = 'medium',
  type = 'text', // Default type is 'text'
  ...rest
}) => (
  <Container error={error}>
    {title && (
      <label htmlFor={name}>
        {title} {required && '*'}
      </label>
    )}
    <InputField
      type={type} // Set the input type
      name={name}
      placeholder={title || 'Placeholder Text'}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      required={required}
      size={size}
      {...rest}
    />
    {error && <ErrorText>{error}</ErrorText>}
  </Container>
);

TextInput.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.string, // Add type prop
};

export default TextInput;
