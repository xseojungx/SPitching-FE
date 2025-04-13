import { HandHelping, Hand, UserCheck2, Handshake, Frown } from 'lucide-react';
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
    <div className='white-card col-span-3 col-start-2 row-span-8 flex flex-col items-start justify-start gap-4'>
      <p className='s1 justify-self-start text-gray-900'>제스처 피드백</p>
      <div className='flex w-full items-center justify-between border-b-1 px-3'>
        <span className='h1 text-3xl text-gray-700'>총점</span>
        <span className='h1 bg-gradient-to-b from-[#255A9B] via-[#7AB7CE] to-[#A9EAD6] bg-clip-text text-4xl text-transparent'>
          {gestureScore}점
        </span>
      </div>
      <div className='b1 w-full space-y-2 p-4 text-gray-900'>
        <p className='s1 text-navy-700'>+ 긍정적인 제스처 점수</p>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <HandHelping className='h-6 w-6 text-blue-500' />
            <span className='b1'>설명하는 손동작</span>
          </div>
          <span className='b1 text-gray-800'>{explainScore}점</span>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <UserCheck2 className='h-6 w-6 text-blue-500' />
            <span className='b1'>바른 자세 유지</span>
          </div>
          <span className='b1 text-gray-800'>{straightScore}점</span>
        </div>
        <p className='s1 mt-4 text-rose-500'>- 부정적인 제스처 점수</p>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Handshake className='h-6 w-6 text-rose-500' />
            <span className='b1'>팔짱 끼기</span>
          </div>
          <span className='b1 text-gray-800'>{crossedScore}점</span>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Hand className='h-6 w-6 text-rose-500' />
            <span className='b1'>손을 과도하게 올리기</span>
          </div>
          <span className='b1 text-gray-800'>{raisedScore}점</span>
        </div>

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
