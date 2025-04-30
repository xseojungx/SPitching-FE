import apiClient from './apiClient';

export interface Presentation {
  title: string;
  description: string;
  practiceCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export const getPresentationList = () => apiClient.get('api/v1/presentations/list');
