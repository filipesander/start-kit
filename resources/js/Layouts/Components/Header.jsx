import React, { useContext } from 'react';
import { Box, AppBar, Toolbar, Typography, alpha, styled, Divider } from '@mui/material';
import * as Unicons from '@iconscout/react-unicons';
import UserMenu from './UserMenu';
import EnvironmentsMenu from './EnvironmentsMenu';
import NotificationsMenu from './NotificationsMenu';
import ThemeToggle from './ThemeToggle';
import { SidebarContext } from '../Authenticated';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #06b6d4 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #06b6d4 100%)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  boxShadow: theme.palette.mode === 'dark'
    ? `0 8px 32px ${alpha('#667eea', 0.4)}, 0 4px 16px ${alpha(theme.palette.common.black, 0.5)}`
    : `0 8px 32px ${alpha('#667eea', 0.3)}, 0 4px 16px ${alpha('#764ba2', 0.2)}`,
  borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  zIndex: theme.zIndex.drawer,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 50%, rgba(6, 182, 212, 0.1) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(10px)',
    zIndex: -1,
  },
}));

export default function Header() {
  const sidebar = useContext(SidebarContext);
  const sidebarWidth = sidebar.isCollapsed ? sidebar.collapsedWidth : sidebar.width;

  return (
    <StyledAppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        left: 0,
        width: '100%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <Toolbar
        sx={{
          minHeight: '70px !important',
          px: 0,
          gap: 2,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Environment Selector */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            ml: { xs: 2, sm: `calc(${sidebarWidth}px - 230px)` },
          }}
        >
          <EnvironmentsMenu />
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Actions Group */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            py: 0.5,
            borderRadius: 3,
            background: (theme) => alpha(theme.palette.common.white, 0.15),
            backdropFilter: 'blur(10px)',
            border: (theme) => `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
            boxShadow: (theme) => `0 4px 16px ${alpha(theme.palette.common.black, 0.1)}`,
          }}
        >
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Divider */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              mx: 0.5,
              height: 32,
              alignSelf: 'center',
              borderColor: (theme) => alpha(theme.palette.common.white, 0.3),
            }}
          />

          {/* Notifications */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NotificationsMenu />
          </Box>
        </Box>

        {/* User Menu */}
        <Box
          sx={{
            ml: 1,
            pl: 2,
            pr: { xs: 2, sm: 3 },
            borderLeft: (theme) => `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
          }}
        >
          <UserMenu />
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}
