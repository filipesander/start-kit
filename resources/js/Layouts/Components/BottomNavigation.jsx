import React from 'react';
import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction, Paper, Badge, useTheme } from '@mui/material';
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
        borderTop: 'none',
        borderRadius: 0,
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, rgba(30, 30, 46, 0.95) 0%, rgba(54, 0, 181, 0.15) 100%)'
          : 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(124, 58, 237, 0.08) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 -4px 24px rgba(139, 92, 246, 0.2), 0 -1px 0 rgba(139, 92, 246, 0.1)'
          : '0 -4px 24px rgba(124, 58, 237, 0.12), 0 -1px 0 rgba(124, 58, 237, 0.08)',
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
              color: '#3600b5',
              '& .MuiBottomNavigationAction-label': {
                fontSize: '0.7rem',
                fontWeight: 700,
                color: '#3600b5',
              },
              '& .icon-wrapper': {
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.15) 100%)'
                  : 'linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
                transform: 'scale(1.08)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 12px rgba(139, 92, 246, 0.25)'
                  : '0 4px 12px rgba(124, 58, 237, 0.15)',
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
        {modules.map((module) => {
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
