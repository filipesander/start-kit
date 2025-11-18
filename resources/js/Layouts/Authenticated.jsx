import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Topbar from '@/Layouts/Components/Topbar';
import Header from '@/Layouts/Components/Header';
import { Head, usePage } from '@inertiajs/react';
import { SnackbarProvider } from 'notistack';
import {Box, Button, useMediaQuery} from '@mui/material';
import { Close } from '@mui/icons-material';
import FlashNotifications from './Components/FlashNotifications';
import Sidebar from "@/Layouts/Components/Sidebar";
import ThemeProvider from "@/theme";

const defaultSidebarConfig = {
  width: 280,
  isOpen: false,
  toggleIsOpen: () => { },
};
export const SidebarContext = React.createContext(defaultSidebarConfig);
const Authenticated = ({ title, children }) => {
  const {
    auth: {
      user,
    },
  } = usePage().props;

  const [sidebarIsOpen, setSidebarIsOpen] = useState(defaultSidebarConfig.isOpen);
  const isMobile = useMediaQuery('(max-width: 676px)');

  const toggleSidebarIsOpen = () => {
    const isOpen = !sidebarIsOpen;
    setSidebarIsOpen(isOpen);
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
      <ThemeProvider>
        <CssBaseline />

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
              toggleIsOpen: toggleSidebarIsOpen,
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
                    p: 3,
                    mt: isMobile ? '64px' : '70px', // Margin top for fixed header
                    backgroundColor: 'background.default',
                  }}
                >
                  {React.Children.map(children, (child) => React.cloneElement(child))}
                </Box>
              </Box>
            </Box>
          </SidebarContext.Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}


export default Authenticated;
