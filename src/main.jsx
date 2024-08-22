// src/Main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import Index from './Index.jsx'; // Assuming your main component is now Index
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import FleurimondTheme from './theme';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root element

root.render(
  <ThemeProvider theme={FleurimondTheme}>
    <GlobalStyle />
    <Router>
      <Index />
    </Router>
  </ThemeProvider>
);
