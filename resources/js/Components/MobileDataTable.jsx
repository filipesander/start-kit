import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  Chip,
  Stack,
  Divider,
  TextField,
  InputAdornment,
  useMediaQuery,
  alpha,
  Skeleton,
  Fab,
  Zoom,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const MobileCard = styled(Card)(({ theme, expanded }) => ({
  marginBottom: theme.spacing(1.5),
  borderRadius: 12,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper,
  boxShadow: expanded
    ? theme.palette.mode === 'dark'
      ? '0 4px 16px rgba(0, 0, 0, 0.3)'
      : '0 4px 16px rgba(124, 58, 237, 0.1)'
    : theme.palette.mode === 'dark'
    ? '0 1px 4px rgba(0, 0, 0, 0.2)'
    : '0 1px 4px rgba(0, 0, 0, 0.06)',
  '&:active': {
    transform: 'scale(0.99)',
  },
}));

const ExpandButton = styled(IconButton)(({ theme, expanded }) => ({
  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: 'transform 0.3s',
  marginLeft: 'auto',
}));

const MobileDataTable = ({ columns, rows, loading, onSearch, actions }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);
  const isMobile = useMediaQuery('(max-width: 676px)');

  useEffect(() => {
    if (searchTerm) {
      const filtered = rows.filter((row) => {
        return Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredRows(filtered);
    } else {
      setFilteredRows(rows);
    }
  }, [searchTerm, rows]);

  const handleExpandClick = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  // Renderiza cabeçalho de busca
  const renderSearchBar = () => (
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          sx: {
            borderRadius: 2.5,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.background.paper, 0.6)
                : alpha(theme.palette.background.paper, 1),
            fontSize: '0.875rem',
          },
        }}
      />
    </Box>
  );

  // Renderiza skeleton loader
  const renderSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5].map((item) => (
        <Card key={item} sx={{ mb: 2, borderRadius: 4 }}>
          <CardContent>
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="40%" />
          </CardContent>
        </Card>
      ))}
    </>
  );

  // Renderiza informações principais do card (colunas principais)
  const renderMainInfo = (row, mainColumns) => {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${mainColumns.length}, 1fr)`,
          gap: 1.5,
        }}
      >
        {mainColumns.map((column) => {
          const value = row[column.field];

          if (column.renderCell) {
            return (
              <Box key={column.field} sx={{ minWidth: 0 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: 'block',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    mb: 0.5
                  }}
                >
                  {column.headerName}
                </Typography>
                <Box
                  sx={{
                    wordBreak: 'break-word',
                    '& *': {
                      color: (theme) => theme.palette.mode === 'dark' ? '#ffffff !important' : '#3600b5 !important',
                      fontWeight: 500,
                    },
                    '& a': {
                      textDecoration: 'none !important',
                      color: (theme) => theme.palette.mode === 'dark' ? '#ffffff !important' : '#3600b5 !important',
                      '&:hover': {
                        textDecoration: 'none !important',
                        color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8) !important' : '#2a0089 !important',
                      }
                    },
                    '& .MuiLink-root': {
                      textDecoration: 'none !important',
                      color: (theme) => theme.palette.mode === 'dark' ? '#ffffff !important' : '#3600b5 !important',
                      '&:hover': {
                        textDecoration: 'none !important',
                        color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8) !important' : '#2a0089 !important',
                      }
                    }
                  }}
                >
                  {column.renderCell({ row, value })}
                </Box>
              </Box>
            );
          }

          return (
            <Box key={column.field} sx={{ minWidth: 0 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: 'block',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  mb: 0.5
                }}
              >
                {column.headerName}
              </Typography>
              <Typography
                variant="body2"
                fontWeight={500}
                sx={{
                  fontSize: '0.875rem',
                  wordBreak: 'break-word',
                  lineHeight: 1.3,
                  color: (theme) => theme.palette.mode === 'dark' ? '#ffffff !important' : '#3600b5 !important'
                }}
              >
                {value || '-'}
              </Typography>
            </Box>
          );
        })}
      </Box>
    );
  };

  // Renderiza informações detalhadas (restante das colunas)
  const renderDetailInfo = (row, detailColumns) => {
    // Calcula quantas colunas por linha (máximo 2 para detalhes)
    const columnsPerRow = Math.min(detailColumns.length, 2);

    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columnsPerRow}, 1fr)`,
          gap: 1.5,
        }}
      >
        {detailColumns.map((column) => {
          const value = row[column.field];

          if (column.renderCell) {
            return (
              <Box key={column.field} sx={{ minWidth: 0 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: 'block',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    mb: 0.5
                  }}
                >
                  {column.headerName}
                </Typography>
                <Box
                  sx={{
                    wordBreak: 'break-word',
                    '& *': {
                      color: (theme) => theme.palette.mode === 'dark' ? '#ffffff !important' : '#3600b5 !important',
                      fontWeight: 500,
                    },
                    '& a': {
                      textDecoration: 'none !important',
                      color: (theme) => theme.palette.mode === 'dark' ? '#ffffff !important' : '#3600b5 !important',
                      '&:hover': {
                        textDecoration: 'none !important',
                        color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8) !important' : '#2a0089 !important',
                      }
                    },
                    '& .MuiLink-root': {
                      textDecoration: 'none !important',
                      color: (theme) => theme.palette.mode === 'dark' ? '#ffffff !important' : '#3600b5 !important',
                      '&:hover': {
                        textDecoration: 'none !important',
                        color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8) !important' : '#2a0089 !important',
                      }
                    }
                  }}
                >
                  {column.renderCell({ row, value })}
                </Box>
              </Box>
            );
          }

          return (
            <Box key={column.field} sx={{ minWidth: 0 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: 'block',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  mb: 0.5
                }}
              >
                {column.headerName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.8125rem',
                  wordBreak: 'break-word',
                  lineHeight: 1.3,
                  color: (theme) => theme.palette.mode === 'dark' ? '#ffffff !important' : '#3600b5 !important'
                }}
              >
                {value || '-'}
              </Typography>
            </Box>
          );
        })}
      </Box>
    );
  };

  if (!isMobile) {
    return null; // Retorna null se não for mobile, use o DataGrid normal
  }

  if (loading) {
    return (
      <Box>
        {renderSearchBar()}
        {renderSkeleton()}
      </Box>
    );
  }

  // Separa colunas principais (primeiras 2-3) e de detalhe
  const mainColumns = columns.filter((col) => col.field !== 'actions').slice(0, 2);
  const detailColumns = columns.filter((col) => !mainColumns.includes(col) && col.field !== 'actions');
  const actionsColumn = columns.find((col) => col.field === 'actions');

  return (
    <Box>
      {renderSearchBar()}

      {filteredRows.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nenhum resultado encontrado
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tente ajustar os termos de busca
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {filteredRows.length} {filteredRows.length === 1 ? 'resultado' : 'resultados'}
          </Typography>

          {filteredRows.map((row, index) => {
            const rowId = row.id || index;
            const isExpanded = expandedRows[rowId] || false;

            return (
              <MobileCard key={rowId} expanded={isExpanded}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  {/* Informações principais + Ações na mesma linha */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      mb: detailColumns.length > 0 ? 0 : 0
                    }}
                  >
                    {/* Informações principais */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      {renderMainInfo(row, mainColumns)}
                    </Box>

                    {/* Ações e botão de expandir */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        flexShrink: 0,
                      }}
                    >
                      {actionsColumn && (
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 0.25,
                            alignItems: 'center',
                            '& .MuiIconButton-root': {
                              padding: '3px',
                              width: '24px',
                              height: '24px',
                              '& .MuiSvgIcon-root': {
                                fontSize: '0.875rem',
                              }
                            },
                            '& .MuiButton-root': {
                              minWidth: 'auto',
                              padding: '3px 8px',
                              fontSize: '0.65rem',
                              height: '24px',
                              lineHeight: 1,
                            }
                          }}
                        >
                          {actionsColumn.renderCell({ row })}
                        </Box>
                      )}

                      {detailColumns.length > 0 && (
                        <ExpandButton
                          expanded={isExpanded}
                          onClick={() => handleExpandClick(rowId)}
                          aria-expanded={isExpanded}
                          aria-label="mostrar mais"
                          sx={{
                            padding: '3px',
                            width: '24px',
                            height: '24px',
                          }}
                        >
                          <ExpandMoreIcon sx={{ fontSize: '0.875rem' }} />
                        </ExpandButton>
                      )}
                    </Box>
                  </Box>

                  {/* Informações detalhadas (colapsável) */}
                  {detailColumns.length > 0 && (
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <Box sx={{ pt: 2, mt: 1.5, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
                        {renderDetailInfo(row, detailColumns)}
                      </Box>
                    </Collapse>
                  )}
                </CardContent>
              </MobileCard>
            );
          })}
        </>
      )}

      {/* Botão flutuante de ações (se houver) */}
      {actions && (
        <Zoom in={true}>
          <Fab
            color="primary"
            aria-label="ações"
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 8px 24px rgba(0, 0, 0, 0.4)'
                  : '0 8px 24px rgba(124, 58, 237, 0.3)',
            }}
            onClick={actions.onClick}
          >
            {actions.icon || <FilterListIcon />}
          </Fab>
        </Zoom>
      )}
    </Box>
  );
};

export default MobileDataTable;
