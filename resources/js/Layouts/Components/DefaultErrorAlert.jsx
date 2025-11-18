import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, Typography } from "@mui/material";

export default function DefaultErrorAlert({ error, onClose }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);

    if (onClose) {
      onClose();
    }
  };

  console.error(error);

  const getErrorMessage = () => {
    return error.response?.data?.message || error.response?.data?.error || error.message;
  };

  return (
    <Dialog
      open={isOpen}
    >
      <DialogTitle>
        <Icon>error</Icon> Ooops! Ocorreu um problema!
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant='body1' component='span'>
            <strong>{getErrorMessage()}</strong>
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}
