import { styled } from '@mui/material/styles';
import {Box, Icon, ListItemButton, Typography} from "@mui/material";

export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 52,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: 14,
  padding: '0 16px',
  margin: '3px 0',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(139, 92, 246, 0.12)'
      : 'rgba(124, 58, 237, 0.08)',
    transform: 'translateX(6px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 16px rgba(139, 92, 246, 0.25)'
      : '0 6px 16px rgba(124, 58, 237, 0.15)',
    '&:after': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%) translateX(10px)',
    width: 3,
    height: '60%',
    borderRadius: '4px 0 0 4px',
    background: theme.palette.mode === 'dark'
      ? theme.palette.gradients?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : theme.palette.gradients?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    opacity: 0,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&.active': {
    color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
    fontWeight: 700,
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(90deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.15) 100%)'
      : 'linear-gradient(90deg, rgba(124, 58, 237, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 20px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      : '0 6px 16px rgba(124, 58, 237, 0.2)',
    backdropFilter: 'blur(10px)',
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: 4,
      height: '70%',
      borderRadius: '0 6px 6px 0',
      background: theme.palette.gradients?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      boxShadow: theme.palette.mode === 'dark'
        ? '0 0 12px rgba(139, 92, 246, 0.6)'
        : '0 0 8px rgba(124, 58, 237, 0.4)',
    },
    '&:after': {
      opacity: 1,
      transform: 'translateX(0) translateY(-50%)',
    },
    '&:hover': {
      transform: 'translateX(6px) scale(1.02)',
      boxShadow: theme.palette.mode === 'dark'
        ? '0 12px 24px rgba(139, 92, 246, 0.35)'
        : '0 8px 20px rgba(124, 58, 237, 0.25)',
    },
  },
}));

export const StyledNavItemIcon = styled(Box)(({ theme }) => ({
  width: 28,
  height: 28,
  marginRight: 12,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '.active &': {
    transform: 'scale(1.1)',
    filter: theme.palette.mode === 'dark'
      ? 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))'
      : 'drop-shadow(0 2px 4px rgba(124, 58, 237, 0.3))',
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
