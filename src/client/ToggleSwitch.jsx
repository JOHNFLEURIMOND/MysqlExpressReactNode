// ToggleSwitch.jsx

import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import GlobalStyle from './globalstyles'; // Import the global styles
import FleurimondTheme from './theme'; // Import the theme

// Define the ToggleSwitch styles
const Container = styled.div`
  position: relative;
  width: calc(var(--sz) * 4);
  height: calc(var(--sz) * 2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const Label = styled.label`
  position: absolute;
  width: calc(var(--sz) * 4);
  height: calc(var(--sz) * 2);
  background: #fff;
  border-radius: var(--sz);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 calc(var(--sz) * 0.5) 0 rgba(0, 0, 0, 0.25);
  pointer-events: none;
  transition: all 0.5s ease;

  &:before,
  &:after {
    content: '';
    position: absolute;
    border-radius: 100%;
    background-color: #fff;
    mix-blend-mode: difference;
  }

  &:before {
    width: calc(var(--sz) * 0.5);
    height: calc(var(--sz) * 0.5);
    left: calc(var(--sz) * 0.75);
    z-index: 3;
  }

  &:after {
    border-radius: var(--sz);
    width: calc(var(--sz) * 0.25);
    height: calc(var(--sz) * 0.75);
    left: calc(var(--sz) * 2.85);
  }
`;

const Thumb = styled.span`
  position: absolute;
  height: calc(calc(var(--sz) * 2) - calc(var(--sz) / 8));
  top: calc(calc(var(--sz) / 10) + calc(var(--sz) / -25));
  background: #111;
  border-radius: var(--sz);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  z-index: 1;
  overflow: hidden;
  padding: calc(var(--sz) * 0.65);
  animation: ${props => (props.checked ? 'go-right' : 'go-left')} var(--sp) ease
    0s;
  width: calc(var(--sz) * 1.875);
  right: ${props =>
    props.checked ? 'calc(var(--sz) * 0.075)' : 'calc(var(--sz) * 2.05)'};
  pointer-events: all;
  transition: all 0.5s ease;
`;

// Define keyframes for animations
const keyframes = `
  @keyframes go-left {
    0% {
      width: calc(var(--sz) * 1.875);
      right: calc(var(--sz) * 0.075);
    }
    40%, 60% {
      width: calc(var(--sz) * 3.85);
      right: calc(var(--sz) * 0.075);
    }
    100% {
      width: calc(var(--sz) * 1.875);
      right: calc(var(--sz) * 2.05);
    }
  }

  @keyframes go-right {
    0% {
      width: calc(var(--sz) * 1.875);
      right: calc(var(--sz) * 2.05);
    }
    40%, 60% {
      width: calc(var(--sz) * 3.85);
      right: calc(var(--sz) * 0.075);
    }
    100% {
      width: calc(var(--sz) * 1.875);
      right: calc(var(--sz) * 0.075);
    }
  }
`;

// Create a GlobalStyle component for keyframes
const KeyframesStyle = createGlobalStyle`
  ${keyframes}
`;

const ToggleSwitch = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <>
      <GlobalStyle /> {/* Apply global styles */}
      <KeyframesStyle /> {/* Apply keyframes */}
      <Container>
        <HiddenInput id='btn' checked={checked} onChange={handleChange} />
        <Label htmlFor='btn'>
          <Thumb checked={checked} />
        </Label>
      </Container>
    </>
  );
};

export default ToggleSwitch;
