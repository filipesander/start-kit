import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Collapse,
  IconButton,
  Chip,
  Stack,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Tooltip,
  Fade,
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

/**
 * Componente de filtros para DataTable
 *
 * @param {Array} filters - Array de configuração de filtros
 * Exemplo:
 * [
 *   {
 *     field: 'name',
 *     label: 'Nome',
 *     type: 'text', // text, select, date
 *     operator: 'contains', // contains, equals, startsWith, endsWith
 *     options: [], // Somente para type='select'
 *   }
 * ]
 *
 * @param {Function} onFilterChange - Callback chamado quando os filtros mudam
 * @param {Object} initialValues - Valores iniciais dos filtros
 */
const TableFilters = ({ filters = [], onFilterChange, initialValues = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterValues, setFilterValues] = useState(initialValues);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useEffect(() => {
    // Conta quantos filtros estão ativos
    const count = Object.values(filterValues).filter(value => value && value !== '').length;
    setActiveFiltersCount(count);
  }, [filterValues]);

  const handleFilterChange = (field, value) => {
    const newValues = {
      ...filterValues,
      [field]: value,
    };
    setFilterValues(newValues);
  };

  const handleApplyFilters = () => {
    if (onFilterChange) {
      onFilterChange(filterValues);
    }
  };

  const handleClearFilters = () => {
    const clearedValues = Object.keys(filterValues).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
    setFilterValues(clearedValues);
    if (onFilterChange) {
      onFilterChange(clearedValues);
    }
  };

  const handleRemoveFilter = (field) => {
    const newValues = {
      ...filterValues,
      [field]: '',
    };
    setFilterValues(newValues);
    if (onFilterChange) {
      onFilterChange(newValues);
    }
  };

  const renderFilterInput = (filter) => {
    const value = filterValues[filter.field] || '';

    switch (filter.type) {
      case 'select':
        return (
          <FormControl fullWidth size="small" key={filter.field}>
            <InputLabel>{filter.label}</InputLabel>
            <Select
              value={value}
              label={filter.label}
              onChange={(e) => handleFilterChange(filter.field, e.target.value)}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              {filter.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'date':
        return (
          <TextField
            key={filter.field}
            fullWidth
            size="small"
            type="date"
            label={filter.label}
            value={value}
            onChange={(e) => handleFilterChange(filter.field, e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        );

      case 'text':
      default:
        return (
          <TextField
            key={filter.field}
            fullWidth
            size="small"
            label={filter.label}
            value={value}
            onChange={(e) => handleFilterChange(filter.field, e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleApplyFilters();
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
              endAdornment: value && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveFilter(filter.field)}
                    edge="end"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        );
    }
  };

  // Chips de filtros ativos
  const renderActiveFiltersChips = () => {
    const activeFilters = filters.filter(f => filterValues[f.field] && filterValues[f.field] !== '');

    if (activeFilters.length === 0) return null;

    return (
      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
        {activeFilters.map((filter) => {
          const value = filterValues[filter.field];
          let displayValue = value;

          // Se for select, mostra o label da opção
          if (filter.type === 'select' && filter.options) {
            const option = filter.options.find(opt => opt.value === value);
            displayValue = option ? option.label : value;
          }

          return (
            <Chip
              key={filter.field}
              label={`${filter.label}: ${displayValue}`}
              onDelete={() => handleRemoveFilter(filter.field)}
              size="small"
              color="primary"
              variant="outlined"
              sx={{
                borderRadius: 2,
                fontWeight: 500,
              }}
            />
          );
        })}
      </Stack>
    );
  };

  if (filters.length === 0) return null;

  return (
    <Box sx={{ mb: 3 }}>
      {/* Botão de toggle */}
      <Box sx={{ mb: 2 }}>
        <Button
          variant={isOpen ? 'contained' : 'outlined'}
          startIcon={<FilterListIcon />}
          endIcon={isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Filtros
          {activeFiltersCount > 0 && (
            <Chip
              label={activeFiltersCount}
              size="small"
              color="primary"
              sx={{
                ml: 1,
                height: 20,
                minWidth: 20,
                '& .MuiChip-label': {
                  px: 0.75,
                  fontSize: '0.75rem',
                },
              }}
            />
          )}
        </Button>

        {activeFiltersCount > 0 && !isOpen && (
          <Tooltip title="Limpar todos os filtros">
            <Button
              variant="text"
              size="small"
              startIcon={<ClearIcon />}
              onClick={handleClearFilters}
              sx={{
                ml: 2,
                textTransform: 'none',
                color: 'text.secondary',
              }}
            >
              Limpar filtros
            </Button>
          </Tooltip>
        )}
      </Box>

      {/* Chips de filtros ativos */}
      {!isOpen && renderActiveFiltersChips()}

      {/* Painel de filtros */}
      <Collapse in={isOpen} timeout={300}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 3,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.02)'
                : 'rgba(124, 58, 237, 0.02)',
          }}
        >
          {/* Inputs de filtro */}
          <Grid container spacing={2}>
            {filters.map((filter) => (
              <Grid item xs={12} sm={6} md={4} key={filter.field}>
                {renderFilterInput(filter)}
              </Grid>
            ))}
          </Grid>

          {/* Botões de ação */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="outlined"
              onClick={handleClearFilters}
              startIcon={<ClearIcon />}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              Limpar
            </Button>
            <Button
              variant="contained"
              onClick={handleApplyFilters}
              startIcon={<SearchIcon />}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Aplicar Filtros
            </Button>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
};

export default TableFilters;
