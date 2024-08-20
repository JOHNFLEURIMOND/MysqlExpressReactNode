// src/GlobalStyle.jsx

import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';
import FleurimondTheme from './theme';

const GlobalStyle = createGlobalStyle`
  :root {
    --font-body: 'Lora', serif;
    --font-heading: 'Montserrat', sans-serif;
    --font-size-base: 62.5%; /* 10px */
    --font-size-lg: 2.4rem;
    --font-size-md: 1.8rem;
    --font-size-sm: 1.6rem;
    --font-size-xs: 1.4rem;
    --font-weight-heading: 700;
    --font-weight-body: 400;
    --color-background: ${FleurimondTheme.colors.background};
    --color-primary-text: ${FleurimondTheme.colors.primaryText};
    --color-accent: ${FleurimondTheme.colors.error}; 
    --color-border: ${FleurimondTheme.colors.error}; 
    --color-button-primary-bg: ${FleurimondTheme.colors.button.primary.backgroundColor};
    --color-button-primary-text: ${FleurimondTheme.colors.button.primary.color};
    --color-shadow: ${FleurimondTheme.colors.shadow};
    --scrollbar-width: 1.5rem;
    --border-radius: 0.4rem;
    --box-shadow: ${FleurimondTheme.colors.shadow};
  }

  /* Reset and Base Styles */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: var(--font-size-base);
    overflow-x: hidden;
  }

  body {
    font-family: var(--font-body);
    background-color: var(--color-background);
    color: var(--color-primary-text);
    overflow-x: hidden;
    scrollbar-color: var(--color-accent) var(--color-background);
    scrollbar-width: thin;
  }

  body::-webkit-scrollbar {
    width: var(--scrollbar-width);
  }

  body::-webkit-scrollbar-track {
    background-color: var(--color-background);
  }

  body::-webkit-scrollbar-thumb {
    background: var(--color-accent);
    border-radius: 8px;
  }

  /* Headings */
  h1, h2, h3 {
    font-family: var(--font-heading);
    margin-bottom: 1rem;
  }

  h1 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-heading);
  }

  h2 {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-heading);
  }

  h3 {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-heading);
  }

  /* Paragraphs */
  p {
    font-size: var(--font-size-xs);
    line-height: 1.6;
  }

  /* Links */
  a {
    color: var(--color-accent);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover, a:focus {
    color: ${darken(0.1, FleurimondTheme.colors.error)};
  }

  /* Inputs and Textareas */
  input, textarea {
    max-width: 100%;
    color: var(--color-primary-text);
    padding: 1.6rem 2.4rem;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    font-size: var(--font-size-xs);
  }

  input:focus, textarea:focus {
    border-color: var(--color-accent);
    outline: none;
  }

  /* Submit Button */
  input[type="submit"] {
    max-width: 100%;
    background-color: var(--color-button-primary-bg);
    color: var(--color-button-primary-text);
    padding: 1.4rem 2.2rem;
    border: 1px solid var(--color-button-primary-bg);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    text-transform: uppercase;
    font-size: var(--font-size-md);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  input[type="submit"]:active {
    background-color: ${darken(0.1, FleurimondTheme.colors.button.primary.backgroundColor)};
  }

  /* Layouts */
  .container {
    max-width: 120rem;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .grid {
    display: grid;
    gap: 9rem;
  }

  .grid-two-column {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-three-column {
    grid-template-columns: repeat(3, 1fr);
  }

  .grid-four-column {
    grid-template-columns: 1fr 1.2fr 0.5fr 0.8fr;
  }

  /* Common Heading */
  .common-heading {
    font-size: 3.8rem;
    font-weight: 600;
    margin-bottom: 6rem;
    text-transform: capitalize;
  }

  /* Responsive Styles */
  @media (max-width: ${FleurimondTheme.media.tabletS}) {
    .container {
      padding: 0 1rem;
    }

    .grid {
      gap: 2rem;
    }

    .grid-three-column {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: ${FleurimondTheme.media.mobileS}) {
    html {
      font-size: 50%;
    }

    .grid {
      gap: 1.5rem;
    }

    .grid-two-column, .grid-three-column, .grid-four-column {
      grid-template-columns: 1fr;
    }
  }

  /* Montserrat Utility Classes */
  .montserrat-light {
    font-family: "Montserrat", sans-serif;
    font-weight: 100;
  }

  .montserrat-regular {
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
  }

  .montserrat-bold {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
  }

  .montserrat-black {
    font-family: "Montserrat", sans-serif;
    font-weight: 900;
  }

  /* Lora Utility Classes */
  .lora-regular {
    font-family: "Lora", serif;
    font-weight: 400;
  }

  .lora-bold {
    font-family: "Lora", serif;
    font-weight: 700;
  }

  .lora-italic {
    font-family: "Lora", serif;
    font-weight: 400;
    font-style: italic;
  }

  .lora-bold-italic {
    font-family: "Lora", serif;
    font-weight: 700;
    font-style: italic;
  }
`;

export default GlobalStyle;
