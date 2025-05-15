import apiClient from './apiClient';
import type {
  CreatedPresentationResponse,
  UploadPresentationParams,
  UploadSlidesResponse,
  Script,
} from '@/types/presentation.types';

export const createPresentation = async (
  title: string,
  description: string,
  duration: string,
): Promise<CreatedPresentationResponse> => {
  const res = await apiClient.post('/api/v1/presentations/create', {
    title,
    description,
    duration,
  });
  return res.data;
};

export const uploadPresentationFile = async ({
  presentationId,
  file,
}: UploadPresentationParams): Promise<UploadSlidesResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await apiClient.post(`/api/v1/presentations/${presentationId}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data;
};

export const postTag = async (slideId: number, content: string) => {
  const res = await apiClient.post(`/api/v1/tags`, { content }, { params: { slideId } });
  return res.data;
};

export const deleteTag = async (tagId: number) => {
  const res = await apiClient.delete(`/api/v1/tags/${tagId}`);
  return res.data;
};

export const putScript = async (formattedScript: Script[], presentationId: number) => {
  const res = await apiClient.put(`/api/v1/presentations/${presentationId}/slides/script`, {
    formattedScript,
  });

  return res.data;
};
