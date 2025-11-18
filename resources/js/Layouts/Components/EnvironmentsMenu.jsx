import { Icon, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Apps from '@mui/icons-material/Apps';
import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function EnvironmentsMenu() {
  const {
    auth: {
      user,
    },
  } = usePage().props;

  const environments = user.environments.filter(environment => {
    return environment.slug !== 'profile';
  });

  if (environments.length <= 1 && user.current_environment.slug !== 'profile') {
    return (<></>);
  }

  const [anchorEl, setAnchorEl] = useState();

  const isMenuOpen = Boolean(anchorEl);

  const menuId = 'environments-menu';

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);

  const handleMenuClose = (event) => setAnchorEl(null);

  const handleOnClick = (environment) => () => {
    const module = user.modules.find(module => module.environment_id === environment.id);

    return router.visit(route(module.route));
  };

  return <>
    <IconButton
      edge="end"
      aria-label="seleção de ambientes"
      aria-controls={menuId}
      aria-haspopup="true"
      onClick={handleMenuOpen}
      color="inherit"
      size="large">
      <Apps />
      <Typography variant='body2'>Ambientes</Typography>
    </IconButton>

    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {environments.map(environment => (
        <MenuItem
          button
          onClick={handleOnClick(environment)}
          key={environment.id}
          selected={user.current_environment.id === environment.id}
        >
          <Icon>{environment.icon}</Icon> {environment.label}
        </MenuItem>
      ))}
    </Menu>
  </>;
}
