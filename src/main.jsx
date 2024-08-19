// src/Main.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import Index from './index.jsx';
import GlobalStyle from './GlobalStyle'; // Import GlobalStyle
import FleurimondTheme from './theme'; // Import theme
import { ThemeProvider } from 'styled-components'; // Import ThemeProvider from styled-components

ReactDOM.render(
  <ThemeProvider theme={FleurimondTheme}>
    <GlobalStyle />
    <Index />
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
