import { styled, alpha } from '@mui/material/styles';
import {Box, ListItemButton, Typography} from "@mui/material";

export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  color: theme.palette.text.secondary,
  borderRadius: 12,
  padding: '0 14px',
  margin: '2px 0',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    color: theme.palette.text.primary,
  },
  '&.active': {
    color: theme.palette.text.primary,
    fontWeight: 600,
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 10,
      top: '50%',
      transform: 'translateY(-50%)',
      width: 6,
      height: '60%',
      borderRadius: 999,
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

export const StyledNavItemIcon = styled(Box)(({ theme }) => ({
  width: 28,
  height: 28,
  marginRight: 12,
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'color 0.2s ease, transform 0.2s ease',
  '.active &': {
    color: theme.palette.primary.main,
    transform: 'scale(1.1)',
  },
}));

export const CustomEnvironmentLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  fontWeight: 700,
  fontSize: 11,
  letterSpacing: '0.08em',
  background: 'linear-gradient(90deg, rgba(124, 58, 237, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
  display: 'block',
  lineHeight: 2,
  marginBottom: 8,
  marginTop: 16,
  padding: '6px 20px',
  borderRadius: '8px',
  margin: '16px 12px 8px',
}));

export const Brand = styled(Box)(({ theme }) => ({
  position: 'relative',
  margin: '20px 16px 24px',
  padding: '16px',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 8px 24px rgba(124, 58, 237, 0.15)',
  },
}));
