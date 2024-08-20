// src/client/TextInput.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import FleurimondTheme from '../theme'; // Import the theme

// Size variants with width and height adjustments
const sizeStyles = {
  small: css`
    font-size: 12px;
    padding: 0.5rem;
    width: 150px; // Example width for small size
    height: 30px; // Example height for small size
  `,
  medium: css`
    font-size: 15px;
    padding: 0.75rem;
    width: 200px; // Example width for medium size
    height: 40px; // Example height for medium size
  `,
  large: css`
    font-size: 18px;
    padding: 1rem;
    width: 300px; // Example width for large size
    height: 50px; // Example height for large size
  `,
};

// Container for the input field
const Container = styled.div`
  position: relative;
  margin-bottom: 1.5rem; // Adjusted margin for spacing

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
  border-radius: 4px; // Added border-radius for better appearance
  transition: border-color 0.3s ease; // Smooth transition for border color
  ${props => sizeStyles[props.size] || sizeStyles.medium} // Apply size styles

  &:focus {
    outline: none;
    border-color: ${FleurimondTheme.colors.primaryText};
  }
`;

// Focus border effect
const FocusBorder = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 2px;
  background-color: ${FleurimondTheme.colors.darkReds.crimson};
  transition:
    width 0.2s ease,
    transition-delay 0.2s ease;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 2px;
    height: 0;
    background-color: ${FleurimondTheme.colors.darkReds.crimson};
    transition: height 0.2s ease;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
    bottom: 0;
    height: 2px;
  }
`;

// Wrapper for input and focus border
const InputWrapper = styled.div`
  position: relative;

  ${InputField}:focus ~ ${FocusBorder} {
    width: 100%;
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
  height: 1.5rem; // Fixed height to avoid layout shifting
  line-height: 1.5rem; // Vertically center text
  overflow: hidden;
`;

const TextInput = ({
  title,
  name,
  value,
  onChange,
  onBlur,
  error,
  required,
  size,
}) => (
  <Container error={error}>
    {title && (
      <label htmlFor={name}>
        {title} {required && '*'}
      </label>
    )}
    <InputWrapper>
      <InputField
        type='text'
        name={name}
        placeholder={title || 'Placeholder Text'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        required={required}
        size={size} // Pass size prop
      />
      <FocusBorder />
    </InputWrapper>
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
};

TextInput.defaultProps = {
  title: '',
  error: '',
  required: false,
  size: 'medium',
};

export default TextInput;
