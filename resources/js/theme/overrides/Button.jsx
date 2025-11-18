import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        sizeLarge: {
          height: 48,
          fontSize: '1rem',
          padding: '12px 24px',
        },
        sizeMedium: {
          height: 40,
          padding: '8px 20px',
        },
        sizeSmall: {
          height: 32,
          padding: '4px 12px',
        },
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
            boxShadow: `0 8px 24px ${alpha(theme.palette.grey[500], 0.3)}`,
          },
        },
        containedPrimary: {
          background: theme.palette.gradients.primary,
          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
          '&:hover': {
            background: theme.palette.gradients.primary,
            boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
          },
        },
        containedSecondary: {
          background: theme.palette.gradients.secondary,
          boxShadow: `0 4px 12px ${alpha(theme.palette.secondary.main, 0.3)}`,
          '&:hover': {
            background: theme.palette.gradients.secondary,
            boxShadow: `0 8px 24px ${alpha(theme.palette.secondary.main, 0.4)}`,
          },
        },
        outlinedInherit: {
          border: `2px solid ${alpha(theme.palette.grey[500], 0.32)}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
            border: `2px solid ${theme.palette.grey[500]}`,
          },
        },
        outlinedPrimary: {
          border: `2px solid ${theme.palette.primary.main}`,
          '&:hover': {
            border: `2px solid ${theme.palette.primary.dark}`,
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
          },
        },
        outlinedSecondary: {
          border: `2px solid ${theme.palette.secondary.main}`,
          '&:hover': {
            border: `2px solid ${theme.palette.secondary.dark}`,
            backgroundColor: alpha(theme.palette.secondary.main, 0.08),
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textPrimary: {
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
          },
        },
      },
    },
  };
}
