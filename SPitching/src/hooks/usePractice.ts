import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getSlideList,
  getTagFromSlide,
  postEyeFeedback,
  postGestureFeedback,
  postNewPractice,
  postQAStart,
  postQuestion,
  postSttFeedback,
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

export const usePostSttFeedback = () => {
  return useMutation({
    mutationFn: ({
      file,
      userId,
      presentationId,
      practiceId,
    }: {
      file: Blob;
      userId: number;
      presentationId: number;
      practiceId: number;
    }) => postSttFeedback(file, userId, presentationId, practiceId),
  });
};
export const usePostEyeFeedback = () => {
  return useMutation({
    mutationFn: ({
      file,
      userId,
      presentationId,
      practiceId,
    }: {
      file: Blob;
      userId: number;
      presentationId: number;
      practiceId: number;
    }) => postEyeFeedback(file, userId, presentationId, practiceId),
  });
};
export const usePostGestureFeedback = () => {
  return useMutation({
    mutationFn: ({
      file,
      userId,
      presentationId,
      practiceId,
    }: {
      file: Blob;
      userId: number;
      presentationId: number;
      practiceId: number;
    }) => postGestureFeedback(file, userId, presentationId, practiceId),
  });
};

import { useState, useEffect, useRef } from 'react';
import apiClient from '@/services/apiClient';
import type { RecentPractice } from '@/types/presentation.types';

export const useGraphPolling = (practiceId: number, start: boolean): boolean => {
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    const fetchAndCheck = async () => {
      try {
        console.log('폴링', practiceId);
        const res = await apiClient.get<RecentPractice>('/api/v1/home/summary', {
          params: { practiceId },
        });
        const graph = res.data.graph;
        // graph 객체의 모든 값이 null이 아니면 완료
        const allNonNull = Object.values(graph).every((v) => v !== null);
        if (allNonNull) {
          setCompleted(true);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
      } catch (e) {
        console.error('Summary polling error:', e);
      }
    };

    // 즉시 한 번 실행
    fetchAndCheck();
    // 15초마다 반복
    intervalRef.current = window.setInterval(fetchAndCheck, 15000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [practiceId, start]);

  return completed;
};
