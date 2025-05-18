import CameraRecorder, { CameraRecorderHandle } from '@/components/practice/CameraRecorder';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import PracticeContent from '@/components/practice/PracticeContent';
import PracticeHeader from '@/components/practice/PracticeHeader';
import ScriptViewer from '@/components/practice/ScriptViewer';
import QAModal from '@/components/practice/QAModal/QAModal';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearPracticeId, setPracticeId } from '@/redux/slices/practice.slice';
import { RootState } from '@/redux/store';
import {
  usePostNewPractice,
  useGetSlideList,
  usePostQAStart,
  usePostQuestion,
  usePostSttFeedback,
  usePostEyeFeedback,
  usePostGestureFeedback,
  useGraphPolling,
} from '@/hooks/usePractice';

type Message = { role: 'user' | 'assistant'; content: string };

const PracticePage = () => {
  const { presentationId } = useParams();
  const pid = Number(presentationId);
  const { mutate: postNewPractice } = usePostNewPractice();
  const { mutate: startQASession } = usePostQAStart();
  const { mutateAsync: sendQuestion } = usePostQuestion();
  const { data: slideList } = useGetSlideList(pid);

  const practiceId = useSelector((state: RootState) => state.practice.practiceId) || 0;

  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [qaModalOpen, setQaModalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [qaLoading, setQaLoading] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isQAFinished, setIsQAFinished] = useState(false);

  const [pollStart, setPollStart] = useState(false);

  const graphReady = useGraphPolling(practiceId, pollStart);

  const recorderRef = useRef<CameraRecorderHandle>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.userId);

  // practiceId 초기화 및 새로 할당
  const handlePracticeStart = () => {
    if (practiceId) {
      dispatch(clearPracticeId());
    }
    postNewPractice(Number(presentationId));
    recorderRef.current?.startRecording();
    setIsRecording(true);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (slideList ? Math.min(prev + 1, slideList.length - 1) : prev));
  };

  // 녹화 완료 시 처리
  const { mutate: analyzeStt, isPending: sttLoading } = usePostSttFeedback();
  const { mutate: analyzeEye, isPending: eyeLoading } = usePostEyeFeedback();
  const { mutate: analyzeGesture, isPending: gestureLoading } = usePostGestureFeedback();

  const handleRecordingComplete = async (blob: Blob) => {
    setIsLoading(true);

    try {
      if (practiceId && blob && userId) {
        analyzeStt({ file: blob, userId, presentationId: pid, practiceId });
        analyzeEye({ file: blob, userId, presentationId: pid, practiceId });
        analyzeGesture({ file: blob, userId, presentationId: pid, practiceId });
      } else {
        throw new Error('유효하지 않습니다.');
      }
      setPollStart(true);
      await new Promise((res) => setTimeout(res, 2000));
    } catch (err) {
      console.error('AI 서버 전송 오류:', err);
      alert('AI 분석 실패');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isQAFinished && graphReady) {
      navigate(`/feedback/summary/${practiceId}`);
    }
  }, [isQAFinished, graphReady]);

  const handleFinish = () => {
    recorderRef.current?.stopRecording();
    setIsRecording(false);
    // QA 세션 시작
    startQASession(pid, {
      onSuccess: () => {
        setQaModalOpen(true);
        // 첫 프롬프트 전송
        (async () => {
          setQaLoading(true);
          const res = await sendQuestion({ presentationId: pid, content: '제 발표를 본 소감은?' });
          setMessages([{ role: 'assistant', content: res.content }]);
          setQaLoading(false);
        })();
      },
    });
  };

  const handleUserSend = async (text: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setQaLoading(true);
    const res = await sendQuestion({ presentationId: pid, content: text });
    setMessages((prev) => [...prev, { role: 'assistant', content: res.content }]);
    setQaLoading(false);
  };

  return (
    <div className='box-border flex h-screen w-screen flex-col pt-24 [background:linear-gradient(114deg,#F6FCEF_0%,#E6EFF4_100%)]'>
      <PracticeHeader
        onFinish={handleFinish}
        isRecording={isRecording}
      />
      {!isRecording && (
        <div className='bg-opacity-70 fixed inset-0 z-1 flex h-screen w-screen items-center justify-center border-gray-200 bg-gray-700/20 backdrop-blur-sm'>
          <button
            className='bg-mint-500 h-20 w-64 rounded-lg border text-xl font-semibold text-gray-900 shadow-lg backdrop-blur-md transition hover:brightness-105'
            onClick={handlePracticeStart}
          >
            🎬 연습 시작하기
          </button>
        </div>
      )}
      <div className='flex flex-1 items-center justify-center overflow-hidden'>
        <article className='relative flex h-full max-h-[1080px] min-h-50 w-10/12 max-w-screen-2xl gap-4'>
          <CameraRecorder
            ref={recorderRef}
            onRecordingComplete={handleRecordingComplete}
          />
          {slideList && (
            <PracticeContent
              slideList={slideList}
              currentIndex={currentSlideIndex}
            />
          )}
        </article>
      </div>
      {slideList && (
        <ScriptViewer
          slideList={slideList}
          currentIndex={currentSlideIndex}
          onPrev={handlePrevSlide}
          onNext={handleNextSlide}
        />
      )}
      {isLoading && <LoadingOverlay />}
      <QAModal
        isOpen={qaModalOpen}
        onClose={() => {
          setQaModalOpen(false);
          setIsQAFinished(true);
        }}
        messages={messages}
        onSend={handleUserSend}
        loading={qaLoading}
      />
    </div>
  );
};
export default PracticePage;
