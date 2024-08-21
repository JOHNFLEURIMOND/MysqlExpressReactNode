// src/client/Button.jsx
import React from 'react';
import styled, { css } from 'styled-components';
import theme from '../theme'; // Adjust path if needed

const baseButtonStyles = css`
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  display: inline-block;
  font-family: 'Arial', sans-serif;
  letter-spacing: 0.02em;
  line-height: 1;
  padding: 8px 16px;
  text-align: center;
  box-sizing: border-box;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;

  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
  }

  &:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
`;

const buttonVariants = {
  primary: css`
    color: ${theme.colors.button.primary.color};
    background-color: ${theme.colors.button.primary.backgroundColor};
    border-color: ${theme.colors.button.primary.borderColor};

    &:hover {
      background-color: ${theme.colors.button.primary.hover.backgroundColor};
      border-color: ${theme.colors.button.primary.hover.borderColor};
      color: ${theme.colors.button.primary.hover.color};
    }

    &:disabled {
      background-color: ${theme.colors.button.primary.disabled.backgroundColor};
      border-color: ${theme.colors.button.primary.disabled.borderColor};
      color: ${theme.colors.button.primary.disabled.color};
    }
  `,
  secondary: css`
    color: ${theme.colors.button.secondary.color};
    background-color: ${theme.colors.button.secondary.backgroundColor};
    border-color: ${theme.colors.button.secondary.borderColor};

    &:hover {
      background-color: ${theme.colors.button.secondary.hover.backgroundColor};
      border-color: ${theme.colors.button.secondary.hover.borderColor};
      color: ${theme.colors.button.secondary.hover.color};
    }

    &:disabled {
      background-color: ${theme.colors.button.secondary.disabled
        .backgroundColor};
      border-color: ${theme.colors.button.secondary.disabled.borderColor};
      color: ${theme.colors.button.secondary.disabled.color};
    }
  `,
};

const buttonSizes = {
  small: css`
    font-size: 12px;
    padding: 6px 12px;
  `,
  medium: css`
    font-size: 14px;
    padding: 8px 16px;
  `,
  large: css`
    font-size: 16px;
    padding: 10px 20px;
    font-weight: 700;
  `,
};

const StyledButton = styled.button`
  ${baseButtonStyles};
  ${props => buttonVariants[props.variant || 'secondary']};
  ${props => buttonSizes[props.size || 'medium']};
`;

const Button = ({
  variant = 'secondary',
  size = 'medium',
  type = 'button',
  ...rest
}) => {
  return <StyledButton type={type} variant={variant} size={size} {...rest} />;
};

export default Button;
