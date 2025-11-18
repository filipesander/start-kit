import { AppBar, Grid, Toolbar } from "@mui/material";
import { makeStyles } from '@mui/styles';
import React, { useContext } from "react";
import clsx from 'clsx';
import { SidebarContext } from "../Authenticated";

const useStyles = makeStyles(theme => ({
  bottomBar: {
    top: 'auto',
    bottom: 0,
    borderTop: `1px solid ${theme.palette.divider}`,
    zIndex: theme.zIndex.drawer - 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  bottomBarShift: {
    marginLeft: props => props.sidebarWidth,
    width: props => `calc(100% - ${props.sidebarWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function BottomBar({ children }) {
  const sidebar = useContext(SidebarContext);

  const classes = useStyles({
    sidebarWidth: sidebar.width,
  });

  return (
    <AppBar
      component='div'
      elevation={0}
      color='inherit'
      position='fixed'
      className={clsx(classes.bottomBar, {
        [classes.bottomBarShift]: sidebar.isOpen,
      })}
    >
      <Toolbar>
        <div className={classes.grow} />

        <Grid container spacing={2} justifyContent='flex-end'>
          {React.Children.map(children, (child, index) => (
            <Grid key={`bottom-bar-child-${index}`} item lg>
              {child}
            </Grid>
          ))}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
