import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from './Index'; // Ensure the path and casing are correct
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import FleurimondTheme from './theme';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider theme={FleurimondTheme}>
    <GlobalStyle />
    <Router>
      <Index />
    </Router>
  </ThemeProvider>
);
