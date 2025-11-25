// ----------------------------------------------------------------------

import { alpha } from '@mui/material/styles';

export default function Card(theme) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderRadius: 16,
          position: 'relative',
          zIndex: 0,
          border: `1px solid ${alpha('#7c3aed', 0.2)}`,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.01)} 0%, ${alpha(theme.palette.secondary.main, 0.01)} 100%)`,
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2' },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
  };
}
