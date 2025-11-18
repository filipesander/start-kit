import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, alpha, styled } from '@mui/material';
import * as Unicons from '@iconscout/react-unicons';
import UserMenu from './UserMenu';
import EnvironmentsMenu from './EnvironmentsMenu';
import { Notifications } from '@mui/icons-material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  boxShadow: `0 1px 3px ${alpha(theme.palette.common.black, 0.08)}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  zIndex: theme.zIndex.drawer + 1,
}));

export default function Header() {

  return (
    <StyledAppBar position="fixed" color="inherit" elevation={0}>
      <Toolbar sx={{ minHeight: '70px !important', px: 3 }}>
        {/* Logo/Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: (theme) => theme.palette.gradients.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1.5,
              boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          >
            <Unicons.UilRocket size={24} color="#fff" />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: (theme) => theme.palette.gradients.primary,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Sistema
          </Typography>
        </Box>

        {/* Environment Selector */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <EnvironmentsMenu />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Notifications */}
        <IconButton
          sx={{
            mr: 2,
            position: 'relative',
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
            },
          }}
        >
          <Notifications />
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'error.main',
              border: '2px solid',
              borderColor: 'background.paper',
            }}
          />
        </IconButton>

        {/* User Menu with Avatar */}
        <UserMenu />
      </Toolbar>
    </StyledAppBar>
  );
}
