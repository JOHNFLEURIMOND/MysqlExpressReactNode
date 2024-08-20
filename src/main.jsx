// src/Main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Index from './index'; // Assuming your main component is now App
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import FleurimondTheme from './theme';

ReactDOM.render(
  <ThemeProvider theme={FleurimondTheme}>
    <GlobalStyle />
    <Index />
  </ThemeProvider>,
  document.getElementById('root')
);
