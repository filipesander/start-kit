import React, { useState } from 'react';
import Topbar from '@/Layouts/Components/Topbar';
import Header from '@/Layouts/Components/Header';
import { Head, usePage } from '@inertiajs/react';
import { SnackbarProvider } from 'notistack';
import {Box, Button, useMediaQuery} from '@mui/material';
import { Close } from '@mui/icons-material';
import FlashNotifications from './Components/FlashNotifications';
import Sidebar from "@/Layouts/Components/Sidebar";

const defaultSidebarConfig = {
  width: 280,
  collapsedWidth: 80,
  isOpen: false,
  isCollapsed: false,
  toggleIsOpen: () => { },
  toggleCollapsed: () => { },
};
export const SidebarContext = React.createContext(defaultSidebarConfig);
const Authenticated = ({ title, children }) => {
  const {
    auth: {
      user,
    },
  } = usePage().props;

  const [sidebarIsOpen, setSidebarIsOpen] = useState(defaultSidebarConfig.isOpen);
  const [sidebarIsCollapsed, setSidebarIsCollapsed] = useState(() => {
    // Recupera o estado do localStorage
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const isMobile = useMediaQuery('(max-width: 676px)');

  const toggleSidebarIsOpen = () => {
    const isOpen = !sidebarIsOpen;
    setSidebarIsOpen(isOpen);
  };

  const toggleSidebarCollapsed = () => {
    const collapsed = !sidebarIsCollapsed;
    setSidebarIsCollapsed(collapsed);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  };

  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  const notistackDismissAction = (key) => (
    <Button onClick={onClickDismiss(key)} variant='text' color='inherit' size='small'>
      <Close />
    </Button>
  );

  return (
    <>
      <Head title={user.current_module.label || title} />

      <SnackbarProvider
        maxSnack={15}
        ref={notistackRef}
        action={notistackDismissAction}
        autoHideDuration={10000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <SidebarContext.Provider
          value={{
            ...defaultSidebarConfig,
            isOpen: sidebarIsOpen,
            isCollapsed: sidebarIsCollapsed,
            toggleIsOpen: toggleSidebarIsOpen,
            toggleCollapsed: toggleSidebarCollapsed,
          }}
        >
          <FlashNotifications />

          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Header - Desktop */}
              {!isMobile && <Header />}

              {/* Topbar - Mobile */}
              {isMobile && <Topbar />}

              {/* Page Content */}
              <Box
                component='main'
                sx={{
                  flexGrow: 1,
                  p: isMobile ? 2 : 3,
                  mt: isMobile ? '64px' : '14px',
                  minHeight: isMobile ? 'calc(100vh - 64px)' : 'auto',
                  overflowX: 'hidden',
                  WebkitOverflowScrolling: 'touch',
                  position: 'relative',
                }}
              >
                {React.Children.map(children, (child) => React.cloneElement(child))}
              </Box>
            </Box>
          </Box>
        </SidebarContext.Provider>
      </SnackbarProvider>
    </>
  );
}


export default Authenticated;
