import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../../shared/types';

export interface UserState {
  details: User | null;
}

const initialState: UserState = {
  details: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.details = action.payload;
    },
    clearUser: (state) => {
      state.details = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
