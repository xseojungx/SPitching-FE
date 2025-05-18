// src/services/practice.api.ts
import apiClient from './apiClient';
import type { PracticeTag, SlideTag, UploadSlidesResponse } from '@/types/presentation.types';
import aiApiClient from './aiApiClient';

export const postNewPractice = async (presentationId: number): Promise<number> => {
  const res = await apiClient.post(
    '/api/v1/practice/start',
    { practice_type: 'FULL' },
    { params: { presentationId } },
  );

  return res.data.practiceId;
};

export const getSlideList = async (presentationId: number): Promise<UploadSlidesResponse> => {
  const res = await apiClient.get(`/api/v1/presentations/${presentationId}/slides`);
  return res.data;
};
export const getTagFromSlide = async (slideId: number): Promise<PracticeTag[]> => {
  const res = await apiClient.get(`/api/v1/tags`, { params: { slideId } });
  return res.data;
};

export const postQAStart = async (presentationId: number) => {
  const res = await apiClient.post(`/api/v1/presentations/${presentationId}/qa-session/start`);
  return res.data;
};

export const postQuestion = async ({
  presentationId,
  content,
}: {
  presentationId: number;
  content: string;
}): Promise<PostQuestionResponse> => {
  const res = await apiClient.post(
    `/api/v1/presentations/${presentationId}/qa-session/generate-question`,
    { role: 'user', content, timestamp: new Date().toISOString() },
  );
  return res.data;
};

interface PostQuestionResponse {
  role: string;
  content: string;
  timestamp: string;
}

export const postGestureFeedback = async (
  file: Blob,
  userId: number,
  presentationId: number,
  practiceId: number,
) => {
  const formData = new FormData();
  formData.append('file', file, 'recording.webm');
  formData.append('userId', String(userId));
  formData.append('presentationId', String(presentationId));
  formData.append('practiceId', String(practiceId));

  const res = await aiApiClient.post('/api/v1/feedback/gesture', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });

  return res.data;
};
export const postSttFeedback = async (
  file: Blob,
  userId: number,
  presentationId: number,
  practiceId: number,
) => {
  const formData = new FormData();
  formData.append('file', file, 'recording.webm');
  formData.append('userId', String(userId));
  formData.append('presentationId', String(presentationId));
  formData.append('practiceId', String(practiceId));

  const res = await aiApiClient.post('/api/v1/feedback/stt', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });

  return res.data;
};
export const postEyeFeedback = async (
  file: Blob,
  userId: number,
  presentationId: number,
  practiceId: number,
) => {
  const formData = new FormData();
  formData.append('file', file, 'recording.webm');
  formData.append('userId', String(userId));
  formData.append('presentationId', String(presentationId));
  formData.append('practiceId', String(practiceId));

  const res = await aiApiClient.post('/api/v1/feedback/eyecontact', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });

  return res.data;
};
