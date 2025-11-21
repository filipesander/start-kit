import { Box, Button, Menu, MenuItem, Typography, ListItemText, Divider, Chip, alpha } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import * as Unicons from '@iconscout/react-unicons';

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

  const handleMenuClose = () => setAnchorEl(null);

  const handleOnClick = (environment) => () => {
    const module = user.modules.find(module => module.environment_id === environment.id);
    handleMenuClose();
    return router.visit(route(module.route));
  };

  const currentEnvironment = user.current_environment;
  const CurrentIcon = Unicons[currentEnvironment.icon] || Unicons.UilApps;

  return <>
    <Button
      aria-label="seleção de ambientes"
      aria-controls={menuId}
      aria-haspopup="true"
      onClick={handleMenuOpen}
      endIcon={<KeyboardArrowDownIcon />}
      sx={{
        color: 'text.primary',
        textTransform: 'none',
        borderRadius: 3,
        px: 2.5,
        py: 1.2,
        minWidth: 220,
        justifyContent: 'space-between',
        background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        backdropFilter: 'blur(10px)',
        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        fontWeight: 600,
        fontSize: '0.875rem',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.primary.main, 0.1)}`,
        '&:hover': {
          background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
          transform: 'translateY(-2px)',
          boxShadow: (theme) => `0 4px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: (theme) => theme.palette.gradients.primary,
            boxShadow: (theme) => `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
          }}
        >
          <CurrentIcon size={18} color="#fff" />
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.65rem', lineHeight: 1 }}>
            Ambiente
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
            {currentEnvironment.label}
          </Typography>
        </Box>
      </Box>
    </Button>

    <Menu
      anchorEl={anchorEl}
      id={menuId}
      open={isMenuOpen}
      onClose={handleMenuClose}
      disableScrollLock={true}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      PaperProps={{
        elevation: 0,
        sx: {
          minWidth: 250,
          borderRadius: 2.5,
          mt: 1.7,
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
            left: 20,
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
      <Box sx={{ px: 1.5, py: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.65rem' }}>
          Selecione o Ambiente
        </Typography>
      </Box>

      <Divider />

      {environments.map((environment) => {
        const Icon = Unicons[environment.icon] || Unicons.UilApps;
        const isActive = currentEnvironment.id === environment.id;

        return (
          <MenuItem
            key={environment.id}
            onClick={handleOnClick(environment)}
            sx={{
              py: 1,
              px: 1.5,
              mx: 0.5,
              my: 0.25,
              borderRadius: 1.5,
              transition: 'all 0.2s ease',
              ...(isActive && {
                background: (theme) => `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`,
              }),
              '&:hover': {
                background: (theme) => isActive
                  ? `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.12)} 100%)`
                  : alpha(theme.palette.primary.main, 0.08),
                transform: 'translateX(4px)',
              },
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1.5,
                background: (theme) => isActive
                  ? theme.palette.gradients.primary
                  : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                color: (theme) => isActive ? '#fff' : theme.palette.primary.main,
                transition: 'all 0.3s ease',
                boxShadow: (theme) => isActive ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}` : 'none',
              }}
            >
              <Icon size={18} />
            </Box>

            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Typography variant="body2" sx={{ fontWeight: isActive ? 700 : 600, fontSize: '0.875rem' }}>
                    {environment.label}
                  </Typography>
                  {isActive && (
                    <Chip
                      label="Atual"
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        background: (theme) => theme.palette.gradients.primary,
                        color: '#fff',
                      }}
                    />
                  )}
                </Box>
              }
            />
          </MenuItem>
        );
      })}
    </Menu>
  </>;
}
