// src/redux/slices/feedback.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FeedbackSummary,
  EyeContactScore,
  FluencyScore,
  GestureScore,
  SimilarityScore,
  GraphScoreResponse,
} from '@/types/feedback.types';
import { RecentPractice } from '@/types/presentation.types';

interface FeedbackState {
  summary: FeedbackSummary | null;
  eyeContact: EyeContactScore | null;
  fluency: FluencyScore | null;
  gesture: GestureScore | null;
  similarity: SimilarityScore | null;
  recentPractice: RecentPractice | null;
  graphScores: GraphScoreResponse | null;
}

const initialState: FeedbackState = {
  summary: null,
  eyeContact: null,
  fluency: null,
  gesture: null,
  similarity: null,
  recentPractice: null,
  graphScores: null,
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setSummary: (state, action: PayloadAction<FeedbackSummary>) => {
      state.summary = action.payload;
    },
    setEyeContact: (state, action: PayloadAction<EyeContactScore>) => {
      state.eyeContact = action.payload;
    },
    setFluency: (state, action: PayloadAction<FluencyScore>) => {
      state.fluency = action.payload;
    },
    setGesture: (state, action: PayloadAction<GestureScore>) => {
      state.gesture = action.payload;
    },
    setSimilarity: (state, action: PayloadAction<SimilarityScore>) => {
      state.similarity = action.payload;
    },
    setRecentPractice: (state, action: PayloadAction<RecentPractice>) => {
      state.recentPractice = action.payload;
    },
    setGraphScores: (state, action: PayloadAction<GraphScoreResponse>) => {
      state.graphScores = action.payload;
    },
  },
});

export const {
  setSummary,
  setEyeContact,
  setFluency,
  setGesture,
  setSimilarity,
  setRecentPractice,
  setGraphScores,
} = feedbackSlice.actions;
export default feedbackSlice.reducer;
