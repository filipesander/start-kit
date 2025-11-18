import {Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, Grid, Icon} from "@mui/material";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useMemo, useState } from "react";
import * as Unicons from "@iconscout/react-unicons";

const Module = ({ module }) => {
  const CustomIcon = Unicons[module.icon] ?? null;
  return (
    <>
      {module.parent && (
        <>
          <Module module={module.parent} />
          <ChevronRight />
        </>
      )}
      {CustomIcon && React.createElement(CustomIcon, {size: 25})} {module.label}
    </>
  );
};

export default function PermissionManager({ environmentsWithModules, initialPermissions, isReadOnly, onChange }) {
  const [permissions, setPermissions] = useState(initialPermissions);

  const modulesTableColumns = [
    {
      field: 'label',
      headerName: 'Módulo',
      flex: 6,
      disableColumnMenu: true,
      renderCell: ({ row }) => {
        return (<Module module={row} />);
      },
    },
    {
      field: 'read',
      headerName: 'Visualizar',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                color='primary'
                onChange={(e) => handleModuleAbilityChange(row, 'read', e.target.checked)}
                checked={!!permissions[row.id]?.read}
              />
            }
          />
        );
      },
    },
    {
      field: 'create',
      headerName: 'Registrar',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                color='primary'
                onChange={(e) => handleModuleAbilityChange(row, 'create', e.target.checked)}
                checked={!!permissions[row.id]?.create}
              />
            }
          />
        );
      },
    },
    {
      field: 'update',
      headerName: 'Atualizar',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                color='primary'
                onChange={(e) => handleModuleAbilityChange(row, 'update', e.target.checked)}
                checked={!!permissions[row.id]?.update}
              />
            }
          />
        );
      },
    },
    {
      field: 'delete',
      headerName: 'Remover',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                color='primary'
                onChange={(e) => handleModuleAbilityChange(row, 'delete', e.target.checked)}
                checked={!!permissions[row.id]?.delete}
              />
            }
          />
        );
      },
    },
  ];

  const handleEnvironmentChange = (environment, isEnabled) => {
    if (isReadOnly) {
      return;
    }

    if (isEnabled) {
      const result = environment.modules.reduce((obj, module) => ({
        ...obj,
        [module.id]: {
          create: isEnabled,
          read: isEnabled,
          update: isEnabled,
          delete: isEnabled,
        },
      }), {});

      return setPermissions({
        ...permissions,
        ...result,
      });
    }

    const modulesIds = environment.modules.map(module => module.id);

    const result = Object.entries(permissions)
      .reduce((obj, [id, abilities]) => {
        if (modulesIds.includes(parseInt(id))) {
          return obj;
        }

        return {
          ...obj,
          [id]: abilities,
        };
      }, {});

    setPermissions(result);
  };

  const handleModuleAbilityChange = (module, ability, isAllowed) => {
    if (isReadOnly) {
      return;
    }

    setPermissions({
      ...permissions,
      [module.id]: {
        ...(permissions[module.id] || {
          create: false,
          read: false,
          update: false,
          delete: false,
        }),
        [ability]: isAllowed,
      },
    });
  };

  const handleModuleChange = (environment, selectedModules) => {
    if (isReadOnly) {
      return;
    }

    const modulesIds = environment.modules.map(module => module.id);

    const result = Object.entries(permissions)
      .map(([id, abilities]) => [parseInt(id), abilities])
      .filter(([id, abilities]) => {
        return !modulesIds.includes(id);
      });

    selectedModules.forEach(id => result.push([
      id,
      {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
    ]));

    setPermissions(result.reduce((obj, [id, abilities]) => ({
      ...obj,
      [id]: abilities,
    }), {}));
  };

  const getSelectionModelFromEnvironment = (environment) => {
    return useMemo(() => {
      return environment
        .modules
        .filter(module => !!permissions[module.id])
        .map(module => module.id);
    }, [environment, permissions]);
  };

  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(permissions);
    }
  }, [permissions]);

  return (
    <>
      {environmentsWithModules.map(environment => {
        const CustomIcon = Unicons[environment.icon] ?? null;
        return (
          <Accordion
            key={environment.id}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
            >
              <FormControlLabel
                aria-label={environment.label}
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                label={<Grid container alignItems='center'>{CustomIcon && React.createElement(CustomIcon, {size: 25})} {environment.label}</Grid>}
                control={
                  <Checkbox
                    onChange={(e) => handleEnvironmentChange(environment, e.target.checked)}
                    checked={environment.modules.every(module => !!permissions[module.id])}
                    inputProps={{ readOnly: isReadOnly }}
                  />
                }
              />
            </AccordionSummary>
            <AccordionDetails>
              <DataGrid
                columns={modulesTableColumns}
                rows={environment.modules}
                autoHeight
                checkboxSelection
                disableSelectionOnClick
                selectionModel={getSelectionModelFromEnvironment(environment)}
                onSelectionModelChange={(selectedModules) => handleModuleChange(environment, selectedModules)}
              />
            </AccordionDetails>
          </Accordion>
        )
      })}
    </>
  );
}
