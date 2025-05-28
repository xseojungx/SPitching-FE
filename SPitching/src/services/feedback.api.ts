import apiClient from './apiClient';
import { RecentPracticeNotNull } from '@/types/presentation.types';

export const getFeedbackSummary = async (practiceId: number) => {
  const res = await apiClient.get(`api/v1/feedback/practice/${practiceId}/score-details`);
  return res.data;
};

export const getEyeContactScore = async (practiceId: number) => {
  const res = await apiClient.get(`api/v1/feedback/practice/${practiceId}/eyecontact`);
  return res.data;
};

export const getFluencyScore = async (practiceId: number) => {
  const res = await apiClient.get(`api/v1/feedback/practice/${practiceId}/stt`);
  return res.data;
};
export const getGestureScore = async (practiceId: number) => {
  const res = await apiClient.get(`api/v1/feedback/practice/${practiceId}/gesture`);
  return res.data;
};
export const getSimilarityScore = async (practiceId: number) => {
  const res = await apiClient.get(`api/v1/feedback/practice/${practiceId}/script-similarity`);
  return res.data;
};

export const getRecentSummary = async (): Promise<RecentPracticeNotNull> => {
  const res = await apiClient.get(`api/v1/home/summary`);
  return res.data;
};
