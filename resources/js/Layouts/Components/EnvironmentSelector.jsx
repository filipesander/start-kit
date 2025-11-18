import React, { useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  alpha,
  Chip
} from '@mui/material';
import { usePage, router } from '@inertiajs/react';
import * as Unicons from '@iconscout/react-unicons';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function EnvironmentSelector() {
  const { auth: { user } } = usePage().props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const currentEnvironment = user.current_module?.environment;
  const environments = user.menu || [];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectEnvironment = (environment) => {
    // Navega para o primeiro módulo do ambiente selecionado
    if (environment.modules && environment.modules.length > 0) {
      const firstModule = environment.modules[0];
      router.visit(route(firstModule.route));
    }
    handleClose();
  };

  if (!currentEnvironment) {
    return null;
  }

  const CurrentIcon = Unicons[currentEnvironment.icon] || Unicons.UilApps;

  return (
    <Box>
      <Button
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          color: 'inherit',
          textTransform: 'none',
          borderRadius: 3,
          px: 2,
          py: 1,
          minWidth: 200,
          justifyContent: 'space-between',
          background: (theme) => alpha(theme.palette.common.white, 0.1),
          backdropFilter: 'blur(10px)',
          border: (theme) => `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: (theme) => alpha(theme.palette.common.white, 0.15),
            transform: 'translateY(-2px)',
            boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.common.black, 0.2)}`,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CurrentIcon size={20} />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {currentEnvironment.label}
          </Typography>
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: 280,
            borderRadius: 3,
            mt: 1.5,
            background: (theme) => alpha(theme.palette.background.paper, 0.95),
            backdropFilter: 'blur(20px)',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            boxShadow: (theme) => `0 12px 32px ${alpha(theme.palette.common.black, 0.12)}`,
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
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
            Selecione o Ambiente
          </Typography>
        </Box>

        <Divider />

        {environments.map((env, index) => {
          const Icon = Unicons[env.icon] || Unicons.UilApps;
          const isActive = currentEnvironment.slug === env.slug;
          const moduleCount = env.modules?.length || 0;

          return (
            <MenuItem
              key={env.slug}
              onClick={() => handleSelectEnvironment(env)}
              sx={{
                py: 1.5,
                px: 2,
                mx: 1,
                my: 0.5,
                borderRadius: 2,
                transition: 'all 0.2s ease',
                ...(isActive && {
                  background: (theme) => `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
                  borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`,
                }),
                '&:hover': {
                  background: (theme) => alpha(theme.palette.primary.main, 0.08),
                  transform: 'translateX(4px)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: (theme) => isActive
                      ? theme.palette.gradients.primary
                      : alpha(theme.palette.primary.main, 0.1),
                    color: (theme) => isActive ? '#fff' : theme.palette.primary.main,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Icon size={20} />
                </Box>
              </ListItemIcon>

              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: isActive ? 700 : 600 }}>
                      {env.label}
                    </Typography>
                    {isActive && (
                      <Chip
                        label="Atual"
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          background: (theme) => theme.palette.gradients.primary,
                          color: '#fff',
                        }}
                      />
                    )}
                  </Box>
                }
                secondary={`${moduleCount} ${moduleCount === 1 ? 'módulo' : 'módulos'}`}
                secondaryTypographyProps={{
                  variant: 'caption',
                  sx: { color: 'text.secondary', fontSize: '0.7rem' }
                }}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
}
