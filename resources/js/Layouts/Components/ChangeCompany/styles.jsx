import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";

export const ChangeCompanyWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  margin: '16px 12px',
  padding: '18px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)'
    : 'linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(6, 182, 212, 0.02) 100%)',
  borderRadius: '18px',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(124, 58, 237, 0.2)'
    : '1px solid rgba(124, 58, 237, 0.15)',
  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(90deg, #7C3AED 0%, #06B6D4 50%, #7C3AED 100%)'
      : 'linear-gradient(90deg, #7C3AED 0%, #06B6D4 50%, #7C3AED 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 3s ease-in-out infinite',
  },
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(124, 58, 237, 0.12)'
      : 'rgba(124, 58, 237, 0.08)',
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 4px 16px rgba(124, 58, 237, 0.3)'
      : '0 4px 16px rgba(124, 58, 237, 0.2)',
    borderColor: theme.palette.mode === 'dark'
      ? 'rgba(124, 58, 237, 0.4)'
      : 'rgba(124, 58, 237, 0.3)',
  },
  '@keyframes shimmer': {
    '0%': {
      backgroundPosition: '0% 0%',
    },
    '50%': {
      backgroundPosition: '100% 0%',
    },
    '100%': {
      backgroundPosition: '0% 0%',
    },
  },
}));
