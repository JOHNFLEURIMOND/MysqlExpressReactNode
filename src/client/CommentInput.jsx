import React from 'react';
import styled from 'styled-components';

// Define the styled-components
const Container = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  font-size: 0.875rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;

  &.error {
    border-color: #d9534f;
  }
`;

// Functional component with memoization and accessibility improvements
const Comments = React.memo(
  ({ name, title, placeholder, value, error, onChange, onBlur }) => (
    <Container>
      {title && <Label htmlFor={name}>{title}</Label>}
      <Textarea
        rows={10}
        name={name}
        id={name}
        className={error ? 'error' : ''}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={error ? 'true' : 'false'}
      />
    </Container>
  )
);

export default Comments;
