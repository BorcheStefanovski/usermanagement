import { UserState } from "../reducers/userSlice";

export const selectUserDetails = (state: { user: UserState }) => state.user.details;