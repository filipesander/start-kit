import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import {
  alpha,
  Box,
  Divider,
  InputBase,
  List,
  ListItemButton,
  Modal,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import * as Unicons from '@iconscout/react-unicons';

const paletteStyles = (theme) => ({
  width: 'min(600px, 90vw)',
  borderRadius: 18,
  padding: theme.spacing(2.5),
  background: theme.palette.mode === 'dark'
    ? alpha(theme.palette.background.paper, 0.95)
    : alpha('#ffffff', 0.95),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  boxShadow: `0 25px 80px ${alpha(theme.palette.common.black, 0.35)}`,
});

export default function CommandPalette() {
  const {
    auth: { user },
  } = usePage().props;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredCommands, setFilteredCommands] = useState([]);
  const inputRef = useRef(null);

  const environmentLabels = useMemo(() => {
    const map = {};
    (user?.environments || []).forEach((environment) => {
      map[environment.id] = environment.label;
    });
    return map;
  }, [user]);

  const commands = useMemo(() => {
    const modules = user?.modules || [];

    return modules
      .filter((module) => module.route)
      .map((module) => ({
        id: module.id || module.route,
        label: module.label,
        route: module.route,
        environment: module.environment?.label || environmentLabels[module.environment_id],
        icon: module.icon,
      }));
  }, [environmentLabels, user]);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery('');
  }, []);

  const handleSelect = (command) => () => {
    closePalette();
    if (typeof route !== 'function') {
      return;
    }

    router.visit(route(command.route));
  };

  useEffect(() => {
    const handleGlobalSearch = (event) => {
      setOpen(true);
      setQuery(event.detail || '');
    };

    window.addEventListener('global-search', handleGlobalSearch);
    return () => window.removeEventListener('global-search', handleGlobalSearch);
  }, []);

  useEffect(() => {
    const handleHotkey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
        setQuery('');
      }

      if (event.key === 'Escape') {
        closePalette();
      }
    };

    window.addEventListener('keydown', handleHotkey);
    return () => window.removeEventListener('keydown', handleHotkey);
  }, [closePalette]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const results = commands
      .filter((command) => {
        if (!normalizedQuery) return true;
        const searchable = `${command.label} ${command.environment || ''}`.toLowerCase();
        return searchable.includes(normalizedQuery);
      })
      .slice(0, 8);

    setFilteredCommands(results);
  }, [commands, query]);

  return (
    <Modal
      open={open}
      onClose={closePalette}
      aria-labelledby="command-palette"
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        mt: { xs: '15vh', md: '20vh' },
      }}
    >
      <Box sx={(theme) => paletteStyles(theme)}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 1.5,
            py: 1,
            borderRadius: 999,
            border: (theme) => `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
            background: (theme) => alpha(theme.palette.background.default, 0.7),
          }}
        >
          <SearchIcon fontSize="small" />
          <InputBase
            inputRef={inputRef}
            fullWidth
            placeholder="Busque módulos ou ações..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            sx={{
              '& .MuiInputBase-input': { p: 0 },
            }}
          />
          <Typography variant="caption" sx={{ opacity: 0.6 }}>
            Esc para sair
          </Typography>
        </Box>

        <Divider sx={{ my: 2, opacity: 0.4 }} />

        {filteredCommands.length > 0 ? (
          <List sx={{ width: '100%', p: 0 }}>
            {filteredCommands.map((command) => {
              const Icon = command.icon && Unicons[command.icon];

              return (
                <ListItemButton
                  key={command.id}
                  onClick={handleSelect(command)}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    px: 1.5,
                    py: 1,
                    border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                    '&:hover': {
                      borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
                      boxShadow: (theme) => `0 8px 16px ${alpha(theme.palette.primary.main, 0.15)}`,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {Icon && <Icon size={18} />}
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {command.label}
                    </Typography>
                  </Box>
                  {command.environment && (
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', mt: 0.5 }}
                    >
                      {command.environment}
                    </Typography>
                  )}
                </ListItemButton>
              );
            })}
          </List>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Nada encontrado para “{query}”
            </Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
