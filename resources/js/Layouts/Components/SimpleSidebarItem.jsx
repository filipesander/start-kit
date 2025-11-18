import { Icon, ListItem, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import React, { useContext } from "react";
import { SidebarContext } from "../Authenticated";

export default function SimpleSidebarItem({ module, isSelected, onClick, className }) {
  const sidebar = useContext(SidebarContext);

  const renderItem = () => (
    <ListItem
      button
      selected={isSelected}
      onClick={() => onClick(route(module.route))}
      className={className}
    >
      <ListItemIcon style={{
        minWidth: sidebar.isOpen ? '30px' : '50px'
      }}>
        <Icon fontSize={sidebar.isOpen ? 'small' : 'default'}>{module.icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={module.label} className={'sidebar-nav-item'} />
    </ListItem>
  );

  if (sidebar.isOpen) {
    return renderItem();
  }

  return (
    <Tooltip placement='right' title={module.label} arrow>
      {renderItem()}
    </Tooltip>
  );
}
