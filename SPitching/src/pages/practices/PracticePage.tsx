import CameraRecorder from '@/components/practice/CameraRecorder';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import { PracticeContent } from '@/components/practice/PracticeContent';
import PracticeHeader from '@/components/practice/PracticeHeader';
import ScriptViewer from '@/components/practice/ScriptViewer';
import QAModal from '@/components/practice/QAModal/QAModal';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '@/redux/store';
import { useMemo } from 'react';

import { useGetSlideList } from '@/hooks/usePractice';
import { usePracticeFlow } from '@/hooks/usePracticeFlow';
import { useQASession } from '@/hooks/useQASession';
import { useCameraRecorder } from '@/hooks/useCameraRecorder';

const PracticePage = () => {
  const { presentationId } = useParams();
  const pid = Number(presentationId);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const { data: slideList } = useGetSlideList(pid);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [qaModalOpen, setQaModalOpen] = useState(false);
  // 1️⃣ 발표이력 추적 (시작 전/후 구분용)
  const [hasStarted, setHasStarted] = useState(false);

  const { recorderRef } = useCameraRecorder();

  const {
    isRecording,
    isLoading,
    isQAFinished,
    graphReady,
    startPractice,
    completeRecording,
    finishPractice,
    setIsQAFinished,
  } = usePracticeFlow(pid, userId, recorderRef);

  const { messages, loading: qaLoading, handleUserSend, setMessages } = useQASession(pid);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (slideList ? Math.min(prev + 1, slideList.length - 1) : prev));
  };
  const handleQAFinish = () => {
    setQaModalOpen(false);
    setIsQAFinished(true);
  };

  type PageState =
    | 'beforeStart' // 1. 발표 시작 전
    | 'recording' // 2. 발표 중
    | 'qa' // 3. QA 세션 중
    | 'waitingAnalysis' // 4. QA 닫고 분석 대기
    | 'finished'; // 5. 분석 완료 → 리다이렉트

  const pageState = useMemo<PageState>(() => {
    if (!hasStarted) return 'beforeStart'; // 1
    if (isRecording) return 'recording'; // 2
    if (qaModalOpen) return 'qa'; // 3
    if (isQAFinished && !graphReady) return 'waitingAnalysis'; // 4
    if (isQAFinished && graphReady) return 'finished'; // 5
    return 'beforeStart';
  }, [hasStarted, isRecording, qaModalOpen, isQAFinished, graphReady]);

  // 8️⃣ startPractice 래핑해서 hasStarted도 true로 전환
  const onStartPractice = () => {
    setHasStarted(true);
    startPractice();
  };

  return (
    <div className='box-border flex h-screen w-screen flex-col pt-24 [background:linear-gradient(114deg,#F6FCEF_0%,#E6EFF4_100%)]'>
      <PracticeHeader
        onFinish={() =>
          finishPractice((firstAssistantMsg) => {
            setQaModalOpen(true);
            setMessages([{ role: 'assistant', content: firstAssistantMsg }]);
          })
        }
        isRecording={isRecording}
      />

      {/* 1. 발표 시작 전 */}
      {pageState === 'beforeStart' && (
        <div className='bg-opacity-70 fixed inset-0 z-1 flex h-screen w-screen items-center justify-center border-gray-200 bg-gray-700/20 backdrop-blur-sm'>
          <button
            className='bg-mint-500 h-20 w-64 rounded-lg border text-xl font-semibold text-gray-900 shadow-lg backdrop-blur-md transition hover:brightness-105'
            onClick={onStartPractice}
          >
            🎬 연습 시작하기
          </button>
        </div>
      )}

      {/* 2. 발표 중: CameraRecorder와 슬라이드만 보임 */}
      <div className='flex flex-1 items-center justify-center overflow-hidden'>
        <article className='relative flex h-full max-h-[1080px] min-h-50 w-10/12 max-w-screen-2xl gap-4'>
          <CameraRecorder
            ref={recorderRef}
            onRecordingComplete={completeRecording}
          />
          {slideList && (
            <PracticeContent
              slideList={slideList}
              currentIndex={currentSlideIndex}
            />
          )}
        </article>
      </div>
      {slideList && pageState !== 'beforeStart' && (
        <ScriptViewer
          slideList={slideList}
          currentIndex={currentSlideIndex}
          onPrev={handlePrevSlide}
          onNext={handleNextSlide}
        />
      )}

      {/* 3. QA 세션 중: QAModal이 띄워짐 */}
      <QAModal
        isOpen={qaModalOpen}
        onClose={handleQAFinish}
        messages={messages}
        onSend={handleUserSend}
        loading={qaLoading}
      />

      {/* 4. QA 세션 닫고 분석 대기: LoadingOverlay */}
      {(pageState === 'waitingAnalysis' || isLoading) && <LoadingOverlay />}
    </div>
  );
};
export default PracticePage;
