import Create from "@/Components/ButtonAction/Create";
import Delete from "@/Components/ButtonAction/Delete";
import Edit from "@/Components/ButtonAction/Edit";
import Can from "@/Components/Can";
import DataTable from "@/Components/DataTable";
import TableFilters from "@/Components/TableFilters";
import withAuthenticated from "@/hoc/withAuthenticated";
import DefaultPage from "@/Layouts/Components/DefaultPage";
import { Link as InertiaLink } from "@inertiajs/react";
import { Grid, Link } from "@mui/material";
import { useState } from "react";
import { formatDateTime } from "@/Utils";

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    renderCell: ({ row }) => (
      <Can permission='update'>
        <Link component={InertiaLink} href={route('panel.main.users.edit', [row.id])}>{row.id}</Link>
      </Can>
    ),
  },
  {
    field: 'name',
    headerName: 'Nome',
    flex: 2,
    renderCell: ({ row }) => (
      <Can permission='update'>
        <Link component={InertiaLink} href={route('panel.main.users.edit', [row.id])}>{row.name}</Link>
      </Can>
    ),
  },
  {
    field: 'updated_at',
    headerName: 'Atualizado em',
    flex: 1,
    renderCell: ({ row }) => (
      <Can permission='update'>
        <Link component={InertiaLink} href={route('panel.main.users.edit', [row.id])}>
          {formatDateTime(row.updated_at)}
        </Link>
      </Can>
    ),
  },
  {
    field: 'actions',
    headerName: '#',
    flex: 1,
    filterable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell: ({ row, reloadDataTable }) => {
      return (
        <Grid container spacing={1}>
          <Grid item>
            <Edit route={route('panel.main.users.edit', [row.id])} />
          </Grid>
          <Grid item>
            <Delete
              route={route('panel.main.users.destroy', [row.id])}
              onDeletedMessage='Usuário removido com sucesso!'
              onDeleted={reloadDataTable}
            />
          </Grid>
        </Grid>
      );
    },
  },
];

// Configuração dos filtros
const filterConfig = [
  {
    field: 'id',
    label: 'ID',
    type: 'text',
    operator: 'equals',
  },
  {
    field: 'name',
    label: 'Nome',
    type: 'text',
    operator: 'contains',
  },
];

const List = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <DefaultPage
      actions={[
        <Create route={route('panel.main.users.create')} label='Registrar' />,
      ]}
    >
      <TableFilters
        filters={filterConfig}
        onFilterChange={handleFilterChange}
        initialValues={filters}
      />

      <DataTable
        url={route('panel.main.users.index')}
        columns={columns}
        externalFilters={filters}
        checkboxSelection
        onSelectionModelChange={setSelectedRows}
        disableSelectionOnClick
      />
    </DefaultPage>
  );
};

export default withAuthenticated(List);
