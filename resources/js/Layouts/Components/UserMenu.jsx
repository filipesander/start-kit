import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { Box, Menu, MenuItem, Typography, Avatar, ListItemIcon, ListItemText, Divider, alpha } from "@mui/material";
import { ExitToApp, Person } from "@mui/icons-material";

export default function UserMenu() {
  const { props: { auth } } = usePage();
  const user = auth.user;

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    router.visit(route(`${auth.guard}.logout`), { method: 'post' });
  };

  const handleProfileClick = () => {
    const module = auth.user.modules.find(module => module.environment.slug === 'profile');
    handleMenuClose();
    return router.visit(route(module.route));
  };

  return (
    <>
      <Box
        onClick={handleMenuOpen}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          cursor: 'pointer',
          px: 1.5,
          py: 0.75,
          borderRadius: 3,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
            transform: 'translateY(-2px)',
            boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
          },
        }}
      >
        <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
          <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
            {user.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user.email}
          </Typography>
        </Box>

        <Avatar
          alt={user.name}
          src={user.avatar || user.gravatar}
          sx={{
            width: 40,
            height: 40,
            border: (theme) => `2px solid ${theme.palette.background.paper}`,
            boxShadow: (theme) => theme.palette.mode === 'dark'
              ? `0 0 0 2px ${alpha(theme.palette.primary.main, 0.4)}, 0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
              : `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}, 0 2px 8px ${alpha(theme.palette.common.black, 0.1)}`,
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: (theme) => theme.palette.gradients?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              transform: 'scale(1.05) rotate(-5deg)',
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.6)}, 0 8px 20px ${alpha(theme.palette.primary.main, 0.4)}`
                : `0 0 0 3px ${alpha(theme.palette.primary.main, 0.3)}, 0 4px 16px ${alpha(theme.palette.common.black, 0.15)}`,
            },
          }}
        >
          {user.name?.charAt(0).toUpperCase()}
        </Avatar>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        disableScrollLock={true}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: 240,
            borderRadius: 3,
            mt: 1.5,
            background: (theme) => theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.95)
              : '#ffffff',
            backdropFilter: 'blur(20px)',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            boxShadow: (theme) => `0 12px 32px ${alpha(theme.palette.common.black, 0.15)}`,
            overflow: 'visible',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
            },
          },
        }}
      >
        {/* User Info */}
        <Box sx={{ px: 2, py: 1.5, pb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {user.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user.email}
          </Typography>
        </Box>

        <Divider />

        {/* Menu Items */}
        <MenuItem
          onClick={handleProfileClick}
          sx={{
            py: 1.5,
            px: 2,
            mx: 1,
            my: 0.5,
            borderRadius: 2,
            '&:hover': {
              background: (theme) => alpha(theme.palette.primary.main, 0.08),
            },
          }}
        >
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>Meu Perfil</ListItemText>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 1.5,
            px: 2,
            mx: 1,
            my: 0.5,
            borderRadius: 2,
            color: 'error.main',
            '&:hover': {
              background: (theme) => alpha(theme.palette.error.main, 0.08),
            },
          }}
        >
          <ListItemIcon>
            <ExitToApp fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Sair</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
