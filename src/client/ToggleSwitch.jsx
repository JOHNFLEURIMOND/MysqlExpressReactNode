import React from 'react';
import styled from 'styled-components';
import FleurimondTheme from '../theme'; // Import the theme

// Styled components
const Container = styled.div`
  float: left;
  width: 27.33%;
  margin: 40px 3%;
  position: relative;
`;

const InputField = styled.input.attrs(props => ({
  type: 'text',
}))`
  font:
    15px/24px 'Lato',
    Arial,
    sans-serif;
  color: ${FleurimondTheme.colors
    .primaryText}; // High contrast text color for readability
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;
  border: 1px solid
    ${props => (props.$error ? FleurimondTheme.colors.error : '#ccc')}; // Error border color
  padding: 7px 14px 9px;
  transition: 0.4s;

  &:focus {
    outline: none;
  }
`;

const FocusBorder = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 2px;
  background-color: ${FleurimondTheme.colors.darkReds
    .crimson}; // Crimson for focus border
  transition: 0.2s;
  transition-delay: 0.2s;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 2px;
    height: 0;
    background-color: ${FleurimondTheme.colors.darkReds
      .crimson}; // Crimson for focus border
    transition: 0.2s;
  }

  &::before {
    left: 0;
    transition-delay: 0.2s;
  }

  &::after {
    right: 0;
    top: auto;
    bottom: 0;
    transition-delay: 0.6s;
  }
`;

const InputWrapper = styled.div`
  position: relative;

  ${InputField}:focus ~ ${FocusBorder}::before,
  ${InputField}:focus ~ ${FocusBorder}::after {
    width: 100%;
    transition: 0.2s;
  }

  ${InputField}:focus ~ ${FocusBorder}::after {
    transition-delay: 0.2s;
  }
`;

const ErrorText = styled.div`
  color: ${FleurimondTheme.colors.error}; // Error color
  font-size: 12px;
  margin-top: 4px;
`;

// React functional component
const StyledInput = ({
  title,
  name,
  value,
  onChange,
  onBlur,
  error,
  required,
}) => {
  return (
    <Container>
      <InputWrapper>
        <InputField
          name={name}
          placeholder={title || 'Placeholder Text'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          $error={error} // Use transient prop
          required={required}
        />
        <FocusBorder />
      </InputWrapper>
      {error && <ErrorText>{error}</ErrorText>} {/* Display error message */}
    </Container>
  );
};

export default StyledInput;
