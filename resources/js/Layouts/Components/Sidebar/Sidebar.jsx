import React, {useContext} from 'react';
import {Box, List, ListItemText, styled, useMediaQuery, Typography, alpha} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import {router, usePage} from '@inertiajs/react';
import {SidebarContext} from '../../Authenticated';
import {CustomEnvironmentLabel, StyledNavItem, StyledNavItemIcon} from "@/Layouts/Components/Sidebar/styles";
import * as Unicons from '@iconscout/react-unicons';
import classNames from "classnames";
const openedMixin = (theme, width) => ({
  width: width,
  height: '100vh',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  overflowY: 'auto',
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(180deg, rgba(124, 58, 237, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)`
    : `linear-gradient(180deg, rgba(124, 58, 237, 0.03) 0%, rgba(6, 182, 212, 0.03) 100%)`,
  backdropFilter: 'blur(10px)',
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '4px 0 24px rgba(0, 0, 0, 0.3)'
    : '4px 0 24px rgba(124, 58, 237, 0.08)',
  zIndex: theme.zIndex.drawer + 1,
});

const Drawer = styled(MuiDrawer)(({theme, width}) => ({
  width: width,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...openedMixin(theme, width),
  '& .MuiDrawer-paper': openedMixin(theme, width),
}));
export default function Sidebar({}) {
  const sidebar = useContext(SidebarContext);
  const {auth: {user}} = usePage().props;
  const isMobile = useMediaQuery('(max-width: 676px)');

  // Get only current environment modules
  const currentEnvironment = user.current_environment;
  const currentModules = user.menu.find(env => env.slug === currentEnvironment?.slug)?.modules || [];

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={isMobile ? sidebar.isOpen : true}
      width={sidebar.width}
    >
      {/* Logo Section */}
      <Box
        sx={{
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          background: (theme) => theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.6)
            : alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2.5,
            background: (theme) => theme.palette.gradients?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 1.5,
            boxShadow: (theme) => `0 8px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05) rotate(-5deg)',
              boxShadow: (theme) => `0 12px 24px ${alpha(theme.palette.primary.main, 0.5)}`,
            },
          }}
        >
          <Unicons.UilRocket size={26} color="#fff" />
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            background: (theme) => theme.palette.gradients?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '1.25rem',
            letterSpacing: '-0.5px',
          }}
        >
          Sistema
        </Typography>
      </Box>

      <Box sx={{ pt: 2 }}>
        <NavSection data={currentModules}/>
      </Box>
      <LogOut />
    </Drawer>
  );
}

function NavSection({data = [], ...other}) {
  const {auth: {user}} = usePage().props;

  return (
    <Box {...other}>
      <List disablePadding sx={{p: 1}}>
        {data.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            isActive={user.current_module.route === item.route}
          />
        ))}
      </List>
    </Box>
  );
}

function NavItem({item, isActive}) {
  const {label, icon, info} = item;
  const CustomIcon = Unicons[icon] ?? 'UilExclamationOctagon';

  return (
    <StyledNavItem
      onClick={() => router.visit(route(item.route))}
      className={classNames({
        'active': isActive,
      })}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      {icon && (
        <StyledNavItemIcon>{React.createElement(CustomIcon, {size: 120})}</StyledNavItemIcon>
      )}

      <ListItemText disableTypography primary={label}/>

      {info && info}
    </StyledNavItem>
  );
}

function LogOut() {
  const { props: { auth } } = usePage();
  const handleLogout = () => router.visit(route(`${auth.guard}.logout`), {
    method: 'post',
  });

  return (
    <List disablePadding sx={{p: 1, paddinTop: 0}}>
      <StyledNavItem onClick={handleLogout}>
        <StyledNavItemIcon>
          <Unicons.UilSignout size={40} />
        </StyledNavItemIcon>
        <ListItemText disableTypography primary='Sair' />
      </StyledNavItem>
    </List>
  )
}
