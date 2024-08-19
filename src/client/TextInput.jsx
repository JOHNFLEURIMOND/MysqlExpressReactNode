// StyledInput.jsx

import React from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  float: left;
  width: 27.33%;
  margin: 40px 3%;
  position: relative;
`;

const InputField = styled.input`
  font:
    15px/24px 'Lato',
    Arial,
    sans-serif;
  color: #333;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;
  border: 1px solid #ccc;
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
  background-color: #3399ff;
  transition: 0.2s;
  transition-delay: 0.2s;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 2px;
    height: 0;
    background-color: #3399ff;
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

// React functional component
const StyledInput = () => {
  return (
    <Container>
      <InputWrapper>
        <InputField
          className='effect-9'
          type='text'
          placeholder='Placeholder Text'
        />
        <FocusBorder>
          <i></i>
        </FocusBorder>
      </InputWrapper>
    </Container>
  );
};

export default StyledInput;
