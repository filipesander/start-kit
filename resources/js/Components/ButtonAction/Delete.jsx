import DefaultErrorAlert from "@/Layouts/Components/DefaultErrorAlert";
import http from "@/Libs/Http";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon } from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";
import Can from "../Can";

export default function Delete({ environment, module, route, label, size = 'small', onDeletedMessage = '', onDeleted = () => { } }) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const handleOpen = () => setDialogIsOpen(true);
  const handleClose = () => setDialogIsOpen(false);

  const handleConfirm = async (event) => {
    try {
      setIsLoading(true);
      await http.delete(route);

      if (onDeletedMessage) {
        toast.success(`✅ ${onDeletedMessage}`);
      }

      onDeleted();
    } catch (error) {
      toast.error(`❌ ${error.response?.data?.message || error.message}`);
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
        <Button
          variant='contained'
          size={size}
          color='error'
          onClick={handleOpen}
          sx={{
            minWidth: label ? 'auto' : '36px',
            padding: label ? '6px 12px' : '6px 10px',
            '& .MuiIcon-root': {
              fontSize: '1.25rem',
            }
          }}
        >
          <Icon>delete</Icon> {label || ''}
        </Button>
      )}

      {isLoading && (
        <Button
          variant='text'
          size={size}
          color='error'
          disabled
          sx={{
            minWidth: '36px',
            padding: '6px 10px',
          }}
        >
          <CircularProgress color='secondary' size='1.25rem' />
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
