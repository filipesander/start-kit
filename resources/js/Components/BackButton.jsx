import React from 'react';
import { IconButton, Tooltip, useTheme, alpha } from '@mui/material';
import { router } from '@inertiajs/react';
import * as Unicons from '@iconscout/react-unicons';

export default function BackButton({ fallbackRoute, tooltip = "Voltar", ...props }) {
  const theme = useTheme();

  const handleBack = () => {
    // Tenta voltar no histórico
    if (window.history.length > 1) {
      window.history.back();
    } else if (fallbackRoute) {
      // Se não há histórico, vai para rota de fallback
      router.visit(route(fallbackRoute));
    } else {
      // Último recurso: volta para dashboard
      router.visit(route('panel.index'));
    }
  };

  return (
    <Tooltip title={tooltip} arrow>
      <IconButton
        onClick={handleBack}
        sx={{
          width: 40,
          height: 40,
          color: 'inherit',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: theme.palette.mode === 'dark'
              ? alpha('#ffffff', 0.15)
              : alpha('#ffffff', 0.2),
            transform: 'translateX(-4px)',
          },
          '&:active': {
            transform: 'translateX(-4px) scale(0.95)',
          },
          ...props.sx,
        }}
        {...props}
      >
        <Unicons.UilArrowLeft size={24} color="currentColor" />
      </IconButton>
    </Tooltip>
  );
}
