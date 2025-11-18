import { Collapse, Icon, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React, { useContext, useState } from 'react';
import { SidebarContext } from '../Authenticated';
import SimpleSidebarItem from './SimpleSidebarItem';

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(3),
  },
  sidebarOpened: {
    paddingLeft: '0px'
  }
}));

const isOpened = (module, currentRoute) => {
  return module.children.reduce((shouldOpened, child) => {
    if (shouldOpened) {
      return shouldOpened;
    }

    if (child.children.length > 0) {
      return isOpened(child, currentRoute);
    }

    return child.route === currentRoute;
  }, false);
}

export default function CollapsibleSidebarItem({ module, currentRoute, onClick }) {
  const sidebar = useContext(SidebarContext);

  const [opened, setOpened] = useState(isOpened(module, currentRoute));

  const classes = useStyles();

  const renderSimpleItem = (item) => (
    <SimpleSidebarItem
      key={`sidebar-item-${item.id}`}
      module={item}
      isSelected={item.route === currentRoute}
      onClick={onClick}
    />
  );

  const renderCollapsibleItem = (item) => (
    <CollapsibleSidebarItem
      key={`sidebar-item-${item.id}`}
      module={item}
      currentRoute={currentRoute}
      onClick={onClick}
    />
  );

  const renderListItem = () => (
    <ListItem
      button
      key={module.id}
      onClick={() => setOpened(!opened)}
    >
      <ListItemIcon style={{
        minWidth: sidebar.isOpen ? '30px' : '50px'
      }}>
        <Icon fontSize={sidebar.isOpen ? 'small' : 'default'}>{module.icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={module.label} className={'sidebar-nav-item'} />
      {opened ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
  );

  return (
    <>
      {sidebar.isOpen && (renderListItem())}
      {!sidebar.isOpen && (
        <Tooltip placement='right' title={module.label} arrow>
          {renderListItem()}
        </Tooltip>
      )}
      <Collapse in={opened} timeout='auto' className={sidebar.isOpen ? 'nav-child-items' : ''} style={{ paddingLeft: sidebar.isOpen ? '25px' : '0px' }}>
        <List component='div' disablePadding>
          {module.children.map(item => item.children.length <= 0
            ? renderSimpleItem(item)
            : renderCollapsibleItem(item)
          )}
        </List>
      </Collapse>
    </>
  );
}
