import { useEffect, useRef, useState } from 'react';

type Props = { isRecording: boolean };

const Timer: React.FC<Props> = ({ isRecording }) => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRecording && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    if (!isRecording && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRecording]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className='font-mono text-lg text-gray-800'>
      {mm}:{ss}
    </div>
  );
};

export default Timer;
