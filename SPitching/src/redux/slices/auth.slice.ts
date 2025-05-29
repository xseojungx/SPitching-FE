import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthChecked: boolean;
  isLoggedIn: boolean;
  userId: number | null;
}

const initialState: AuthState = { isLoggedIn: false, userId: null, isAuthChecked: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<number | null>) {
      state.isLoggedIn = true;
      state.userId = action.payload;
      state.isAuthChecked = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userId = null;
      state.isAuthChecked = true;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
