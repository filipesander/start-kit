import Can from '@/Components/Can';
import PermissionManager from '@/Components/PermissionManager';
import withAuthenticated from '@/hoc/withAuthenticated';
import DefaultPage from '@/Layouts/Components/DefaultPage';
import { Link, useForm } from '@inertiajs/react';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import React from 'react';
import DefaultCard from "@/Components/DefaultCard";

function Edit({ group, environments, permissions, isReadOnly }) {
  const { data, setData, post, put, processing, errors, reset } = useForm({
    id: null,
    name: '',
    ...(group || {}),
    permissions: {},
  });

  const onHandleInputChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.id) {
      put(route('panel.main.groups.update', [data.id]));
    } else {
      post(route('panel.main.groups.store'));
    }
  };

  const handlePermissionsChange = (permissions) => {
    setData({
      ...data,
      permissions,
    });
  }

  const getTitle = () => {
    if (data.id === null) {
      return 'Registrar Group';
    }

    if (isReadOnly) {
      return `Grupo #${data.id}`;
    }

    return `Atualizar Grupo #${data.id}`;
  };

  return (
    <DefaultPage title={getTitle()}>
      <DefaultCard>
        <form onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            size='small'
            id='name'
            name='name'
            type='text'
            label='Nome'
            autoComplete='name'
            value={data.name}
            onChange={onHandleInputChange}
            error={!!errors.name}
            helperText={errors.name}
            disabled={processing}
            inputProps={{ readOnly: isReadOnly }}
            fullWidth
            required
            autoFocus
          />

          <p>Permissões</p>
          <PermissionManager
            environmentsWithModules={environments}
            initialPermissions={permissions}
            isReadOnly={isReadOnly}
            onChange={handlePermissionsChange}
          />

          <br />

          <Grid container justifyContent='space-between'>
            <Grid item>
              <Button color='inherit' variant='contained' component={Link} href={route('panel.main.groups.index')}>
                Voltar
              </Button>
            </Grid>
            <Grid item>
              <Can permission={`${data.id ? 'update' : 'create'}`}>
                {!isReadOnly && (
                  <>
                    {!processing && (
                      <Button variant="contained" color="primary" type='submit'>
                        {data.id ? 'Atualizar' : 'Registrar'}
                      </Button>
                    )}

                    {processing && (
                      <CircularProgress />
                    )}
                  </>
                )}
              </Can>
            </Grid>
          </Grid>
        </form>
      </DefaultCard>
    </DefaultPage>
  );
}

export default withAuthenticated(Edit);
