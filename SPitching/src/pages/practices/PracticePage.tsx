// PracticePage.tsx
import ScriptViewer from '@/components/practice/ScriptViewer';
import PracticeContent from '@/components/practice/PracticeContent';
import PracticeHeader from '../../components/practice/PracticeHeader';
import { useRef, useState } from 'react';
import CameraRecorder, { CameraRecorderHandle } from '@/components/practice/CameraRecorder';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from '@/components/common/LoadingOverlay';

const PracticePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const recorderRef = useRef<CameraRecorderHandle>(null);
  const navigate = useNavigate();

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleRecordingComplete = async (blob: Blob) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', blob, 'practice_video');
    formData.append('userId', '5');
    formData.append('presentationId', '55');
    formData.append('practiceId', '4');
    console.log(formData);

    try {
      const response = await fetch('http://localhost:8000/api/v1/feedback/gesture', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`분석 실패: ${response.status}`);
      }

      const result = await response.json();
      await new Promise((res) => setTimeout(res, 2000));

      navigate('/feedback/summary', { state: result });
    } catch (err) {
      console.error('AI 서버 전송 오류:', err);
      alert('AI 분석 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = () => {
    recorderRef.current?.startRecording();
    setIsRecording(true);
    startTimer();
  };

  const handleFinish = () => {
    recorderRef.current?.stopRecording();
    stopTimer();
  };

  return (
    <div className='box-border flex h-screen w-screen flex-col pt-24 [background:linear-gradient(114deg,#F6FCEF_0%,#E6EFF4_100%)]'>
      <PracticeHeader
        onFinish={handleFinish}
        seconds={seconds}
      />
      {!isRecording && (
        <div className='bg-opacity-70 fixed inset-0 z-1 flex h-screen w-screen items-center justify-center border-gray-200 bg-gray-700/20 backdrop-blur-sm'>
          <button
            className='bg-mint-500 h-20 w-64 rounded-lg border text-xl font-semibold text-gray-900 shadow-lg backdrop-blur-md transition hover:brightness-105'
            onClick={handleStart}
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
          <PracticeContent />
        </article>
      </div>
      <ScriptViewer />
      {isLoading && <LoadingOverlay />}
    </div>
  );
};
export default PracticePage;
