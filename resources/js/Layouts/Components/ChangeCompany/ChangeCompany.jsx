import { ChangeCompanyWrapper } from '@/Layouts/Components/ChangeCompany/styles';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import * as Unicons from '@iconscout/react-unicons';
import React, { useEffect, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const ChangeCompany = () => {
  const {
    props: {
      auth: { user },
    },
  } = usePage();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Se não tem empresas ou tem apenas 1, não exibe
  if (!user?.companies || user?.companies?.length <= 1) {
    return <></>;
  }

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const userHasAccessToCompany = (company) => {
    // Superadmin (role 99) tem acesso total
    if (user?.role === 99) {
      return true;
    }

    // Usuário sem company_id tem acesso
    if (!user?.company_id) {
      return true;
    }

    // Verifica se usuário tem grupos vinculados à empresa
    const hasGroupsInCompany = user?.groups_by_company?.some(
      (companyData) => companyData.company_id === company.id && companyData.groups?.length > 0
    );

    return hasGroupsInCompany;
  };

  const selectCompany = (companyId) => {
    // Valida acesso antes de trocar (exceto para superadmin)
    if (user?.company_id && user?.role !== 99) {
      const company = user.companies.find((comp) => comp.id === companyId);
      const hasAccess = userHasAccessToCompany(company);

      if (!hasAccess) {
        enqueueSnackbar('Você não possui grupos vinculados a esta empresa. Entre em contato com o administrador.', {
          variant: 'warning',
        });
        return;
      }
    }

    setLoading(true);

    axios.post(route('panel.main.companies.switch'), { company_id: companyId })
      .then((response) => {
        if (response.data?.status) {
          enqueueSnackbar(response.data?.message || 'Empresa alterada com sucesso!', { variant: 'success' });

          if (response.data?.redirect) {
            window.location.href = response.data.redirect;
          } else {
            window.location.reload();
          }
        } else {
          enqueueSnackbar(response.data?.message || 'Erro ao alterar empresa', { variant: 'error' });
        }
      })
      .catch((error) => {
        const message = error.response?.data?.message || error.message || 'Erro ao alterar empresa';
        enqueueSnackbar(message, { variant: 'error' });
      })
      .finally(() => {
        setLoading(false);
        handleClose();
      });
  };

  return (
    <ChangeCompanyWrapper>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          mb: 1,
          textAlign: 'center',
          fontSize: '0.95rem',
          color: isDark ? '#fff' : 'text.primary',
        }}
      >
        {user?.company?.name || 'Nenhuma empresa'}
      </Typography>

      <Link
        onClick={handleClickOpen}
        disabled={false}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          cursor: 'pointer',
          fontSize: '0.85rem',
          fontWeight: 500,
          transition: 'all 0.2s ease',
          color: isDark ? '#74CAFF' : '#7C3AED',
          '&:hover': {
            transform: 'scale(1.05)',
            color: isDark ? '#A0D9FF' : '#6D28D9',
          }
        }}
      >
        <Unicons.UilArrowsH size={16} /> Alterar Empresa
      </Link>

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Alterar empresa</DialogTitle>
        <DialogContent>
          {!loading && (
            <List>
              {user.companies.map((company) => {
                const hasGroupsInCompany = userHasAccessToCompany(company);

                const isCurrentCompany = company.id === user?.company?.id;
                const isDisabled = isCurrentCompany || !hasGroupsInCompany;

                return (
                  <ListItem key={company.id} disablePadding onClick={() => !isDisabled && selectCompany(company.id)}>
                    <ListItemButton selected={isCurrentCompany} disabled={isDisabled}>
                      <ListItemIcon>
                        {isCurrentCompany ? (
                          <Unicons.UilCheck color="primary" />
                        ) : hasGroupsInCompany ? (
                          <Unicons.UilAngleDoubleRight />
                        ) : (
                          <Unicons.UilExclamationTriangle color="warning" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={company?.name}
                        secondary={
                          isCurrentCompany
                            ? 'Empresa atual'
                            : !hasGroupsInCompany
                            ? user?.company_id && user?.role !== 99
                              ? 'Sem grupos vinculados'
                              : 'Superadmin - Acesso total'
                            : null
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          )}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
              <CircularProgress />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </ChangeCompanyWrapper>
  );
};

export default ChangeCompany;
