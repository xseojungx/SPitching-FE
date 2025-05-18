import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PracticeState {
  practiceId: number | null;
}

const initialState: PracticeState = { practiceId: null };

const practiceSlice = createSlice({
  name: 'practice',
  initialState,
  reducers: {
    setPracticeId: (state, action: PayloadAction<number>) => {
      state.practiceId = action.payload;
    },
    clearPracticeId: (state) => {
      state.practiceId = null;
    },
  },
});

export const { setPracticeId, clearPracticeId } = practiceSlice.actions;
export default practiceSlice.reducer;
