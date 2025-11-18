import React, {useContext} from 'react';
import {Box, List, ListItemText, styled, useMediaQuery} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import {router, usePage} from '@inertiajs/react';
import {SidebarContext} from '../../Authenticated';
import {CustomEnvironmentLabel, StyledNavItem, StyledNavItemIcon} from "@/Layouts/Components/Sidebar/styles";
import * as Unicons from '@iconscout/react-unicons';
import classNames from "classnames";
const openedMixin = (theme, width) => ({
  width: width,
  height: '100vh',
  paddingTop: '70px', // Space for header
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  overflowY: 'auto',
  background: 'linear-gradient(180deg, rgba(124, 58, 237, 0.03) 0%, rgba(6, 182, 212, 0.03) 100%)',
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRight: '1px solid rgba(124, 58, 237, 0.1)',
  boxShadow: '4px 0 24px rgba(124, 58, 237, 0.08)',
});

const Drawer = styled(MuiDrawer)(({theme, width}) => ({
  width: width,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...openedMixin(theme, width),
  '& .MuiDrawer-paper': openedMixin(theme, width),
}));
export default function Sidebar({}) {
  const sidebar = useContext(SidebarContext);
  const {auth: {user}} = usePage().props;
  const isMobile = useMediaQuery('(max-width: 676px)');

  // Get only current environment modules
  const currentEnvironment = user.current_environment;
  const currentModules = user.menu.find(env => env.slug === currentEnvironment?.slug)?.modules || [];

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={isMobile ? sidebar.isOpen : true}
      width={sidebar.width}
    >
      <Box sx={{ pt: 2 }}>
        <NavSection data={currentModules}/>
      </Box>
      <LogOut />
    </Drawer>
  );
}

function NavSection({data = [], ...other}) {
  const {auth: {user}} = usePage().props;

  return (
    <Box {...other}>
      <List disablePadding sx={{p: 1}}>
        {data.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            isActive={user.current_module.route === item.route}
          />
        ))}
      </List>
    </Box>
  );
}

function NavItem({item, isActive}) {
  const {label, icon, info} = item;
  const CustomIcon = Unicons[icon] ?? 'UilExclamationOctagon';

  return (
    <StyledNavItem
      onClick={() => router.visit(route(item.route))}
      className={classNames({
        'active': isActive,
      })}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      {icon && (
        <StyledNavItemIcon>{React.createElement(CustomIcon, {size: 120})}</StyledNavItemIcon>
      )}

      <ListItemText disableTypography primary={label}/>

      {info && info}
    </StyledNavItem>
  );
}

function LogOut() {
  const { props: { auth } } = usePage();
  const handleLogout = () => router.visit(route(`${auth.guard}.logout`), {
    method: 'post',
  });

  return (
    <List disablePadding sx={{p: 1, paddinTop: 0}}>
      <StyledNavItem onClick={handleLogout}>
        <StyledNavItemIcon>
          <Unicons.UilSignout size={40} />
        </StyledNavItemIcon>
        <ListItemText disableTypography primary='Sair' />
      </StyledNavItem>
    </List>
  )
}
