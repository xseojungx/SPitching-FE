// hooks/usePracticeFlow.ts
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPracticeId, clearPracticeId } from '@/redux/slices/practice.slice';
import {
  usePostNewPractice,
  useAIFeedback,
  usePostQAStart,
  usePostQuestion,
  useGraphPolling,
} from './usePractice';
import type { CameraRecorderHandle } from '@/components/practice/CameraRecorder';

export const usePracticeFlow = (
  pid: number,
  userId: number | null,
  recorderRef: React.RefObject<CameraRecorderHandle | null>,
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pollStart, setPollStart] = useState(false);
  const [isQAFinished, setIsQAFinished] = useState(false);

  const practiceIdRef = useRef<number | null>(null);

  const graphReady = useGraphPolling(practiceIdRef.current ?? 0, pollStart);

  const { mutate: postNewPractice } = usePostNewPractice();
  const { mutate: analyzeAi } = useAIFeedback();
  const { mutate: startQASession } = usePostQAStart();
  const { mutateAsync: sendQuestion } = usePostQuestion();

  const startPractice = () => {
    if (!pid) return;
    dispatch(clearPracticeId());

    postNewPractice(pid, {
      onSuccess: (newId) => {
        dispatch(setPracticeId(newId));
        practiceIdRef.current = newId;
        recorderRef.current?.startRecording();
        setIsRecording(true);
      },
    });
  };

  const completeRecording = async (blob: Blob) => {
    setIsLoading(true);
    try {
      if (userId && practiceIdRef.current) {
        await analyzeAi({
          file: blob,
          userId,
          presentationId: pid,
          practiceId: practiceIdRef.current,
        });
        setPollStart(true);
      } else {
        throw new Error('Invalid data for analysis');
      }
    } catch (err) {
      console.error('AI 분석 실패:', err);
      alert('AI 분석 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const finishPractice = (onQAModalOpen: (message: string) => void) => {
    recorderRef.current?.stopRecording();
    setIsRecording(false);

    startQASession(pid, {
      onSuccess: async () => {
        const res = await sendQuestion({ presentationId: pid, content: '제 발표를 본 소감은?' });
        onQAModalOpen(res.content);
      },
    });
  };

  useEffect(() => {
    if (isQAFinished && graphReady) {
      navigate(`/feedback/${practiceIdRef.current}/summary`);
    }
  }, [isQAFinished, graphReady]);

  return {
    isRecording,
    isLoading,
    startPractice,
    completeRecording,
    finishPractice,
    setIsQAFinished,
  };
};
