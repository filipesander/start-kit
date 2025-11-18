import { createTheme } from "@mui/material";
import { ptBR } from '@mui/material/locale';
import { ptBR as DataGridPtBr } from '@mui/x-data-grid';

import { alpha } from '@mui/material/styles';

export default createTheme({
  palette: {
    mode: 'dark',
    primary: {
      lighter: '#B794F6',
      light: '#9F7AEA',
      main: '#8B5CF6',  // Vibrant Purple
      dark: '#7C3AED',
      darker: '#6D28D9',
      contrastText: '#fff',
    },
    secondary: {
      lighter: '#67E8F9',
      light: '#22D3EE',
      main: '#06B6D4',  // Vibrant Cyan
      dark: '#0891B2',
      darker: '#0E7490',
      contrastText: '#fff',
    },
    success: {
      lighter: '#6EE7B7',
      light: '#34D399',
      main: '#10B981',  // Vibrant Green
      dark: '#059669',
      darker: '#047857',
      contrastText: '#fff',
    },
    info: {
      lighter: '#93C5FD',
      light: '#60A5FA',
      main: '#3B82F6',  // Vibrant Blue
      dark: '#2563EB',
      darker: '#1D4ED8',
      contrastText: '#fff',
    },
    warning: {
      lighter: '#FCD34D',
      light: '#FBBF24',
      main: '#F59E0B',  // Vibrant Amber
      dark: '#D97706',
      darker: '#B45309',
      contrastText: '#000',
    },
    error: {
      lighter: '#FCA5A5',
      light: '#F87171',
      main: '#EF4444',  // Vibrant Red
      dark: '#DC2626',
      darker: '#B91C1C',
      contrastText: '#fff',
    },
    grey: {
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    background: {
      default: '#0F172A',  // Slate 900 - Deep dark
      paper: '#1E293B',    // Slate 800 - Card background
      neutral: '#334155',  // Slate 700
    },
    text: {
      primary: '#F1F5F9',   // Light text
      secondary: '#CBD5E1', // Secondary text
      disabled: '#64748B',  // Disabled text
    },
    divider: alpha('#475569', 0.24),
    gradients: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
      success: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      info: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
      warning: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
      error: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      purple: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
      cyan: 'linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%)',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderWidth: '0px 0px thin',
          borderColor: theme.palette.divider,
          borderStyle: 'solid',
          background: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(10px)',
        }),
      },
    },
    MuiLink: {
      defaultProps: {
        color: '#10B981',
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: alpha('#1E293B', 0.8),
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha('#475569', 0.2)}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: alpha('#1E293B', 0.95),
          backgroundImage: 'none',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
}, ptBR, DataGridPtBr);
