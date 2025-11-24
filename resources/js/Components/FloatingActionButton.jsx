import React, { useState } from 'react';
import {
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Zoom,
  useTheme,
  alpha,
  Tooltip,
} from '@mui/material';
import * as Unicons from '@iconscout/react-unicons';

export default function FloatingActionButton({
  icon: Icon = Unicons.UilPlus,
  actions = [],
  onClick,
  position = { bottom: 88, right: 16 }, // Acima do bottom nav
  color = 'primary',
  size = 'large',
  tooltip = '',
  ...props
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Se não há actions, renderiza um FAB simples
  if (!actions || actions.length === 0) {
    const ButtonComponent = (
      <Zoom in={true} timeout={300}>
        <Fab
          color={color}
          size={size}
          onClick={onClick}
          sx={{
            position: 'fixed',
            ...position,
            boxShadow: theme.palette.mode === 'dark'
              ? '0 8px 24px rgba(0, 0, 0, 0.4)'
              : '0 8px 24px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'scale(1.1) rotate(90deg)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 12px 32px rgba(0, 0, 0, 0.5)'
                : '0 12px 32px rgba(102, 126, 234, 0.4)',
            },
            '&:active': {
              transform: 'scale(0.95)',
            },
            ...props.sx,
          }}
          {...props}
        >
          <Icon size={24} />
        </Fab>
      </Zoom>
    );

    return tooltip ? (
      <Tooltip title={tooltip} placement="left" arrow>
        {ButtonComponent}
      </Tooltip>
    ) : ButtonComponent;
  }

  // Se há actions, renderiza SpeedDial
  return (
    <SpeedDial
      ariaLabel="Ações rápidas"
      sx={{
        position: 'fixed',
        ...position,
        '& .MuiSpeedDial-fab': {
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 24px rgba(0, 0, 0, 0.4)'
            : '0 8px 24px rgba(102, 126, 234, 0.3)',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      }}
      icon={<SpeedDialIcon icon={<Icon size={24} />} />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      FabProps={{
        color: color,
        size: size,
      }}
    >
      {actions.map((action) => {
        const ActionIcon = action.icon || Unicons.UilBolt;
        return (
          <SpeedDialAction
            key={action.name}
            icon={<ActionIcon size={20} />}
            tooltipTitle={action.name}
            tooltipPlacement="left"
            onClick={() => {
              handleClose();
              if (action.onClick) action.onClick();
            }}
            sx={{
              '& .MuiSpeedDialAction-fab': {
                background: action.color
                  ? alpha(theme.palette[action.color]?.main || action.color, 0.9)
                  : theme.palette.background.paper,
                '&:hover': {
                  background: action.color
                    ? theme.palette[action.color]?.main || action.color
                    : theme.palette.action.hover,
                },
              },
            }}
          />
        );
      })}
    </SpeedDial>
  );
}
