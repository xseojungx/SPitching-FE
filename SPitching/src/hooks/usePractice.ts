import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getSlideList,
  getTagFromSlide,
  postNewPractice,
  postQAStart,
  postQuestion,
} from '@/services/practice.api';
import { setPracticeId } from '@/redux/slices/practice.slice';
import { useDispatch } from 'react-redux';

export const usePostNewPractice = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (presentationId: number) => postNewPractice(presentationId),
    onSuccess: (data) => {
      console.log(data);
      dispatch(setPracticeId(data));
    },
  });
};

export const useGetSlideList = (presentationId: number) => {
  return useQuery({
    queryKey: ['slideList', presentationId],
    queryFn: () => getSlideList(presentationId),
    select: (data) => data,
    enabled: !!presentationId,
  });
};

export const useGetTagFromSlide = (slideId: number) => {
  return useQuery({
    queryKey: ['tagList', slideId],
    queryFn: () => getTagFromSlide(slideId),
    select: (data) => data,
    enabled: !!slideId,
  });
};

export const usePostQAStart = () => {
  return useMutation({
    mutationFn: (presentationId: number) => postQAStart(presentationId),
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export const usePostQuestion = () => {
  return useMutation({
    mutationFn: ({ presentationId, content }: { presentationId: number; content: string }) =>
      postQuestion({ presentationId, content }),
  });
};
