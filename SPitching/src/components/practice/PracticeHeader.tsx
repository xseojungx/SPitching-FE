import { useEffect, useRef, useState } from 'react';
{
  /* <button className="px-5 py-2 rounded-xl text-white font-semibold shadow-md backdrop-blur-sm bg-gradient-to-r from-[#A9EAD6] to-[#4C9ACF] transition hover:brightness-110">
  발표 종료하기
</button> */
}
type PracticeHeaderProps = { onFinish: () => void };

const PracticeHeader = ({ onFinish }: PracticeHeaderProps) => {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <header className='fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-white/80 px-6 shadow-md backdrop-blur-md'>
      <div className='text-lg font-semibold text-gray-700'>발표 연습 중</div>
      <div className='text-navy-700 font-mono text-xl'>
        {formatTime(seconds)}
      </div>
      <button
        onClick={onFinish}
        className='rounded-md bg-rose-500 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-rose-600'
      >
        발표 끝내기
      </button>
    </header>
  );
};

export default PracticeHeader;
