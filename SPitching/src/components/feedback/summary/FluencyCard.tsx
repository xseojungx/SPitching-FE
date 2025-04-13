import TriangleIcon from '../../../assets/triangle.svg?react';
import ScorePieChart from '../../common/ScorePieChart';
import FluencyBar from './FluencyBar';

const FluencyCard = () => {
  return (
    <div className='white-card col-span-4 col-start-5 row-span-4 row-start-7 cursor-pointer transition duration-400 hover:-translate-y-1 hover:shadow-lg'>
      <p className='s1 justify-self-start text-gray-900'>발표 유창성</p>

      <div className='flex shrink-0 items-center justify-between self-stretch'>
        <div className='flex flex-col items-start gap-1'>
          <span className='b2 text-gray-900'>높은 유사도입니다</span>
          <div className='c2 flex items-center whitespace-nowrap text-gray-700'>
            <TriangleIcon className='mr-1 text-rose-500' />
            <span>유사도가&nbsp;</span>
            <span className='c1 text-rose-500'>5%&nbsp;</span>
            <span>상승했습니다.</span>
          </div>
        </div>

        {/* 차트 */}
        <div className='relative h-20 w-20'>
          <ScorePieChart value={80} />
          <div className='h2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-900'>
            80
          </div>
        </div>
      </div>
      <div className='mt-8 flex w-full flex-1 flex-col gap-4'>
        <FluencyBar
          title='불필요한 추임새'
          total={29}
          segments={[
            { label: '어', count: 20, color: '#A9EAD6' },
            { label: '음', count: 9, color: '#4C9ACF' },
            { label: '그', count: 10, color: '#989ccf' },
          ]}
        />

        <FluencyBar
          title='발화/침묵 비율'
          total={99}
          unit='%'
          segments={[
            { label: '발화', count: 70, color: '#4C9ACF' },
            { label: '침묵', count: 29, color: '#a6a6a6' },
          ]}
        />
      </div>
    </div>
  );
  return (
    <article className='white-card col-span-3 col-start-2 row-span-2 row-start-7'>
      <p className='s1 justify-self-start text-gray-900'>대본 유사도</p>

      <div className='flex flex-1 shrink-0 items-center justify-between self-stretch'>
        <div className='flex flex-col items-start gap-1'>
          <span className='b2 text-gray-900'>높은 유사도입니다</span>
          <div className='c2 flex items-center whitespace-nowrap text-gray-700'>
            <TriangleIcon className='mr-1 text-rose-500' />
            <span>유사도가&nbsp;</span>
            <span className='c1 text-rose-500'>5%&nbsp;</span>
            <span>상승했습니다.</span>
          </div>
        </div>

        {/* 차트 */}
        <div className='relative h-20 w-20'>
          <ScorePieChart value={80} />
          <div className='h2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-900'>
            80
          </div>
        </div>
      </div>
    </article>
  );
};

export default FluencyCard;
