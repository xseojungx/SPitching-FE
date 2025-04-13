import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import gestureFeedbackReducer from './slices/gestureFeedbackSlice';

export const store = configureStore({
  reducer: { auth: authReducer, gestureFeedback: gestureFeedbackReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
