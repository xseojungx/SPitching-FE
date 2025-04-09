import TriangleIcon from '../../../assets/triangle.svg?react';

const DurationCard = () => {
  return (
    <article className='white-card col-span-3 col-start-2 row-span-2 row-start-9'>
      {/* 상단 시간 정보 */}
      <div className='mb-2 flex w-full items-center justify-between'>
        <div className='flex items-center text-gray-900'>
          <span className='s1 mr-1'>⏱ 27분 17초</span>
          <span className='b2 text-gray-500'>/ 25분</span>
        </div>
        <div className='text-navy-700 flex items-center text-sm font-medium'>
          <TriangleIcon className='mr-1 rotate-180' />
          2분 49초
        </div>
      </div>

      {/* 아래 상자 */}
      <div className='flex flex-1 flex-col gap-2'>
        {/* 제안 문구 */}
        <p className='b2 text-gray-900'>이 부분은 더 줄일 수 있지 않을까요?</p>

        {/* 구간 리스트 */}
        <div className='flex flex-1 flex-col justify-center gap-1 text-gray-800'>
          <div className='flex items-center text-sm'>
            <div className='bg-avocado-400 c1 mr-2 flex h-5 w-5 items-center justify-center rounded-full text-gray-900'>
              4
            </div>
            7분 32초
          </div>
          <div className='flex items-center text-sm'>
            <div className='bg-avocado-400 c1 mr-2 flex h-5 w-5 items-center justify-center rounded-full text-green-900'>
              9
            </div>
            5분 06초
          </div>
        </div>
      </div>
    </article>
  );
};

export default DurationCard;
