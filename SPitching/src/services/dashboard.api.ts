// src/services/dashboard.api.ts
import apiClient from './apiClient';

export interface Presentation {
  title: string;
  description: string;
  practiceCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export const getPresentationList = async (): Promise<Presentation[]> => {
  const res = await apiClient.get('/api/v1/presentations/list');
  return res.data;
};
