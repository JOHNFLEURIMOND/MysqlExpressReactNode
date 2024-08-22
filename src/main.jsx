// src/Main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import Index from './Index.jsx'; // Assuming your main component is now App
import GlobalStyle from './GlobalStyle.jsx';
import { ThemeProvider } from 'styled-components';
import FleurimondTheme from './theme.jsx';
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
