import React, { useContext } from "react";
import { Box, IconButton, Toolbar, styled } from "@mui/material";
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import UserMenu from "@/Layouts/Components/UserMenu";
import EnvironmentsMenu from "@/Layouts/Components/EnvironmentsMenu";
import { SidebarContext } from "../Authenticated";

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

  return (
    <AppBar position='fixed' open={sidebar.isOpen} width={sidebar.width} color='primary' enableColorOnDark>
      <Toolbar>
        <IconButton
          color='inherit'
          edge='start'
          size='large'
          sx={{ marginRight: 5 }}
          onClick={() => sidebar.toggleIsOpen()}
        >
          {sidebar.isOpen && <CloseIcon />}
          {!sidebar.isOpen && <MenuIcon />}
        </IconButton>

        <EnvironmentsMenu />

        <Box sx={{ flexGrow: 1 }} />

        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};
