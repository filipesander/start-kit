import React, { useContext } from "react";
import { Box, IconButton, Toolbar, styled, alpha } from "@mui/material";
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import UserMenu from "@/Layouts/Components/UserMenu";
import EnvironmentsMenu from "@/Layouts/Components/EnvironmentsMenu";
import BackButton from "@/Components/BackButton";
import { SidebarContext } from "../Authenticated";
import { usePage } from "@inertiajs/react";

const AppBar = styled(MuiAppBar)(({ theme, open, width }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: width,
    width: `calc(100% - ${width}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Topbar({ }) {
  const sidebar = useContext(SidebarContext);
  const { url } = usePage();

  // Detecta se está em página interna (não é dashboard/home)
  const showBackButton = !url.includes('/dashboard') && !url.endsWith('/panel');

  return (
    <AppBar
      position='fixed'
      open={sidebar.isOpen}
      width={sidebar.width}
      enableColorOnDark
      sx={{
        background: (theme) => theme.palette.mode === 'dark'
          ? alpha(theme.palette.background.paper, 0.95)
          : alpha(theme.palette.primary.main, 0.98),
        backdropFilter: 'blur(20px)',
        boxShadow: (theme) => theme.palette.mode === 'dark'
          ? '0 4px 24px rgba(0, 0, 0, 0.3)'
          : '0 4px 24px rgba(102, 126, 234, 0.15)',
      }}
    >
      <Toolbar sx={{ minHeight: '64px !important', gap: 1 }}>
        {/* Botão Voltar ou Menu */}
        {showBackButton ? (
          <BackButton
            sx={{
              mr: 0.5,
              color: 'inherit',
              '& svg': {
                color: 'inherit'
              }
            }}
          />
        ) : (
          <IconButton
            color='inherit'
            edge='start'
            size='large'
            onClick={() => sidebar.toggleIsOpen()}
            sx={{
              transition: 'all 0.3s ease',
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            {sidebar.isOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        )}

        {/* Environment Selector */}
        <EnvironmentsMenu />

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* User Menu */}
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};
