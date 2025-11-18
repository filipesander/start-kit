import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

// Modern Vibrant Color Palette - Gradient Ready
const PRIMARY = {
  lighter: '#E0D4FC',
  light: '#B794F6',
  main: '#7C3AED',  // Purple 600 - Vibrant
  dark: '#5B21B6',
  darker: '#4C1D95',
  contrastText: '#fff',
};

const SECONDARY = {
  lighter: '#D4F4FF',
  light: '#67E8F9',
  main: '#06B6D4',  // Cyan 500 - Fresh
  dark: '#0891B2',
  darker: '#164E63',
  contrastText: '#fff',
};

const INFO = {
  lighter: '#DBEAFE',
  light: '#93C5FD',
  main: '#3B82F6',  // Blue 500 - Classic
  dark: '#1D4ED8',
  darker: '#1E3A8A',
  contrastText: '#fff',
};

const SUCCESS = {
  lighter: '#D1FAE5',
  light: '#6EE7B7',
  main: '#10B981',  // Green 500 - Vibrant
  dark: '#059669',
  darker: '#064E3B',
  contrastText: '#fff',
};

const WARNING = {
  lighter: '#FEF3C7',
  light: '#FCD34D',
  main: '#F59E0B',  // Amber 500 - Warm
  dark: '#D97706',
  darker: '#92400E',
  contrastText: '#fff',
};

const ERROR = {
  lighter: '#FEE2E2',
  light: '#FCA5A5',
  main: '#EF4444',  // Red 500 - Bold
  dark: '#DC2626',
  darker: '#991B1B',
  contrastText: '#fff',
};

// Gradient Definitions for Modern UI
const GRADIENTS = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  secondary: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
  success: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  info: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
  warning: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
  error: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
  purple: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
  cyan: 'linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%)',
};

const palette = (mode = 'light') => {
  const isLight = mode === 'light';

  return {
    mode,
    common: { black: '#000', white: '#fff' },
    primary: PRIMARY,
    secondary: SECONDARY,
    info: INFO,
    success: SUCCESS,
    warning: WARNING,
    error: ERROR,
    grey: GREY,
    gradients: GRADIENTS,
    divider: alpha(isLight ? GREY[500] : GREY[600], 0.24),
    text: {
      primary: isLight ? GREY[800] : '#fff',
      secondary: isLight ? GREY[600] : GREY[400],
      disabled: isLight ? GREY[500] : GREY[600],
    },
    background: {
      paper: isLight ? '#fff' : GREY[800],
      default: isLight ? '#F9FAFB' : GREY[900],
      neutral: isLight ? GREY[200] : GREY[700],
    },
    action: {
      active: isLight ? GREY[600] : GREY[400],
      hover: alpha(isLight ? GREY[500] : GREY[600], 0.08),
      selected: alpha(isLight ? GREY[500] : PRIMARY.main, 0.16),
      disabled: alpha(isLight ? GREY[500] : GREY[600], 0.8),
      disabledBackground: alpha(isLight ? GREY[500] : GREY[600], 0.24),
      focus: alpha(isLight ? GREY[500] : GREY[600], 0.24),
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
  };
};

export default palette;
