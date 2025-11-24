import React from 'react';
import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction, Paper, Badge, useTheme, alpha } from '@mui/material';
import { router, usePage } from '@inertiajs/react';
import * as Unicons from '@iconscout/react-unicons';

export default function BottomNavigation() {
  const { auth: { user } } = usePage().props;
  const theme = useTheme();
  const currentRoute = route().current();

  const currentEnvironment = user.current_environment;
  const allModules = user.menu.find(env => env.slug === currentEnvironment?.slug)?.modules || [];
  const modules = allModules.slice(0, 5);

  const activeIndex = modules.findIndex(module => currentRoute?.startsWith(module.route));
  const value = activeIndex >= 0 ? activeIndex : 0;

  const handleChange = (event, newValue) => {
    const module = modules[newValue];
    if (module) {
      router.visit(route(module.route));
    }
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.appBar,
        borderTop: `1px solid ${theme.palette.divider}`,
        background: theme.palette.mode === 'dark'
          ? alpha(theme.palette.background.paper, 0.95)
          : alpha(theme.palette.background.paper, 0.98),
        backdropFilter: 'blur(20px)',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 -4px 24px rgba(0, 0, 0, 0.4)'
          : '0 -4px 24px rgba(0, 0, 0, 0.08)',
        // Safe area para dispositivos com notch
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      elevation={0}
    >
      <MuiBottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          height: 'auto',
          minHeight: 56,
          paddingTop: 0.5,
          paddingBottom: 0.5,
          background: 'transparent',
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '4px 8px',
            color: theme.palette.text.secondary,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:active': {
              transform: 'scale(0.95)',
            },
            '&.Mui-selected': {
              color: theme.palette.primary.main,
              '& .MuiBottomNavigationAction-label': {
                fontSize: '0.7rem',
                fontWeight: 600,
              },
              '& .icon-wrapper': {
                background: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primary.main, 0.15)
                  : alpha(theme.palette.primary.main, 0.1),
                transform: 'scale(1.05)',
              },
            },
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.65rem',
            marginTop: '2px',
            transition: 'all 0.3s ease',
            '&.Mui-selected': {
              fontSize: '0.7rem',
            },
          },
        }}
      >
        {modules.map((module, index) => {
          const IconComponent = Unicons[module.icon] || Unicons.UilApps;
          const hasNotification = module.badge > 0;

          return (
            <BottomNavigationAction
              key={module.route}
              label={module.label}
              icon={
                <div
                  className="icon-wrapper"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {hasNotification ? (
                    <Badge
                      badgeContent={module.badge}
                      color="error"
                      max={99}
                      sx={{
                        '& .MuiBadge-badge': {
                          fontSize: '0.6rem',
                          height: 14,
                          minWidth: 14,
                          padding: '0 3px',
                        },
                      }}
                    >
                      <IconComponent size={20} />
                    </Badge>
                  ) : (
                    <IconComponent size={20} />
                  )}
                </div>
              }
            />
          );
        })}
      </MuiBottomNavigation>
    </Paper>
  );
}
