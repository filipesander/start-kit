import React from 'react';
import { Box, Card, CardContent, Grid, Typography, Avatar, LinearProgress, Chip } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import withAuthenticated from "@/hoc/withAuthenticated";
import DefaultPage from "@/Layouts/Components/DefaultPage";
import * as Unicons from '@iconscout/react-unicons';

// Styled Components
const GradientCard = styled(Card)(({ theme, gradient }) => ({
  background: gradient || theme.palette.gradients.primary,
  color: '#fff',
  borderRadius: 16,
  overflow: 'hidden',
  position: 'relative',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100px',
    height: '100px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    transform: 'translate(30%, -30%)',
  },
}));

const StatsCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(3),
  height: '100%',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
    borderColor: theme.palette.primary.main,
  },
}));

const IconWrapper = styled(Box)(({ theme, bgcolor }) => ({
  width: 56,
  height: 56,
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: bgcolor || alpha(theme.palette.primary.main, 0.1),
  marginBottom: theme.spacing(2),
}));

const QuickActionCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
    borderColor: theme.palette.primary.main,
  },
}));

const Dashboard = ({ stats = {} }) => {
  // Mock data - você pode substituir por dados reais da API
  const mockStats = {
    totalUsers: stats.totalUsers || 1234,
    activeUsers: stats.activeUsers || 892,
    newUsersToday: stats.newUsersToday || 24,
    totalGroups: stats.totalGroups || 12,
  };

  const welcomeCards = [
    {
      title: 'Total de Usuários',
      value: mockStats.totalUsers,
      icon: <Unicons.UilUsers size={32} />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#667eea',
    },
    {
      title: 'Usuários Ativos',
      value: mockStats.activeUsers,
      icon: <Unicons.UilUserCheck size={32} />,
      gradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
      color: '#06B6D4',
    },
    {
      title: 'Novos Hoje',
      value: mockStats.newUsersToday,
      icon: <Unicons.UilUserPlus size={32} />,
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      color: '#10B981',
    },
    {
      title: 'Total de Grupos',
      value: mockStats.totalGroups,
      icon: <Unicons.UilLayerGroup size={32} />,
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
      color: '#F59E0B',
    },
  ];

  const quickActions = [
    {
      title: 'Novo Usuário',
      icon: <Unicons.UilUserPlus size={24} />,
      color: '#7C3AED',
      route: 'panel.main.users.create',
    },
    {
      title: 'Novo Grupo',
      icon: <Unicons.UilLayerGroup size={24} />,
      color: '#06B6D4',
      route: 'panel.main.groups.create',
    },
    {
      title: 'Ver Usuários',
      icon: <Unicons.UilUsers size={24} />,
      color: '#10B981',
      route: 'panel.main.users.index',
    },
    {
      title: 'Ver Grupos',
      icon: <Unicons.UilSetting size={24} />,
      color: '#F59E0B',
      route: 'panel.main.groups.index',
    },
  ];

  const recentActivities = [
    { user: 'João Silva', action: 'criou um novo usuário', time: 'Há 5 minutos', avatar: '👤' },
    { user: 'Maria Santos', action: 'atualizou permissões', time: 'Há 15 minutos', avatar: '👤' },
    { user: 'Pedro Costa', action: 'criou um grupo', time: 'Há 1 hora', avatar: '👤' },
    { user: 'Ana Lima', action: 'removeu um usuário', time: 'Há 2 horas', avatar: '👤' },
  ];

  return (
    <DefaultPage>
      <Box sx={{ pb: 4 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Bem-vindo de volta! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Aqui está um resumo do seu sistema hoje
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {welcomeCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <GradientCard gradient={card.gradient}>
                <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {card.icon}
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {card.value.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {card.title}
                  </Typography>
                </CardContent>
              </GradientCard>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Quick Actions */}
          <Grid item xs={12} md={8}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Ações Rápidas
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <QuickActionCard>
                    <Box sx={{ textAlign: 'center', py: 1 }}>
                      <IconWrapper
                        bgcolor={alpha(action.color, 0.1)}
                        sx={{ margin: '0 auto 12px' }}
                      >
                        <Box sx={{ color: action.color }}>
                          {action.icon}
                        </Box>
                      </IconWrapper>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {action.title}
                      </Typography>
                    </Box>
                  </QuickActionCard>
                </Grid>
              ))}
            </Grid>

            {/* System Health */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Status do Sistema
              </Typography>
              <StatsCard>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <IconWrapper bgcolor={alpha('#10B981', 0.1)} sx={{ mr: 2, width: 48, height: 48 }}>
                        <Unicons.UilServer size={24} color="#10B981" />
                      </IconWrapper>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Uso de CPU
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          32%
                        </Typography>
                      </Box>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={32}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: alpha('#10B981', 0.1),
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)',
                          borderRadius: 4,
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <IconWrapper bgcolor={alpha('#3B82F6', 0.1)} sx={{ mr: 2, width: 48, height: 48 }}>
                        <Unicons.UilDatabase size={24} color="#3B82F6" />
                      </IconWrapper>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Uso de Memória
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          58%
                        </Typography>
                      </Box>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={58}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: alpha('#3B82F6', 0.1),
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                          borderRadius: 4,
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </StatsCard>
            </Box>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Atividades Recentes
            </Typography>
            <StatsCard sx={{ maxHeight: '500px', overflowY: 'auto' }}>
              {recentActivities.map((activity, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    mb: 3,
                    pb: 3,
                    borderBottom: index < recentActivities.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      mr: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}
                  >
                    {activity.avatar}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {activity.user}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      {activity.action}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </StatsCard>
          </Grid>
        </Grid>
      </Box>
    </DefaultPage>
  );
};

export default withAuthenticated(Dashboard);
