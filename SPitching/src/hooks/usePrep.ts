import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createPresentation,
  postTag,
  deleteTag,
  uploadPresentationFile,
} from '@/services/prep.api';
import { usePracticeCreation } from '@/contexts/PracticeCreationContext';
import type {
  CreatedPresentationResponse,
  NewTag,
  UploadPresentationParams,
  UploadSlidesResponse,
} from '@/types/presentation.types';
import { useNavigate } from 'react-router-dom';
interface CreatePresentationParams {
  title: string;
  description: string;
  duration: string;
}

export const useCreatePresentation = () => {
  const navigate = useNavigate();

  const { setDetails, setPresentationId } = usePracticeCreation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreatePresentationParams) =>
      createPresentation(params.title, params.description, params.duration),

    // ✅ 성공 시 응답 data를 받음
    onSuccess: (data: CreatedPresentationResponse) => {
      console.log('✅ 생성 응답:', data);
      // 상태 저장
      setDetails({ title: data.title, description: data.description, duration: data.duration });
      setPresentationId(data.id); // 혹은 필요에 따라 다른 ID 사용

      // presentation 목록 갱신
      queryClient.invalidateQueries({ queryKey: ['presentations'] });

      // 파일 업로드 페이지로 이동
      navigate('/practices/new/file');
    },

    onError: (error) => {
      console.error('❌ 생성 실패:', error);
    },
  });
};

export const useUploadPresentation = () => {
  const navigate = useNavigate();
  const { setSlides } = usePracticeCreation();
  return useMutation<UploadSlidesResponse, Error, UploadPresentationParams>({
    mutationFn: (params: UploadPresentationParams) => uploadPresentationFile(params),
    onSuccess: (data) => {
      console.log('✅ 업로드 완료된 슬라이드:', data);
      // 슬라이드 목록 갱신
      setSlides(data);
      // 스크립트 입력 페이지로 이동
      navigate('/practices/new/script');
    },
    onError: (error) => {
      console.error('❌ 업로드 실패:', error);
    },
  });
};

export const usePostTag = () => {
  const { addTag } = usePracticeCreation();
  return useMutation({
    mutationFn: (params: NewTag) => postTag(params.slideId, params.content),
    onSuccess: (data, variables) => {
      const { slideId, content } = variables;
      console.log('✅ 태그 추가 완료:', data);
      addTag(slideId, content, data.id); // 여기서 slideId 사용 가능 ✅
    },
    onError: (error) => {
      console.error('❌ 태그 추가 실패:', error);
    },
  });
};

export const useDeleteTag = () => {
  return useMutation({ mutationFn: (slideId: number) => deleteTag(slideId) });
};
