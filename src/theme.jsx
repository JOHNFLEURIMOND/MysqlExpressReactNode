// src/theme.jsx

export const colors = {
  // Primary Colors
  background: '#F9F9F9',
  primaryText: '#333333',
  error: '#e74c3c',

  // Earthy Tones
  earthy: {
    darkGreen: '#132504',
    mediumGreen: '#1f3613',
    orange: '#ce5f15',
    brown: '#704020',
    deepBrown: '#682702',
    lightGreen: '#4F6D3F',
    peach: '#F6B67F',
    beige: '#D0BFA3',
    lightTan: '#A89F91',
  },

  // Dark Reds and Pinks
  darkReds: {
    darkMaroon: '#250715',
    deepPurple: '#2f0d33',
    darkRed: '#6b2232',
    crimson: '#7a1826',
    brightRed: '#bc2034',
    lavender: '#E3D6E3',
    teal: '#004D40',
    softRose: '#F2A7A5',
    palePink: '#F4C6C6',
    mutedRed: '#B04A52',
  },

  // Warm Tones
  warmTones: {
    deepBrown: '#59320a',
    darkOrange: '#994900',
    burntOrange: '#c45400',
    mediumOrange: '#d17200',
    lightPeach: '#f2e3d6',
    warmGray: '#B5A7A0',
    softYellow: '#F4C300',
    coral: '#FF6F61',
    tan: '#D9B38C',
    ivory: '#F9F5F2',
  },

  // Button Colors
  button: {
    primary: {
      color: '#FFFFFF',
      backgroundColor: '#704020',
      borderColor: '#704020',

      hover: {
        backgroundColor: '#59320a',
        borderColor: '#59320a',
      },

      disabled: {
        backgroundColor: '#CCCCCC',
        borderColor: '#CCCCCC',
        color: '#8C8C8C',
      },
    },

    secondary: {
      color: '#704020',
      backgroundColor: '#FFFFFF',
      borderColor: '#B5A7A0',

      hover: {
        backgroundColor: '#F2A7A5',
        borderColor: '#B5A7A0',
        color: '#B5A7A0',
      },

      disabled: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E6E6E6',
        color: '#E6E6E6',
      },
    },
  },

  // Footer Styles
  footer: {
    backgroundColor: '#704020',
    textColor: '#FFFFFF',
    padding: '2rem',
    textAlign: 'center',

    link: {
      color: '#FFFFFF',
      textDecoration: 'none',
      hover: {
        textDecoration: 'underline',
      },
    },
  },

  // Shadows
  shadow: '0 6px 12px rgba(0, 0, 0, 0.2)',

  // Accessibility-specific Colors
  highContrast: {
    text: '#000000',
    background: '#FFFFFF',
  },
};

// Define media breakpoints
export const media = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',

  tabletS: '600px',
  tabletM: '768px',
  tabletL: '1024px',

  laptopS: '1280px',
  laptopM: '1440px',
  laptopL: '1600px',

  desktopS: '1920px',
  desktopL: '2560px',

  extraLarge: '3840px',
};

const FleurimondTheme = {
  colors,
  media,
};

export default FleurimondTheme;
