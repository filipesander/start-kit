import { styled } from '@mui/material/styles';
import {Box, Icon, ListItemButton, Typography} from "@mui/material";

export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: 12,
  padding: '0 16px',
  margin: '4px 0',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: 'rgba(124, 58, 237, 0.08)',
    transform: 'translateX(4px)',
    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.15)',
  },
  '&.active': {
    color: theme.palette.primary.main,
    fontWeight: 600,
    background: 'linear-gradient(90deg, rgba(124, 58, 237, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)',
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: 4,
      height: '70%',
      borderRadius: '0 4px 4px 0',
      background: theme.palette.gradients.primary,
    },
  },
}));

export const StyledNavItemIcon = styled(Box)({
  width: 25,
  height: 25,
  marginRight: 10,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

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
