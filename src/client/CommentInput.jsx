// src/client/CommentInput.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FleurimondTheme from '../theme'; // Import the theme

const Container = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  color: ${FleurimondTheme.colors.primaryText};
  margin-bottom: 0.5rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid ${FleurimondTheme.colors.primaryText};
  border-radius: 4px;
  resize: vertical;
  min-height: 150px;
  box-sizing: border-box;

  &.$error {
    border-color: ${FleurimondTheme.colors.error};
  }
`;

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

const CommentInput = React.memo(
  ({ name, title, placeholder, value, error, onChange, onBlur }) => (
    <Container>
      {title && <Label htmlFor={name}>{title}</Label>}
      <Textarea
        name={name}
        id={name}
        className={error ? 'error' : ''}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  )
);

CommentInput.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

CommentInput.defaultProps = {
  title: '',
  placeholder: '',
  error: '',
};

export default CommentInput;
