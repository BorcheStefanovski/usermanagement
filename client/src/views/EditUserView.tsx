'use client';

import Button from '@mui/material/Button';
import { Box, MenuItem, TextField, FormHelperText } from "@mui/material";
import { AVAILABLE_ROLES, BUTTON_CONTENT } from "../constants/app";
import { EditUserViewProps } from '../app/edit/page';
import { memo } from 'react';

const EditUserView = ({ userDetails, isFormEdited, errors, validateField, onSubmit, onChange }: EditUserViewProps) => {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={userDetails?.name || ''}
        onChange={onChange}
        onBlur={() => validateField('name', userDetails?.name || '')}
        fullWidth
        required
        margin="normal"
        error={!!errors.name}
      />
      <FormHelperText error>{errors.name}</FormHelperText>

      <TextField
        label="Email"
        name="email"
        type="email"
        value={userDetails?.email || ''}
        onChange={onChange}
        onBlur={() => validateField('email', userDetails?.email || '')}
        fullWidth
        required
        margin="normal"
        error={!!errors.email}
      />
      <FormHelperText error>{errors.email}</FormHelperText>

      <TextField
        label="Age"
        name="age"
        type="number"
        value={userDetails?.age || ''}
        onChange={onChange}
        onBlur={() => validateField('age', userDetails?.age || '')}
        fullWidth
        required
        margin="normal"
        error={!!errors.age}
      />
      <FormHelperText error>{errors.age}</FormHelperText>

      <TextField
        label="Role"
        name="role"
        select
        value={userDetails?.role || ''}
        onChange={onChange}
        fullWidth
        required
        margin="normal"
        error={!!errors.role}
      >
        {AVAILABLE_ROLES.map((role) => (
          <MenuItem key={role} value={role}>
            {role}
          </MenuItem>
        ))}
      </TextField>
      <FormHelperText error>{errors.role}</FormHelperText>

      <Button
        type="submit"
        variant="contained"
        color="info"
        disabled={!isFormEdited || Object.values(errors).some(error => error)}
      >
        {BUTTON_CONTENT.edit}
      </Button>
    </Box>
  );
};

export default memo(EditUserView);
