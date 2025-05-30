import { useQuery } from '@tanstack/react-query';
import {
  getEyeContactScore,
  getFeedbackSummary,
  getFluencyScore,
  getGestureScore,
  getSimilarityScore,
  getRecentFeedback,
  getGraphScores,
} from '@/services/feedback.api';
import {
  FeedbackSummary,
  EyeContactScore,
  FluencyScore,
  GestureScore,
  SimilarityScore,
  GraphScoreResponse,
} from '@/types/feedback.types';

export const useFeedbackSummary = (practiceId: number) =>
  useQuery({
    queryKey: ['feedbackSummary', practiceId],
    queryFn: () => getFeedbackSummary(practiceId),
    select: (data) => data as FeedbackSummary,
    retry: false,
    enabled: !!practiceId,
  });

export const useRecentFeedback = () =>
  useQuery({ queryKey: ['recentFeedback'], queryFn: getRecentFeedback });

export const useFeedbackEyeContact = (practiceId: number) =>
  useQuery({
    queryKey: ['feedbackEyeContact', practiceId],
    queryFn: () => getEyeContactScore(practiceId),
    select: (data) => data as EyeContactScore,
    retry: false,
    enabled: !!practiceId,
  });

export const useFeedbackFluency = (practiceId: number) =>
  useQuery({
    queryKey: ['feedbackFluency', practiceId],
    queryFn: () => getFluencyScore(practiceId),
    select: (data) => data as FluencyScore,
    retry: false,
    enabled: !!practiceId,
  });

export const useFeedbackGesture = (practiceId: number) =>
  useQuery({
    queryKey: ['feedbackGesture', practiceId],
    queryFn: () => getGestureScore(practiceId),
    select: (data) => data as GestureScore,
    retry: false,
    enabled: !!practiceId,
  });

export const useFeedbackSimilarity = (practiceId: number) =>
  useQuery({
    queryKey: ['feedbackSimilarity', practiceId],
    queryFn: () => getSimilarityScore(practiceId),
    select: (data) => data as SimilarityScore,
    retry: false,
    enabled: !!practiceId,
  });

export const useGraphScores = (practiceId: number) =>
  useQuery({
    queryKey: ['graphScores', practiceId],
    queryFn: () => getGraphScores(practiceId),
    select: (data) => data as GraphScoreResponse,
    retry: false,
    enabled: !!practiceId,
  });

