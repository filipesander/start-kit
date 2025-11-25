import React, { useState } from 'react';
import Topbar from '@/Layouts/Components/Topbar';
import Header from '@/Layouts/Components/Header';
import BottomNavigation from '@/Layouts/Components/BottomNavigation';
import { Head, usePage } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../css/toast-custom.css';
import {Box, useMediaQuery} from '@mui/material';
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

  return (
    <>
      <Head title={user.current_module.label || title} />

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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          limit={5}
        />

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
                  mb: isMobile ? '68px' : 0, // Espaço para bottom nav (reduzido)
                  minHeight: isMobile ? 'calc(100vh - 64px - 68px)' : 'auto',
                  overflowX: 'hidden',
                  WebkitOverflowScrolling: 'touch',
                  position: 'relative',
                }}
              >
                {React.Children.map(children, (child) => React.cloneElement(child))}
              </Box>

              {/* Bottom Navigation - Mobile Only */}
              {isMobile && <BottomNavigation />}
            </Box>
          </Box>
        </SidebarContext.Provider>
    </>
  );
}


export default Authenticated;
