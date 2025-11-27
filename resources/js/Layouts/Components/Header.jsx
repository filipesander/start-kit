import React from 'react';
import { usePage } from '@inertiajs/react';
import {
  AppBar,
  Box,
  Divider,
  InputBase,
  Toolbar,
  Typography,
  alpha,
  styled,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EnvironmentsMenu from './EnvironmentsMenu';
import NotificationsMenu from './NotificationsMenu';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.9)} 0%, ${alpha(theme.palette.secondary.dark, 0.9)} 100%)`
    : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)} 0%, ${alpha(theme.palette.secondary.main, 0.9)} 100%)`,
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.15)}`,
  boxShadow: theme.palette.mode === 'dark'
    ? `0 12px 24px ${alpha(theme.palette.common.black, 0.6)}`
    : `0 10px 24px ${alpha(theme.palette.primary.main, 0.35)}`,
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: 999,
  padding: theme.spacing(0.75, 2),
  width: '100%',
  maxWidth: 420,
  background: alpha(theme.palette.common.white, 0.12),
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  boxShadow: `0 8px 20px ${alpha(theme.palette.common.black, 0.2)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:focus-within': {
    background: alpha(theme.palette.common.white, 0.18),
    borderColor: alpha(theme.palette.common.white, 0.4),
    boxShadow: `0 16px 32px ${alpha(theme.palette.primary.main, 0.35)}`,
  },
}));

export default function Header() {
  const {
    auth: { user },
  } = usePage().props;

  const moduleLabel = user?.current_module?.label ?? 'Painel';
  const environmentLabel = user?.current_environment?.label ?? 'Ambiente ativo';

  const handleSearchKeyDown = (event) => {
    if (event.key !== 'Enter') return;

    const query = event.currentTarget.value.trim();
    if (!query) return;

    window.dispatchEvent(new CustomEvent('global-search', { detail: query }));
  };

  return (
    <StyledAppBar position="relative" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          gap: 2,
          minHeight: '76px !important',
          px: { xs: 2, md: 3 },
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {/* Left cluster */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            minWidth: 0,
            flex: 1,
          }}
        >
          <EnvironmentsMenu />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              gap: 0.25,
              color: '#fff',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              {environmentLabel}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                letterSpacing: -0.4,
                color: '#fff',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {moduleLabel}
            </Typography>
          </Box>
        </Box>

        {/* Search */}
        <SearchContainer sx={{ flex: 1 }}>
          <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.85)' }} fontSize="small" />
          <InputBase
            placeholder="Buscar em todo o sistema"
            inputProps={{ 'aria-label': 'buscar em todo o sistema' }}
            onKeyDown={handleSearchKeyDown}
            sx={{
              ml: 1,
              flex: 1,
              color: '#fff',
              '& .MuiInputBase-input': {
                padding: 0,
              },
            }}
          />
          <Box
            sx={{
              ml: 1,
              px: 1,
              py: 0.25,
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            Ctrl + K
          </Box>
        </SearchContainer>

        {/* Actions */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            flexWrap: 'nowrap',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1.25,
              py: 0.5,
              borderRadius: 999,
              background: (theme) => alpha(theme.palette.common.white, 0.12),
              border: (theme) => `1px solid ${alpha(theme.palette.common.white, 0.25)}`,
              boxShadow: (theme) => `0 6px 16px ${alpha(theme.palette.common.black, 0.2)}`,
            }}
          >
            <ThemeToggle />
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: (theme) => alpha(theme.palette.common.white, 0.3),
                height: 20,
              }}
            />
            <NotificationsMenu />
          </Box>

          <Box
            sx={{
              pl: 1.5,
              borderLeft: (theme) => `1px solid ${alpha(theme.palette.common.white, 0.25)}`,
            }}
          >
            <UserMenu />
          </Box>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}
