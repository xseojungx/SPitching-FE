import ScorePieChart from '@/components/common/ScorePieChart';
import { calculateEyeContactFeedback } from '@/utils/feedbackMessage';

const EyeSummaryCard = ({ eyeContactScore }: { eyeContactScore: number }) => {
  return (
    <div className='white-card col-span-10 col-start-2 row-span-1 flex flex-row items-start justify-start gap-4'>
      {/* 총점 */}
      <div className='flex flex-col items-center justify-center border-r-1 px-3'>
        {/* 총점 차트 */}
        <div className='relative h-25 w-25 shrink-0'>
          <ScorePieChart value={eyeContactScore} />
          <div className='h1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-900'>
            {eyeContactScore}
          </div>
        </div>
        <span className='s2 text-gray-900'>총점 {eyeContactScore}점</span>
      </div>
      <div className='flex h-full flex-col items-center justify-center px-3'>
        <span className='b1 text-gray-900'>{calculateEyeContactFeedback(eyeContactScore)}</span>
      </div>
    </div>
  );
};

export default EyeSummaryCard;
