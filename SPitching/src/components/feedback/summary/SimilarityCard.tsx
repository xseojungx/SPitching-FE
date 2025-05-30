import TriangleIcon from '../../../assets/triangle.svg?react';
import ScorePieChart from '../../common/ScorePieChart';
import type { SimilarityScore } from '@/types/feedback.types';

interface SimilarityCardProps extends SimilarityScore {
  prevSimilarity: number;
}

// 유사도 변화율 계산 함수
function getSimilarityChange(current: number, prev: number) {
  const diff = current - prev;
  const absDiff = Math.abs(diff);
  const isIncrease = diff >= 0;
  // 소숫점 두자리까지 반환
  return { absDiff: absDiff.toFixed(2), isIncrease };
}

const SimilarityCard = ({ practiceId, scriptSimilarity, prevSimilarity }: SimilarityCardProps) => {
  const message = scriptSimilarity > 70 ? '높은 유사도입니다' : '낮은 유사도입니다';

  const { absDiff, isIncrease } = getSimilarityChange(scriptSimilarity, prevSimilarity);

  return (
    <article
      key={practiceId}
      className='white-card col-span-3 col-start-2 row-span-2 row-start-7 cursor-pointer transition duration-400 hover:-translate-y-1 hover:shadow-lg'
    >
      <p className='s2 justify-self-start text-gray-900'>대본 유사도</p>

      <div className='flex flex-1 shrink-0 items-center justify-between self-stretch'>
        <div className='flex flex-col items-start gap-1'>
          <span className='b1 text-gray-900'>{message}</span>
          <div className='c2 flex flex-wrap items-center wrap-anywhere text-gray-700'>
            <TriangleIcon className={`mr-1 ${isIncrease ? '' : 'rotate-180'} text-rose-500`} />
            <span className='whitespace-nowrap'>유사도가&nbsp;</span>
            <span className='c1 whitespace-nowrap text-rose-500'>{absDiff}%&nbsp;</span>
            <span className='whitespace-nowrap'>
              {isIncrease ? '증가했습니다.' : '감소했습니다.'}
            </span>
          </div>
        </div>

        {/* 차트 */}
        <div className='relative h-20 w-20 shrink-0'>
          <ScorePieChart value={scriptSimilarity} />
          <div className='h2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-900'>
            {scriptSimilarity > 10 ? Math.round(scriptSimilarity) : scriptSimilarity.toFixed(1)}
          </div>
        </div>
      </div>
    </article>
  );
};

export default SimilarityCard;
