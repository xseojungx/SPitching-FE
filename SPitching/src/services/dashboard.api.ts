// src/services/dashboard.api.ts
import apiClient from './apiClient';
import { Practice, Slide, Presentation, RecentPractice } from '@/types/presentation.types';

export const getPresentationList = async (): Promise<Presentation[]> => {
  const res = await apiClient.get('api/v1/presentations/my');
  return res.data;
};

export const getRecentPractice = async (): Promise<RecentPractice> => {
  const res = await apiClient.get(`api/v1/home/summary`);
  return res.data;
};
