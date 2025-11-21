import React, {useContext} from 'react';
import {Box, List, ListItemText, styled, useMediaQuery, Typography, alpha, IconButton, Tooltip} from '@mui/material';
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

const closedMixin = (theme, width) => ({
  width: width,
  height: '100vh',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
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

const Drawer = styled(MuiDrawer)(({theme, width, collapsed, collapsedwidth}) => ({
  width: collapsed ? collapsedwidth : width,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(collapsed ? closedMixin(theme, collapsedwidth) : openedMixin(theme, width)),
  '& .MuiDrawer-paper': collapsed ? closedMixin(theme, collapsedwidth) : openedMixin(theme, width),
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
      collapsed={sidebar.isCollapsed}
      collapsedwidth={sidebar.collapsedWidth}
    >
      {/* Logo Section */}
      <Box
        sx={{
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebar.isCollapsed ? 'center' : 'space-between',
          px: sidebar.isCollapsed ? 1 : 2,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          background: (theme) => theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.6)
            : alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, flex: sidebar.isCollapsed ? 0 : 1 }}>
          <Tooltip title={sidebar.isCollapsed ? "Sistema" : ""} placement="right" arrow>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2.5,
                background: (theme) => theme.palette.gradients?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: sidebar.isCollapsed ? 0 : 1.5,
                boxShadow: (theme) => `0 8px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                transition: 'all 0.3s ease',
                flexShrink: 0,
                '&:hover': {
                  transform: 'scale(1.05) rotate(-5deg)',
                  boxShadow: (theme) => `0 12px 24px ${alpha(theme.palette.primary.main, 0.5)}`,
                },
              }}
            >
              <Unicons.UilRocket size={26} color="#fff" />
            </Box>
          </Tooltip>
          {!sidebar.isCollapsed && (
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
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Sistema
            </Typography>
          )}
        </Box>

        {/* Toggle Button - apenas no desktop */}
        {!isMobile && (
          <Tooltip title={sidebar.isCollapsed ? "Expandir menu" : "Recolher menu"} placement="right" arrow>
            <IconButton
              onClick={sidebar.toggleCollapsed}
              sx={{
                width: 36,
                height: 36,
                background: (theme) => alpha(theme.palette.primary.main, 0.1),
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: (theme) => alpha(theme.palette.primary.main, 0.2),
                  transform: 'scale(1.1)',
                },
              }}
            >
              {sidebar.isCollapsed ? (
                <Unicons.UilAngleDoubleRight size={20} color="currentColor" />
              ) : (
                <Unicons.UilAngleDoubleLeft size={20} color="currentColor" />
              )}
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Box sx={{ pt: 2 }}>
        <NavSection data={currentModules} isCollapsed={sidebar.isCollapsed} />
      </Box>
      <LogOut />
    </Drawer>
  );
}

function NavSection({data = [], isCollapsed, ...other}) {
  const {auth: {user}} = usePage().props;

  return (
    <Box {...other}>
      <List disablePadding sx={{p: 1}}>
        {data.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            isActive={user.current_module.route === item.route}
            isCollapsed={isCollapsed}
          />
        ))}
      </List>
    </Box>
  );
}

function NavItem({item, isActive, isCollapsed}) {
  const {label, icon, info} = item;
  const CustomIcon = Unicons[icon] ?? 'UilExclamationOctagon';

  const navItemContent = (
    <StyledNavItem
      onClick={() => router.visit(route(item.route))}
      className={classNames({
        'active': isActive,
      })}
      sx={{
        justifyContent: isCollapsed ? 'center' : 'flex-start',
        px: isCollapsed ? 1 : 2,
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      {icon && (
        <StyledNavItemIcon sx={{ mr: isCollapsed ? 0 : 2, minWidth: isCollapsed ? 'auto' : '40px' }}>
          {React.createElement(CustomIcon, {size: 24})}
        </StyledNavItemIcon>
      )}

      {!isCollapsed && (
        <>
          <ListItemText disableTypography primary={label}/>
          {info && info}
        </>
      )}
    </StyledNavItem>
  );

  // Quando colapsado, envolve com Tooltip
  if (isCollapsed) {
    return (
      <Tooltip title={label} placement="right" arrow>
        {navItemContent}
      </Tooltip>
    );
  }

  return navItemContent;
}

function LogOut() {
  const { props: { auth } } = usePage();
  const sidebar = useContext(SidebarContext);
  const handleLogout = () => router.visit(route(`${auth.guard}.logout`), {
    method: 'post',
  });

  const logoutButton = (
    <Box
      onClick={handleLogout}
      sx={{
        mx: 1,
        mb: 2,
        mt: 'auto',
        p: sidebar.isCollapsed ? 1.5 : 2,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: sidebar.isCollapsed ? 'center' : 'flex-start',
        gap: 1.5,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        background: (theme) => theme.palette.mode === 'dark'
          ? alpha(theme.palette.error.main, 0.1)
          : alpha(theme.palette.error.main, 0.05),
        border: (theme) => `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
        color: 'error.main',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0)} 0%, ${alpha(theme.palette.error.main, 0.1)} 100%)`,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover': {
          transform: 'translateY(-2px)',
          background: (theme) => theme.palette.mode === 'dark'
            ? alpha(theme.palette.error.main, 0.15)
            : alpha(theme.palette.error.main, 0.08),
          borderColor: (theme) => alpha(theme.palette.error.main, 0.4),
          boxShadow: (theme) => `0 8px 16px ${alpha(theme.palette.error.main, 0.25)}`,
          '&:before': {
            opacity: 1,
          },
        },
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: (theme) => alpha(theme.palette.error.main, 0.15),
          color: 'error.main',
          transition: 'all 0.3s ease',
          zIndex: 1,
          '.MuiBox-root:hover &': {
            transform: 'rotate(-10deg) scale(1.1)',
            background: (theme) => alpha(theme.palette.error.main, 0.25),
          },
        }}
      >
        <Unicons.UilSignout size={20} />
      </Box>
      {!sidebar.isCollapsed && (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            fontSize: '0.875rem',
            zIndex: 1,
          }}
        >
          Sair
        </Typography>
      )}
    </Box>
  );

  if (sidebar.isCollapsed) {
    return (
      <Tooltip title="Sair" placement="right" arrow>
        {logoutButton}
      </Tooltip>
    );
  }

  return logoutButton;
}
