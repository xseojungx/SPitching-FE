import TriangleIcon from '../../../assets/triangle.svg?react';

interface DurationCardProps {
  second: number;
  goal?: number; // 목표 시간 (선택적)
}
const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}분 ${seconds}초`;
};
const DurationCard = ({ second, goal }: DurationCardProps) => {
  console.log('DurationCard props:', { second, goal });
  return (
    <article className='white-card col-span-3 col-start-2 row-span-2 row-start-9'>
      <span className='s2 justify-self-start text-gray-900'>발표 시간</span>
      <div className='flex flex-1 flex-col justify-center'>
        {/* 상단 시간 정보 */}
        <div className='mb-2 flex w-full items-center justify-between'>
          <div className='flex items-center text-gray-900'>
            <span className='s1 mr-1'>⏱ {formatTime(second)}</span>
            <span className='b2 text-gray-500'>/ {goal}분</span>
          </div>
        </div>
        {goal !== undefined && (
          <div
            className={`flex items-center text-base font-semibold ${
              second > goal * 60 ? 'text-rose-500' : 'text-navy-700'
            }`}
          >
            <TriangleIcon className={`mr-2 ${second > goal * 60 ? '' : 'rotate-180'}`} />
            목표 시간보다{' '}
            {second > goal * 60
              ? formatTime(second - goal * 60) + ' 초과.'
              : formatTime(goal * 60 - second) + ' 미만.'}
          </div>
        )}
      </div>
    </article>
  );
};

export default DurationCard;
