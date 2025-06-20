import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getSlideList,
  getTagFromSlide,
  postNewPractice,
  postQAStart,
  postQuestion,
  postAIFeedback,
} from '@/services/practice.api';
import { setPracticeId } from '@/redux/slices/practice.slice';
import { useDispatch } from 'react-redux';
import { ScoreDetails } from '@/types/feedback.types';

export const usePostNewPractice = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (presentationId: number) => postNewPractice(presentationId),
    onSuccess: (data) => {
      console.log('새 아이디', data);
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
export const useAIFeedback = () => {
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
    }) => postAIFeedback(file, userId, presentationId, practiceId),
    onSuccess: (data) => {
      console.log('ai 성공', data);
    },
  });
};

import { useState, useEffect, useRef } from 'react';
import apiClient from '@/services/apiClient';

export const useGraphPolling = (practiceId: number, start: boolean): boolean => {
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    if (!practiceId || !start) return;

    const fetchAndCheck = async () => {
      try {
        const res = await apiClient.get<ScoreDetails>(
          `api/v1/feedback/practice/${practiceId}/score-details`,
        );
        if (!res.data) return;

        if (res.data.scoreCalculated) {
          setCompleted(true);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
      } catch (e) {
        console.error('Summary polling error:', e);
      }
    };

    fetchAndCheck();
    intervalRef.current = window.setInterval(fetchAndCheck, 10000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [practiceId, start]);

  return completed;
};
