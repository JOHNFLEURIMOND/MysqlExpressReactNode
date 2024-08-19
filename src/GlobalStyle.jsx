import { createGlobalStyle } from 'styled-components';
import { colors, media } from './theme';

const GlobalStyle = createGlobalStyle`
  /* Import Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

  :root {
    --font-body: 'Lora', serif;
    --font-heading: 'Montserrat', sans-serif;
    --font-size-base: 62.5%;
    --font-size-lg: 2.4rem;
    --font-size-md: 1.8rem;
    --font-size-sm: 1.6rem;
    --font-size-xs: 1.4rem;
    --font-weight-heading: 700;
    --font-weight-body: 400;
    --color-background: ${colors.background};
    --color-primary-text: ${colors.primaryText};
    --color-accent: ${colors.accent};
    --color-border: ${colors.border};
    --color-button-primary-bg: ${colors.button.primary.backgroundColor};
    --color-button-primary-text: ${colors.button.primary.color};
    --color-shadow: ${colors.shadow};
    --scrollbar-width: 1.5rem;
    --border-radius: 0.4rem;
    --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-body);
  }

  html {
    font-size: var(--font-size-base);
    overflow-x: hidden;
  }

  body {
    overflow-x: hidden;
    background-color: var(--color-background);
    color: var(--color-primary-text);
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

  p {
    font-size: var(--font-size-xs);
    line-height: 1.6;
  }

  a {
    color: var(--color-accent);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover {
    color: darken(var(--color-accent), 10%);
  }

  input, textarea {
    max-width: 50rem;
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

  input[type="submit"] {
    max-width: 16rem;
    margin-top: 2rem;
    background-color: var(--color-button-primary-bg);
    color: var(--color-button-primary-text);
    padding: 1.4rem 2.2rem;
    border-style: solid;
    border-width: 0.1rem;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    text-transform: uppercase;
    font-size: 1.8rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  input[type="submit"]:active {
    background-color: darken(var(--color-button-primary-bg), 10%);
  }

  .container {
    max-width: 120rem;
    margin: 0 auto;
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

  .common-heading {
    font-size: 3.8rem;
    font-weight: 600;
    margin-bottom: 6rem;
    text-transform: capitalize;
  }

  @media (max-width: ${media.tab}) {
    .container {
      padding: 0 2rem;
    }

    .grid {
      gap: 2rem;
    }

    .grid-three-column {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: ${media.mobile}) {
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
