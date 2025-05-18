import TriangleIcon from '../../../assets/triangle.svg?react';
import ScorePieChart from '../../common/ScorePieChart';
import FluencyBar from './FluencyBar';
import { FluencyScore } from '@/types/feedback.types';

const FluencyCard = ({ fluencyData }: { fluencyData: FluencyScore }) => {
  const message = fluencyData.fluencyScore > 70 ? '높은 유창성입니다.' : '낮은 유창성입니다.';
  return (
    <div className='white-card col-span-4 col-start-5 row-span-4 row-start-7 cursor-pointer justify-between transition duration-400 hover:-translate-y-1 hover:shadow-lg'>
      <p className='s2 justify-self-start text-gray-900'>발표 유창성</p>
      {/* 상단 요약 정보 및 파이 차트 */}
      <div className='flex shrink-0 items-center justify-between self-stretch'>
        <div className='flex flex-col items-start gap-1'>
          <span className='b1 leading-tight text-gray-900'>{message}</span>

          <span className='b1 leading-tight text-gray-900'>
            총 {fluencyData.statisticsFiller[0].totalFillerCount}회의 추임새가 있었습니다.
          </span>
        </div>

        {/* 우측 파이 차트 */}
        <div className='relative h-20 w-20 shrink-0'>
          <ScorePieChart value={fluencyData.fluencyScore} />
          <div className='h2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-900'>
            {Math.round(fluencyData.fluencyScore)}
          </div>
        </div>
      </div>

      {/* 하단 바 차트 */}
      <div className='mt-2 flex w-full flex-1 flex-col justify-end gap-2'>
        <FluencyBar
          title='불필요한 추임새'
          total={fluencyData.statisticsFiller[0].totalFillerCount}
          segments={[
            { label: '어', count: fluencyData.statisticsFiller[0].eo, color: '#A9EAD6' },
            { label: '음', count: fluencyData.statisticsFiller[0].eum, color: '#4C9ACF' },
            { label: '그', count: fluencyData.statisticsFiller[0].geu, color: '#989ccf' },
          ]}
        />

        <FluencyBar
          title='발화/침묵 비율'
          total={
            fluencyData.statisticsSilence[0].speakingRatio +
            fluencyData.statisticsSilence[0].silenceRatio
          }
          unit='%'
          segments={[
            {
              label: '발화',
              count: Math.round(
                (fluencyData.statisticsSilence[0].speakingRatio /
                  (fluencyData.statisticsSilence[0].speakingRatio +
                    fluencyData.statisticsSilence[0].silenceRatio)) *
                  100,
              ),
              color: '#4C9ACF',
            },
            {
              label: '침묵',
              count: Math.round(
                (fluencyData.statisticsSilence[0].silenceRatio /
                  (fluencyData.statisticsSilence[0].speakingRatio +
                    fluencyData.statisticsSilence[0].silenceRatio)) *
                  100,
              ),
              color: '#a6a6a6',
            },
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
