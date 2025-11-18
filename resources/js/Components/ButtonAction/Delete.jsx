import DefaultErrorAlert from "@/Layouts/Components/DefaultErrorAlert";
import http from "@/Libs/Http";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import Can from "../Can";

export default function Delete({ environment, module, route, label, size, onDeletedMessage = '', onDeleted = () => { } }) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const handleOpen = () => setDialogIsOpen(true);
  const handleClose = () => setDialogIsOpen(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleConfirm = async (event) => {
    try {
      setIsLoading(true);
      await http.delete(route);

      if (onDeletedMessage) {
        enqueueSnackbar(onDeletedMessage, {
          variant: 'success',
        });
      }

      onDeleted();
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || error.message, {
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  return (
    <Can permission='update' environment={environment} module={module}>
      {error && (
        <DefaultErrorAlert error={error} onClose={() => setError(null)} />
      )}

      {!isLoading && (
        <Button variant='contained' size={size} color='error' onClick={handleOpen}>
          <Icon>delete</Icon> {label || ''}
        </Button>
      )}

      {isLoading && (
        <Button
          variant='text'
          size={size}
          color='error'
          disabled
        >
          <CircularProgress color='secondary' size='1.5rem' />
        </Button>
      )}

      <Dialog
        open={dialogIsOpen}
      >
        <DialogTitle>
          <Icon>error</Icon> Atenção!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>Não</Button>
          <Button onClick={handleConfirm} color='error' variant='outlined'>Sim</Button>
        </DialogActions>
      </Dialog>
    </Can>
  );
}
