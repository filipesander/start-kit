import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Badge,
  Box,
  Divider,
  Avatar,
  alpha,
  Button,
} from '@mui/material';
import {
  Notifications,
  CheckCircle,
  Warning,
  Info,
  Error as ErrorIcon,
  MarkEmailRead,
} from '@mui/icons-material';

export default function NotificationsMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  // Exemplo de notificações - futuramente virá do backend
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Atualização concluída',
      message: 'Seu perfil foi atualizado com sucesso',
      time: '5 min atrás',
      read: false,
    },
    {
      id: 2,
      type: 'warning',
      title: 'Atenção necessária',
      message: 'Você tem tarefas pendentes para revisar',
      time: '1 hora atrás',
      read: false,
    },
    {
      id: 3,
      type: 'info',
      title: 'Nova funcionalidade',
      message: 'Confira as novas ferramentas disponíveis',
      time: '2 horas atrás',
      read: true,
    },
    {
      id: 4,
      type: 'error',
      title: 'Erro no processamento',
      message: 'Falha ao processar último relatório',
      time: 'Ontem',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    const iconProps = { sx: { fontSize: 20 } };
    switch (type) {
      case 'success':
        return <CheckCircle {...iconProps} color="success" />;
      case 'warning':
        return <Warning {...iconProps} color="warning" />;
      case 'error':
        return <ErrorIcon {...iconProps} color="error" />;
      default:
        return <Info {...iconProps} color="info" />;
    }
  };

  const getIconBgColor = (type) => {
    switch (type) {
      case 'success':
        return 'success.main';
      case 'warning':
        return 'warning.main';
      case 'error':
        return 'error.main';
      default:
        return 'info.main';
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          position: 'relative',
          color: 'white',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
            transform: 'scale(1.1)',
          },
        }}
      >
        <Badge badgeContent={unreadCount} color="error">
          <Notifications sx={{ color: 'white' }} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        disableScrollLock={true}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: 380,
            maxWidth: 420,
            borderRadius: 2.5,
            mt: 1.5,
            background: (theme) => theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.95)
              : '#ffffff',
            backdropFilter: 'blur(20px)',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            boxShadow: (theme) => `0 12px 32px ${alpha(theme.palette.common.black, 0.15)}`,
            overflow: 'visible',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
            },
          },
        }}
      >
        {/* Header */}
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
            Notificações
          </Typography>
          {unreadCount > 0 && (
            <Button
              size="small"
              onClick={handleMarkAllAsRead}
              startIcon={<MarkEmailRead sx={{ fontSize: 16 }} />}
              sx={{
                fontSize: '0.75rem',
                textTransform: 'none',
                color: 'primary.main',
              }}
            >
              Marcar todas como lidas
            </Button>
          )}
        </Box>

        <Divider />

        {/* Notifications List */}
        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
          {notifications.length === 0 ? (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Notifications sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Nenhuma notificação
              </Typography>
            </Box>
          ) : (
            notifications.map((notification) => (
              <MenuItem
                key={notification.id}
                onClick={() => handleMarkAsRead(notification.id)}
                sx={{
                  py: 1.5,
                  px: 2,
                  mx: 0.5,
                  my: 0.5,
                  borderRadius: 1.5,
                  alignItems: 'flex-start',
                  transition: 'all 0.2s ease',
                  backgroundColor: !notification.read
                    ? (theme) => alpha(theme.palette.primary.main, 0.05)
                    : 'transparent',
                  borderLeft: !notification.read
                    ? (theme) => `3px solid ${theme.palette.primary.main}`
                    : 'none',
                  '&:hover': {
                    background: (theme) => alpha(theme.palette.primary.main, 0.08),
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1.5,
                    flexShrink: 0,
                    background: (theme) => alpha(theme.palette[notification.type === 'error' ? 'error' : notification.type].main, 0.1),
                  }}
                >
                  {getIcon(notification.type)}
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: notification.read ? 600 : 700,
                        fontSize: '0.875rem',
                      }}
                    >
                      {notification.title}
                    </Typography>
                    {!notification.read && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: 'primary.main',
                          flexShrink: 0,
                          ml: 1,
                        }}
                      />
                    )}
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: '0.8rem',
                      mb: 0.5,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {notification.message}
                  </Typography>
                  <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.7rem' }}>
                    {notification.time}
                  </Typography>
                </Box>
              </MenuItem>
            ))
          )}
        </Box>

        <Divider />

        {/* Footer */}
        <Box sx={{ p: 1, textAlign: 'center' }}>
          <Button
            fullWidth
            size="small"
            sx={{
              textTransform: 'none',
              color: 'primary.main',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            Ver todas as notificações
          </Button>
        </Box>
      </Menu>
    </>
  );
}
