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

  const { recorderRef } = useCameraRecorder();

  const {
    isRecording,
    isLoading,
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

      {!isRecording && (
        <div className='bg-opacity-70 fixed inset-0 z-1 flex h-screen w-screen items-center justify-center border-gray-200 bg-gray-700/20 backdrop-blur-sm'>
          <button
            className='bg-mint-500 h-20 w-64 rounded-lg border text-xl font-semibold text-gray-900 shadow-lg backdrop-blur-md transition hover:brightness-105'
            onClick={startPractice}
          >
            🎬 연습 시작하기
          </button>
        </div>
      )}
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
        onClose={handleQAFinish}
        messages={messages}
        onSend={handleUserSend}
        loading={qaLoading}
      />
    </div>
  );
};
export default PracticePage;
