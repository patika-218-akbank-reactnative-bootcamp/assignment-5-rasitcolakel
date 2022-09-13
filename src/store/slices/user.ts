import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UserState = {
  accessToken: string | null;
  user: null | UserType;
};
export type UserType = {
  id: string;
  email: string;
  displayName: string;
};
const initialState: UserState = {
  accessToken: null,
  user: null,
};
export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    updateUser: (state, action: PayloadAction<UserType>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    logOut: (state) => {
      state = {
        ...initialState,
      };
      return state;
    },
  },
});

export const { setUser, logOut, updateUser } = userSlice.actions;

export default userSlice.reducer;
