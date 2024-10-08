'use client';

import Link from "next/link";
import Button from '@mui/material/Button';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from '../styles/User.module.css';
import { AVAILABLE_ROLES, BUTTON_CONTENT, MODAL_CONFIRMATION_MESSAGE } from "../constants/app";
import { MainUsersViewProps } from "../app/page";
import ConfirmationModal from "../components/modal/ConfirmationModal";
import { memo } from "react";

const MainUsersView = ({
  users,
  onSearchUpdate,
  onAddUserClick,
  isAddFormOpen,
  onSubmitButtonClick,
  userDetails,
  onChange,
  onEditButtonClick,
  onDeleteButtonClick,
  isConfirmModalOpen,
  onDeleteModalClose,
  onDeleteModalConfirm,
  selectedUser,
  errors
}: MainUsersViewProps) => {
  return (
    <div>
      <div className={styles.topContainer}>
        <div className={styles.lefSide}>
          <TextField
            onChange={(e) => onSearchUpdate(e.target.value)}
            id="outlined-basic"
            variant="outlined"
            placeholder="Search Users"
          />
        </div>
        <div className={styles.rightSide}>
          <Button variant="contained" color="info" onClick={onAddUserClick}>
            {!isAddFormOpen ? 'Add User' : 'Hide Form'}
          </Button>
        </div>
      </div>
      {isAddFormOpen && (
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={userDetails.name}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={userDetails.email}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={userDetails.age || ''}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
            error={!!errors.age}
            helperText={errors.age}
          />
          <TextField
            label="Role"
            name="role"
            select
            value={userDetails.role}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
          >
            {AVAILABLE_ROLES.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <Button onClick={onSubmitButtonClick} type="submit" variant="contained" color="info">
            {BUTTON_CONTENT.add}
          </Button>
        </Box>
      )}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Age</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Role</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}></TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                hover={true}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.age}</TableCell>
                <TableCell align="center">{user.role}</TableCell>
                <TableCell align="center">
                  <Link onClick={() => onEditButtonClick(user)} href="/edit">
                    <EditIcon sx={{ cursor: 'pointer' }} />
                  </Link>
                </TableCell>
                <TableCell onClick={() => onDeleteButtonClick(user)} align="center">
                  <DeleteIcon sx={{ cursor: 'pointer' }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationModal
        user={selectedUser}
        onDeleteModalConfirm={onDeleteModalConfirm}
        onDeleteModalClose={onDeleteModalClose}
        isConfirmModalOpen={isConfirmModalOpen}
      />
    </div>
  );
}

export default memo(MainUsersView);
