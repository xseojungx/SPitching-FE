import { TimerIcon } from 'lucide-react';
import { memo } from 'react';
import Timer from './Timer';

type PracticeHeaderProps = { onFinish: () => void; isRecording: boolean };

const PracticeHeader = memo(({ onFinish, isRecording }: PracticeHeaderProps) => {
  const formatTime = (totalSeconds: number) => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <header className='fixed top-0 left-0 z-60 flex h-16 w-full items-center justify-between bg-white px-6 shadow'>
      <div className='text-xl font-bold text-[#255A9B]'>SPitching</div>

      <div className='flex items-center gap-6 text-sm text-gray-700'>
        <div className='flex items-center justify-center gap-2'>
          <TimerIcon className='w-4=6 h-6 text-gray-700' />
          <Timer isRecording={isRecording} />
        </div>
        {isRecording && (
          <button
            onClick={onFinish}
            className='rounded-xl bg-gradient-to-r from-[#A9EAD6] to-[#4C9ACF] px-5 py-2 font-semibold text-white shadow-md backdrop-blur-sm transition hover:brightness-110'
          >
            발표 종료하기
          </button>
        )}
      </div>
    </header>
  );
});

export default PracticeHeader;
