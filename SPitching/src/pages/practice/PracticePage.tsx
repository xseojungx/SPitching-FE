// PracticePage.tsx
import ScriptViewer from '@/components/practice/ScriptViewer';
import PracticeContent from '@/components/practice/PracticeContent';
import PracticeHeader from '../../components/practice/PracticeHeader';
import { useRef, useState } from 'react';
import CameraRecorder, {
  CameraRecorderHandle,
} from '@/components/practice/CameraRecorder';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from '@/components/common/LoadingOverlay';

const PracticePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const recorderRef = useRef<CameraRecorderHandle>(null);
  const navigate = useNavigate();

  const handleRecordingComplete = async (blob: Blob) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', blob, 'practice_video.webm');
    formData.append('userId', '5');
    formData.append('presentationId', '55');
    formData.append('practiceId', '4');

    try {
      const response = await fetch(
        'http://localhost:8000/api/v1/feedback/gesture',
        { method: 'POST', body: formData },
      );

      if (!response.ok) {
        throw new Error(`분석 실패: ${response.status}`);
      }

      const result = await response.json();

      navigate('/feedback/summary', { state: result });

      alert('제스처 분석 완료!');
    } catch (err) {
      console.error('AI 서버 전송 오류:', err);
      alert('AI 분석 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = () => {
    recorderRef.current?.startRecording();
    setIsRecording(true); // 👉 버튼 숨기기용 상태 변경
  };

  const handleFinish = () => {
    recorderRef.current?.stopRecording();
  };

  return (
    <div className='box-border flex h-screen w-screen flex-col pt-24 [background:linear-gradient(114deg,#F6FCEF_0%,#E6EFF4_100%)]'>
      <PracticeHeader onFinish={handleFinish} />

      <div className='flex flex-1 items-center justify-center overflow-hidden'>
        <article className='relative flex h-full max-h-[1080px] min-h-50 w-10/12 max-w-screen-2xl gap-4'>
          <div className='absolute top-8 left-8 z-50'>
            {!isRecording && (
              <button
                className='rounded-xl bg-gradient-to-r from-[#A9EAD6] to-[#4C9ACF] px-5 py-2 font-semibold text-white shadow-md backdrop-blur-sm transition hover:brightness-110'
                onClick={handleStart}
              >
                🎬 촬영 시작
              </button>
            )}
          </div>
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
