import TriangleIcon from '../../../assets/triangle.svg?react';
import ScorePieChart from '../../common/ScorePieChart';
import FluencyBar from './FluencyBar';
import { FluencyScore } from '@/types/feedback.types';
import { useNavigate } from 'react-router-dom';

const FluencyCard = ({
  fluencyData,
  practiceId,
}: {
  fluencyData: FluencyScore;
  practiceId: number;
}) => {
  const navigate = useNavigate();
  const message = fluencyData.fluencyScore > 70 ? '높은 유창성입니다.' : '낮은 유창성입니다.';
  return (
    <div className='white-card group relative col-span-4 col-start-5 row-span-4 row-start-7 cursor-pointer justify-between transition duration-400 hover:-translate-y-1 hover:shadow-lg'>
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
      <div
        className='s2 absolute bottom-3 left-1/2 z-10 w-fit -translate-x-1/2 translate-y-2 cursor-pointer rounded-md bg-linear-to-r from-[rgba(76,154,207,1)] via-[rgba(120,192,210,1)] to-[rgba(169,234,214,1)] px-4 py-3 whitespace-nowrap text-white opacity-0 shadow-sm backdrop-blur-sm transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100'
        onClick={() => navigate(`/feedback/${practiceId}/fluency`)}
      >
        제스처 피드백 자세히 보러가기
      </div>
    </div>
  );
};

export default FluencyCard;
