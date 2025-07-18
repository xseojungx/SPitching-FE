import apiClient from './apiClient';
import { FeedbackSummary, RecentFeedback, GraphScoreResponse } from '@/types/feedback.types';

export const getFeedbackSummary = async (practiceId: number): Promise<FeedbackSummary> => {
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

export const getRecentFeedback = async (): Promise<RecentFeedback> => {
  const res = await apiClient.get(`api/v1/home/summary`);
  return res.data;
};

export const getGraphScores = async (practiceId: number): Promise<GraphScoreResponse> => {
  const res = await apiClient.get(`/api/v1/feedback/practice/${practiceId}/presentation-scores`);
  return res.data;
};

export const getPresentationById = async (presentationId: number) => {
  const response = await apiClient.get(`/api/v1/presentations/${presentationId}`);
  return response.data;
};
