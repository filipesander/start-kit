import React, { useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import qs from 'qs';
import http from "@/Libs/Http";
import DefaultErrorAlert from "@/Layouts/Components/DefaultErrorAlert";
import {Card, useMediaQuery} from "@mui/material";
import MobileDataTable from "@/Components/MobileDataTable";

export default function DataTable({ url, columns, data, pageSize, rowsPerPageOptions, externalFilters = {}, ...dataGridProps }) {
  const serverSide = !!url;
  const isMobile = useMediaQuery('(max-width: 676px)');
  const [currentExternalFilters, setCurrentExternalFilters] = useState(externalFilters);

  const initialSortModel = dataGridProps.sortModel || columns.filter(col => {
    return typeof col.sortable === 'undefined' || col.sortable;
  }).map(col => ({
    field: col.field,
    sort: col.defaultSortDir || 'asc',
  }));

  const initialFilterModel = dataGridProps.filterModel || {
    linkOperator: 'and',
    items: columns.filter(col => typeof col.filterable === 'undefined' || col.filterable)
      .map(col => ({
        id: col.field,
        columnField: col.field,
        operatorValue: 'contains',
        value: undefined,
      })),
  };

  const config = {
    ...dataGridProps,
    columns: columns.map(column => {
      if (!column.renderCell) {
        return column;
      }

      return {
        ...column,
        renderCell: (defaultParams) => {
          const customParams = {
            ...defaultParams,
            reloadDataTable: () => {
              return serverSide ? loadDataTable() : defaultParams.api.forceUpdate();
            },
          }

          return column.renderCell(customParams);
        },
      };
    }),
    rows: (dataGridProps.rows || data) || [],
    rowCount: serverSide ? 0 : (dataGridProps.rows || data).length,
    page: dataGridProps.page || 0,
    pageSize: pageSize || 25,
    rowsPerPageOptions: rowsPerPageOptions || [25, 50, 75, 100],
    autoHeight: true,
    sortModel: initialSortModel,
    sortingMode: serverSide ? 'server' : 'client',
    filterModel: {
      ...initialFilterModel,
      items: [initialFilterModel.items[0]],
    },
    filterMode: serverSide ? 'server' : 'client',
    pagination: true,
    paginationMode: serverSide ? 'server' : 'client',
    loading: false,
  };

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(config.loading);

  const [currentRows, setCurrentRows] = useState(config.rows);

  const [currentRowCount, setCurrentRowCount] = useState(config.rowCount);

  const [currentPage, setCurrentPage] = useState(config.page);

  const [currentPageSize, setCurrentPageSize] = useState(config.pageSize);

  const [currentSortModel, setCurrentSortModel] = useState(config.sortModel);

  const [currentFilterModel, setCurrentFilterModel] = useState(config.filterModel);

  const updateCurrentSortModel = useCallback((newSortModel) => {
    if (newSortModel.length !== currentSortModel.length) {
      return setCurrentSortModel(newSortModel);
    } else if (JSON.stringify(newSortModel) !== JSON.stringify(currentSortModel)) {
      return setCurrentSortModel(newSortModel);
    }
  }, [currentSortModel]);

  const draw = 1;

  const loadDataTable = () => {
    setLoading(true);

    const selectColumns = config.columns.map((col, index) => {
      let search = {
        value: null,
        regex: false,
        operator: 'contains',
      };

      if (col.search) {
        search = {
          ...search,
          ...col.search,
        };
      } else {
        // Verifica se há filtro externo para esta coluna
        if (currentExternalFilters[col.field]) {
          search = {
            value: currentExternalFilters[col.field],
            regex: false,
            operator: col.filterOperator || 'contains',
          };
        } else {
          const filter = currentFilterModel.items.find(item => item.columnField === col.field);

          if (filter) {
            search = {
              ...filter,
              regex: false,
            };
          }
        }
      }

      return {
        data: index,
        name: col.field,
        searchable: typeof col.filterable === 'undefined' ? true : col.filterable,
        orderable: typeof col.sortable === 'undefined' ? true : col.sortable,
        search: search,
      };
    });

    let queryString = qs.stringify({
      draw: draw + 1,
      columns: selectColumns,
      order: currentSortModel.map(item => ({
        dir: item.sort,
        column: selectColumns.find(col => col.name === item.field).data,
      })),
      start: currentPage * currentPageSize,
      length: currentPageSize,
      search: {
        value: null,
        regex: false,
      },
    });

    http.get(`${url}?${queryString}`)
      .then(response => {
        const newRows = response.data.data.map(row => {
          return selectColumns.reduce((obj, col) => {
            return {
              ...obj,
              [col.name]: row[col.data],
            };
          }, {});
        });

        setCurrentRows(newRows);
        setCurrentRowCount(response.data.recordsTotal);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  // Atualiza filtros externos quando mudam
  useEffect(() => {
    setCurrentExternalFilters(externalFilters);
  }, [externalFilters]);

  if (serverSide) {
    useEffect(() => {
      loadDataTable();
    }, [
      currentPage,
      currentPageSize,
      currentSortModel,
      currentFilterModel,
      currentExternalFilters,
      columns,
    ]);
  }

  // Se for mobile, renderiza versão mobile
  if (isMobile) {
    return (
      <>
        {error && (
          <DefaultErrorAlert error={error} onClose={() => setError(null)} />
        )}

        <MobileDataTable
          columns={config.columns}
          rows={currentRows}
          loading={loading}
          onSearch={(term) => {
            // Implementa busca se necessário
            const searchFilter = {
              ...currentFilterModel,
              quickFilterValues: [term],
            };
            setCurrentFilterModel(searchFilter);
          }}
        />
      </>
    );
  }

  // Versão desktop normal
  return (
    <>
      {error && (
        <DefaultErrorAlert error={error} onClose={() => setError(null)} />
      )}

      <Card sx={{
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 4px 20px rgba(0, 0, 0, 0.3)'
            : '0 4px 20px rgba(0, 0, 0, 0.08)',
      }}>
        <DataGrid
          {...config}
          loading={loading}
          rows={currentRows}
          rowCount={currentRowCount}
          page={currentPage}
          onPageChange={setCurrentPage}
          pageSize={currentPageSize}
          onPageSizeChange={setCurrentPageSize}
          sortModel={currentSortModel}
          onSortModelChange={updateCurrentSortModel}
          filterModel={currentFilterModel}
          onFilterModelChange={setCurrentFilterModel}
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(139, 92, 246, 0.08)'
                  : 'rgba(124, 58, 237, 0.04)',
            },
            '& .MuiDataGrid-cell': {
              color: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#3600b5',
              fontWeight: 500,
              '& a, & .MuiLink-root': {
                color: (theme) => theme.palette.mode === 'dark' ? '#ffffff !important' : '#3600b5 !important',
                textDecoration: 'none !important',
                fontWeight: 500,
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8) !important' : '#2a0089 !important',
                  textDecoration: 'none !important',
                },
              },
            },
          }}
        />
      </Card>
    </>
  );
}
