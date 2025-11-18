import React, { useContext, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { DarkMode, ExitToApp, LightMode, Person } from "@mui/icons-material";
import { ThemeContext } from "@/Themes/ThemeContext";

export default function UserMenu() {
  const { props: { auth } } = usePage();

  const [anchorEl, setAnchorEl] = useState();

  const isMenuOpen = Boolean(anchorEl);

  const menuId = 'auth-user-menu';

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);

  const handleMenuClose = (event) => setAnchorEl(null);

  const handleLogout = () => router.visit(route(`${auth.guard}.logout`), {
    method: 'post',
  });

  const handleProfileClick = (event) => {
    const module = auth.user.modules.find(module => module.environment.slug === 'profile');

    return router.visit(route(module.route));
  };

  return <>
    <IconButton
      edge="end"
      aria-label="account of current user"
      aria-controls={menuId}
      aria-haspopup="true"
      onClick={handleMenuOpen}
      color="inherit"
      size="large">
      <AccountCircle />
      <Typography variant='body2'>{auth.user.name}</Typography>
    </IconButton>

    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileClick}>
        <Person /> Perfil
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ExitToApp /> Sair
      </MenuItem>
    </Menu>
  </>;
}
