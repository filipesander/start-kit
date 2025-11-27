import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {Box, List, ListItemText, styled, useMediaQuery, Typography, alpha, IconButton, Tooltip, Backdrop, Chip, Button, LinearProgress, Stack} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import {router, usePage} from '@inertiajs/react';
import {SidebarContext} from '../../Authenticated';
import {StyledNavItem, StyledNavItemIcon} from "@/Layouts/Components/Sidebar/styles";
import * as Unicons from '@iconscout/react-unicons';
import classNames from "classnames";
import ThemeToggle from '@/Layouts/Components/ThemeToggle';
import ChangeCompany from '@/Layouts/Components/ChangeCompany';

const openedMixin = (theme, width) => ({
  width: width,
  height: '100vh',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  overflowY: 'auto',
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(180deg, rgba(124, 58, 237, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)`
    : `linear-gradient(180deg, rgba(124, 58, 237, 0.03) 0%, rgba(6, 182, 212, 0.03) 100%)`,
  backdropFilter: 'blur(10px)',
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '4px 0 24px rgba(0, 0, 0, 0.3)'
    : '4px 0 24px rgba(124, 58, 237, 0.08)',
  zIndex: theme.zIndex.drawer + 1,
});

const closedMixin = (theme, width) => ({
  width: width,
  height: '100vh',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  overflowY: 'auto',
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(180deg, rgba(124, 58, 237, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)`
    : `linear-gradient(180deg, rgba(124, 58, 237, 0.03) 0%, rgba(6, 182, 212, 0.03) 100%)`,
  backdropFilter: 'blur(10px)',
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '4px 0 24px rgba(0, 0, 0, 0.3)'
    : '4px 0 24px rgba(124, 58, 237, 0.08)',
  zIndex: theme.zIndex.drawer + 1,
});

const Drawer = styled(MuiDrawer)(({theme, width, collapsed, collapsedwidth}) => ({
  width: collapsed ? collapsedwidth : width,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(collapsed ? closedMixin(theme, collapsedwidth) : openedMixin(theme, width)),
  '& .MuiDrawer-paper': collapsed ? closedMixin(theme, collapsedwidth) : openedMixin(theme, width),
}));

export default function Sidebar({}) {
  const sidebar = useContext(SidebarContext);
  const {auth: {user}} = usePage().props;
  const isMobile = useMediaQuery('(max-width: 676px)');

  // Touch gesture states
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const drawerRef = useRef(null);
  const [lastSync, setLastSync] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setLastSync(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const formattedLastSync = useMemo(() => lastSync.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }), [lastSync]);

  // Get only current environment modules
  const currentEnvironment = user.current_environment;
  const environmentChipLabel = currentEnvironment?.label || 'Ambiente ativo';
  const environmentChipCode = currentEnvironment?.slug ? currentEnvironment.slug.toUpperCase() : 'OPERACIONAL';
  const currentModules = user.menu.find(env => env.slug === currentEnvironment?.slug)?.modules || [];

  // Swipe gesture detection - mínimo 50px para considerar um swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && sidebar.isOpen) {
      sidebar.toggleIsOpen();
    }

    if (isRightSwipe && !sidebar.isOpen && touchStart < 50) {
      sidebar.toggleIsOpen();
    }
  };

  // Edge swipe to open (detecta swipe da borda esquerda)
  useEffect(() => {
    if (!isMobile) return;

    const handleEdgeSwipe = (e) => {
      const touch = e.touches[0];
      // Se o toque começar nos primeiros 30px da tela e a sidebar estiver fechada
      if (touch.clientX < 30 && !sidebar.isOpen) {
        setTouchStart(touch.clientX);
      }
    };

    document.addEventListener('touchstart', handleEdgeSwipe, { passive: true });
    return () => document.removeEventListener('touchstart', handleEdgeSwipe);
  }, [isMobile, sidebar.isOpen]);

  return (
    <>
      {/* Backdrop moderno para mobile */}
      {isMobile && (
        <Backdrop
          open={sidebar.isOpen}
          onClick={sidebar.toggleIsOpen}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      )}

      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={isMobile ? sidebar.isOpen : true}
        width={sidebar.width}
        collapsed={sidebar.isCollapsed}
        collapsedwidth={sidebar.collapsedWidth}
        onTouchStart={isMobile ? onTouchStart : undefined}
        onTouchMove={isMobile ? onTouchMove : undefined}
        onTouchEnd={isMobile ? onTouchEnd : undefined}
        ref={drawerRef}
        ModalProps={{
          keepMounted: true, // Melhor performance no mobile
          disableScrollLock: true,
        }}
        PaperProps={{
          sx: {
            touchAction: 'pan-y',
            overscrollBehavior: 'contain',
          }
        }}
      >
        {/* Logo / controls section */}
        <Box
          sx={{
            position: 'relative',
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: sidebar.isCollapsed ? 'center' : 'space-between',
            px: sidebar.isCollapsed ? 1.5 : 2,
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            background: (theme) => theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.6)
              : alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            gap: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, flex: sidebar.isCollapsed ? 'unset' : 1 }}>
            <Tooltip title={sidebar.isCollapsed ? "Sistema" : ""} placement="right" arrow>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2.5,
                  background: (theme) => theme.palette.gradients?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: sidebar.isCollapsed ? 0 : 1.5,
                  boxShadow: (theme) => `0 8px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                  transition: 'all 0.3s ease',
                  flexShrink: 0,
                  '&:hover': {
                    transform: 'scale(1.05) rotate(-5deg)',
                    boxShadow: (theme) => `0 12px 24px ${alpha(theme.palette.primary.main, 0.5)}`,
                  },
                }}
              >
                <Unicons.UilRocket size={26} color="#fff" />
              </Box>
            </Tooltip>
            {!sidebar.isCollapsed && (
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    background: (theme) => theme.palette.gradients?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '1.25rem',
                    letterSpacing: '-0.5px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Sistema
                </Typography>
              </Box>
            )}
          </Box>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              position: sidebar.isCollapsed ? 'absolute' : 'static',
              right: sidebar.isCollapsed ? 12 : 'auto',
              top: sidebar.isCollapsed ? '50%' : 'auto',
              transform: sidebar.isCollapsed ? 'translateY(-50%)' : 'none',
            }}
          >


            {!isMobile && (
              <Tooltip title={sidebar.isCollapsed ? "Expandir menu" : "Recolher menu"} placement="bottom" arrow>
                <IconButton
                  onClick={sidebar.toggleCollapsed}
                  sx={{
                    width: 36,
                    height: 36,
                    background: (theme) => alpha(theme.palette.primary.main, 0.1),
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: (theme) => alpha(theme.palette.primary.main, 0.2),
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  {sidebar.isCollapsed ? (
                    <Unicons.UilAngleDoubleRight size={20} color="currentColor" />
                  ) : (
                    <Unicons.UilAngleDoubleLeft size={20} color="currentColor" />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100% - 70px)',
          }}
        >
          <Box sx={{ pt: 2, flex: 1, overflowY: 'auto' }}>
            {!sidebar.isCollapsed && <ChangeCompany />}
            <NavSection data={currentModules} isCollapsed={sidebar.isCollapsed} />
          </Box>
          <LogOut />
        </Box>
      </Drawer>
    </>
  );
}

function NavSection({data = [], isCollapsed, ...other}) {
  const {auth: {user}} = usePage().props;
  const hasSections = !isCollapsed && data.length > 0;

  return (
    <Box {...other}>
      <List disablePadding sx={{p: 1}}>
        {data.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            isActive={user.current_module.route === item.route}
            isCollapsed={isCollapsed}
          />
        ))}
      </List>
    </Box>
  );
}

function NavItem({item, isActive, isCollapsed}) {
  const {label, icon, info} = item;
  const CustomIcon = Unicons[icon] ?? 'UilExclamationOctagon';

  const navItemContent = (
    <StyledNavItem
      onClick={() => router.visit(route(item.route))}
      className={classNames({
        'active': isActive,
      })}
      sx={{
        justifyContent: isCollapsed ? 'center' : 'flex-start',
        px: isCollapsed ? 1 : 2,
      }}
    >
      {icon && (
        <StyledNavItemIcon sx={{ mr: isCollapsed ? 0 : 2, minWidth: isCollapsed ? 'auto' : '40px' }}>
          {React.createElement(CustomIcon, {size: 24})}
        </StyledNavItemIcon>
      )}

      {!isCollapsed && (
        <>
          <ListItemText
            disableTypography
            primary={label}
            sx={{
              fontWeight: 600,
              letterSpacing: '-0.2px',
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {info && info}
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: isActive ? 'success.main' : 'transparent',
                boxShadow: isActive ? (theme) => `0 0 0 6px ${alpha(theme.palette.success.main, 0.2)}` : 'none',
                transition: 'all 0.3s ease',
              }}
            />
          </Box>
        </>
      )}
    </StyledNavItem>
  );

  // Quando colapsado, envolve com Tooltip
  if (isCollapsed) {
    return (
      <Tooltip title={label} placement="right" arrow>
        {navItemContent}
      </Tooltip>
    );
  }

  return navItemContent;
}

function LogOut() {
  const { props: { auth } } = usePage();
  const sidebar = useContext(SidebarContext);
  const handleLogout = () => router.visit(route(`${auth.guard}.logout`), {
    method: 'post',
  });

  const logoutButton = (
    <Box
      onClick={handleLogout}
      sx={{
        mx: 1,
        mb: 2,
        mt: 'auto',
        p: sidebar.isCollapsed ? 1.5 : 2,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: sidebar.isCollapsed ? 'center' : 'flex-start',
        gap: 1.5,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        background: (theme) => theme.palette.mode === 'dark'
          ? alpha(theme.palette.error.main, 0.1)
          : alpha(theme.palette.error.main, 0.05),
        border: (theme) => `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
        color: 'error.main',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0)} 0%, ${alpha(theme.palette.error.main, 0.1)} 100%)`,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover': {
          transform: 'translateY(-2px)',
          background: (theme) => theme.palette.mode === 'dark'
            ? alpha(theme.palette.error.main, 0.15)
            : alpha(theme.palette.error.main, 0.08),
          borderColor: (theme) => alpha(theme.palette.error.main, 0.4),
          boxShadow: (theme) => `0 8px 16px ${alpha(theme.palette.error.main, 0.25)}`,
          '&:before': {
            opacity: 1,
          },
        },
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: (theme) => alpha(theme.palette.error.main, 0.15),
          color: 'error.main',
          transition: 'all 0.3s ease',
          zIndex: 1,
          '.MuiBox-root:hover &': {
            transform: 'rotate(-10deg) scale(1.1)',
            background: (theme) => alpha(theme.palette.error.main, 0.25),
          },
        }}
      >
        <Unicons.UilSignout size={20} />
      </Box>
      {!sidebar.isCollapsed && (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            fontSize: '0.875rem',
            zIndex: 1,
          }}
        >
          Sair
        </Typography>
      )}
    </Box>
  );

  if (sidebar.isCollapsed) {
    return (
      <Tooltip title="Sair" placement="right" arrow>
        {logoutButton}
      </Tooltip>
    );
  }

  return logoutButton;
}
