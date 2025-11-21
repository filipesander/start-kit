import React, { useContext } from 'react';
import { Box, AppBar, Toolbar, Typography, alpha, styled } from '@mui/material';
import * as Unicons from '@iconscout/react-unicons';
import UserMenu from './UserMenu';
import EnvironmentsMenu from './EnvironmentsMenu';
import NotificationsMenu from './NotificationsMenu';
import ThemeToggle from './ThemeToggle';
import { SidebarContext } from '../Authenticated';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  boxShadow: `0 1px 3px ${alpha(theme.palette.common.black, 0.08)}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  zIndex: theme.zIndex.drawer - 1,
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
        left: { xs: 0, sm: `${sidebarWidth}px` },
        width: { xs: '100%', sm: `calc(100% - ${sidebarWidth}px)` },
        transition: 'all 0.3s ease',
      }}
    >
      <Toolbar sx={{ minHeight: '70px !important', px: 3 }}>
        {/* Environment Selector */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <EnvironmentsMenu />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <NotificationsMenu />

        {/* User Menu with Avatar */}
        <UserMenu />
      </Toolbar>
    </StyledAppBar>
  );
}
