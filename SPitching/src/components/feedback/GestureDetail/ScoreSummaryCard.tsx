import ScorePieChart from '@/components/common/ScorePieChart';
import {
  HandHelping,
  Hand,
  UserCheck2,
  Handshake,
  Frown,
  CircleCheckIcon,
  TriangleAlertIcon,
} from 'lucide-react';
// import ScorePieChart from '@/components/common/ScorePieChart';

interface ScoreSummaryCardProps {
  gestureScore: number;
  crossedScore: number;
  raisedScore: number;
  faceScore: number;
  explainScore: number;
  straightScore: number;
}

const ScoreSummaryCard = ({
  gestureScore,
  crossedScore,
  raisedScore,
  faceScore,
  explainScore,
  straightScore,
}: ScoreSummaryCardProps) => {
  return (
    <div className='white-card col-span-3 col-start-2 row-span-9 flex flex-col items-start justify-start gap-4'>
      {/* 총점 */}
      <div className='flex w-full flex-col items-center justify-center border-b-1 px-3'>
        {/* 총점 차트 */}
        <div className='relative h-30 w-30 shrink-0'>
          <ScorePieChart value={gestureScore} />
          <div className='h1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-900'>
            {gestureScore}
          </div>
        </div>
        <span className='s2 text-gray-900'>총점 {gestureScore}점</span>
      </div>

      {/* 긍정적인 제스처 점수 */}
      <div className='b1 w-full space-y-2 truncate p-4 text-gray-900'>
        {/* 긍정적인 제스처 점수 타이틀 */}
        <div className='s1 mt-3 mb-1 flex w-full items-center gap-1'>
          <CircleCheckIcon
            className='text-navy-700 stroke-3'
            size={20}
          />
          <p className='font-semibold text-gray-900'>긍정적인 제스처 점수</p>
        </div>
        {/* 설명하는 손동작 */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <HandHelping className='h-6 w-6 text-blue-500' />
            <span className='b1'>설명하는 손동작</span>
          </div>
          <span className='b1 text-gray-800'>{explainScore}점</span>
        </div>

        {/* 바른 자세 유지 */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <UserCheck2 className='h-6 w-6 text-blue-500' />
            <span className='b1'>바른 자세 유지</span>
          </div>
          <span className='b1 text-gray-800'>{straightScore}점</span>
        </div>

        {/* 부정적인 제스처 타이틀 */}
        <div className='s1 mt-3 mb-1 flex items-center gap-1'>
          <TriangleAlertIcon
            className='stroke-3 text-rose-500'
            size={20}
          />
          <p className='font-semibold text-gray-900'>부정적인 제스처 점수</p>
        </div>
        {/* 팔짱 끼기 */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Handshake className='h-6 w-6 text-rose-500' />
            <span className='b1'>팔짱 끼기</span>
          </div>
          <span className='b1 text-gray-800'>{crossedScore}점</span>
        </div>

        {/* 손을 과도하게 올리기 */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Hand className='h-6 w-6 text-rose-500' />
            <span className='b1'>손을 과도하게 올리기</span>
          </div>
          <span className='b1 text-gray-800'>{raisedScore}점</span>
        </div>

        {/* 얼굴 만지기 */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Frown className='h-6 w-6 text-rose-500' />
            <span className='b1'>얼굴 만지기</span>
          </div>
          <span className='b1 text-gray-800'>{faceScore}점</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreSummaryCard;
