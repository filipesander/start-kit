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
    ? alpha(theme.palette.background.paper, 0.8)
    : alpha(theme.palette.background.paper, 0.9),
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  boxShadow: theme.palette.mode === 'dark'
    ? `0 4px 20px ${alpha(theme.palette.common.black, 0.5)}`
    : `0 2px 12px ${alpha(theme.palette.common.black, 0.08)}`,
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
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
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <Toolbar
        sx={{
          minHeight: '70px !important',
          px: { xs: 2, sm: 3 },
          gap: 2,
        }}
      >
        {/* Environment Selector */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 2,
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
            background: (theme) => theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.default, 0.4)
              : alpha(theme.palette.grey[100], 0.6),
            backdropFilter: 'blur(10px)',
            border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: (theme) => theme.palette.mode === 'dark'
              ? `0 4px 12px ${alpha(theme.palette.common.black, 0.3)}`
              : `0 2px 8px ${alpha(theme.palette.common.black, 0.05)}`,
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
              borderColor: (theme) => alpha(theme.palette.divider, 0.2),
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
            borderLeft: (theme) => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
          }}
        >
          <UserMenu />
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}
