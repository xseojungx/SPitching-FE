import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GestureFeedbackState {
  gestureScore: number;
  crossedScore: number;
  raisedScore: number;
  faceScore: number;
  explainScore: number;
  straightScore: number;
  videoName: string;
}

const initialState: GestureFeedbackState = {
  gestureScore: 0,
  crossedScore: 0,
  raisedScore: 0,
  faceScore: 0,
  explainScore: 0,
  straightScore: 0,
  videoName: '',
};

const gestureFeedbackSlice = createSlice({
  name: 'gestureFeedback',
  initialState,
  reducers: {
    setGestureFeedback: (state, action: PayloadAction<GestureFeedbackState>) => {
      return action.payload;
    },
    clearGestureFeedback: () => initialState,
  },
});

export const { setGestureFeedback, clearGestureFeedback } = gestureFeedbackSlice.actions;
export default gestureFeedbackSlice.reducer;
