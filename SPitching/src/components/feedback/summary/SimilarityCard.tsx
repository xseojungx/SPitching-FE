import TriangleIcon from '../../../assets/triangle.svg?react';

const SimilarityCard = () => {
  return (
    <article className='white-card col-span-3 col-start-2 row-span-2 row-start-7 justify-center gap-3'>
      <p className='s1 text-gray-900'>대본 유사도</p>
      <div className='flex shrink-0 items-center justify-between self-stretch'>
        <div className='flex flex-col items-start gap-1'>
          <span className='b2 text-gray-900'>높은 유사도입니다</span>
          <div className='c2 flex items-center text-gray-700'>
            <TriangleIcon className='mr-1 text-rose-500' />
            <span>유사도가&nbsp;</span>
            <span className='c1 text-rose-500'>5%&nbsp;</span>
            <span>상승했습니다.</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SimilarityCard;
