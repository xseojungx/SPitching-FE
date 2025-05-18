// src/services/practice.api.ts
import apiClient from './apiClient';
import type { PracticeTag, SlideTag, UploadSlidesResponse } from '@/types/presentation.types';
export const postGestureFeedback = async (
  blob: Blob,
  userId: number,
  presentationId: number,
  practiceId: number,
): Promise<any> => {
  const formData = new FormData();
  formData.append('file', blob, 'practice_video.webm');
  formData.append('userId', String(userId));
  formData.append('presentationId', String(presentationId));
  formData.append('practiceId', String(practiceId));

  const response = await fetch('http://localhost:8000/api/v1/feedback/gesture', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`AI 분석 실패: ${response.status}`);
  }

  return await response.json();
};

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
