'use client';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { MODAL_CONFIRMATION_MESSAGE, BUTTON_CONTENT } from "../../constants/app";
import { User } from "../../../../shared/types";
import { memo } from "react";

interface ConfirmationModalProps {
  user?: User;
  isConfirmModalOpen: boolean;
  onDeleteModalClose: () => void;
  onDeleteModalConfirm: () => void;
}

const ConfirmationModal = ({
  user,
  isConfirmModalOpen,
  onDeleteModalConfirm,
  onDeleteModalClose,
}: ConfirmationModalProps) => (
  <Dialog
    open={isConfirmModalOpen}
    onClose={onDeleteModalClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {`Delete ${user?.name}`}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {MODAL_CONFIRMATION_MESSAGE}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="contained" color="primary" onClick={onDeleteModalClose}>
        {BUTTON_CONTENT.cancel}
      </Button>
      <Button variant="contained" color="error" onClick={onDeleteModalConfirm}>
        {BUTTON_CONTENT.delete}
      </Button>
    </DialogActions>
  </Dialog>
);

export default memo(ConfirmationModal);
