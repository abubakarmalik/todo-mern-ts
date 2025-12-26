import type { PaletteOptions } from '@mui/material/styles';

const palette: PaletteOptions = {
  mode: 'light',

  primary: {
    main: '#009688', // Teal 500
    light: '#4DB6AC', // Teal 300
    dark: '#00695C', // Teal 800
    contrastText: '#FFFFFF',
  },

  secondary: {
    main: '#26A69A', // Teal Accent
    light: '#80CBC4',
    dark: '#00796B',
    contrastText: '#FFFFFF',
  },

  background: {
    default: '#F5FDFC', // Very light teal tint
    paper: '#FFFFFF',
  },

  text: {
    primary: '#0F2F2C', // Dark teal-black
    secondary: '#4F6F6B',
    disabled: '#9EB8B4',
  },

  divider: '#D6EDEA',

  success: {
    main: '#2E7D32',
  },

  warning: {
    main: '#ED6C02',
  },

  error: {
    main: '#D32F2F',
  },

  info: {
    main: '#0288D1',
  },
};

export default palette;
