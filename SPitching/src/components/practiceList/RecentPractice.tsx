import { useState, useEffect } from 'react';
import { recentPractice } from './mockdata';

type TagType = { page: number; count: number; notes: string[] };

const RecentPractice = () => {
  const [tag, setTag] = useState<TagType[]>([]);
  const [openPages, setOpenPages] = useState<number[]>([]);

  useEffect(() => {
    setTag(recentPractice.tags);
  }, []);

  const togglePage = (page: number) => {
    setOpenPages((prev) =>
      prev.includes(page) ? prev.filter((p) => p !== page) : [...prev, page],
    );
  };

  const renderTagItem = (data: TagType) => {
    const isOpen = openPages.includes(data.page);

    return (
      <div key={data.page}>
        <div
          className='flex cursor-pointer items-center gap-1'
          onClick={() => togglePage(data.page)}
        >
          <span className='b1 text-blue-500'>{isOpen ? '▼' : '▶'}</span>
          <span className='b1 text-gray-700'>{data.page} 페이지</span>
          <div className='text-cream-50 c1 flex h-3 w-3 items-center justify-center rounded-full bg-rose-500 text-[0.625rem] font-normal'>
            {data.count}
          </div>
        </div>

        {isOpen && data.notes.length > 0 && (
          <ul className='b2 mt-2 list-disc pl-6 font-normal tracking-[0.06px] text-gray-700'>
            {data.notes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
            <p className='mt-2 cursor-pointer text-right text-blue-500'>
              → {data.page}페이지 부분 연습하러 가기
            </p>
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className='col-span-10 grid grid-cols-10 grid-rows-[auto_1fr_64px] gap-4'>
      {/* 상단 제목 */}
      <div className='col-span-10 row-start-1 flex flex-col'>
        <span className='c2 text-gray-700'>최근 연습</span>
        <div className='flex items-baseline gap-2'>
          <span className='h2 text-gray-900'>{recentPractice.title}</span>
          <span className='b2 text-gray-700'>{recentPractice.description}</span>
          <span className='b2 text-gray-700'>{recentPractice.created}</span>
        </div>
      </div>

      {/* 좌측 요약 상자 */}
      <div className='white-card col-span-3 row-start-2 gap-1'>
        <div className='mb-3 aspect-[16/9] w-full bg-black' />
        <div className='flex flex-row items-center gap-2'>
          <span className='s2 text-gray-900'>최근 연습</span>
          <span className='b2 text-gray-700'>
            {recentPractice.metadata.lastPractice}
          </span>
        </div>
        <div className='flex flex-row items-center gap-3 text-xs'>
          <span className='s2 text-gray-900'>연습 횟수</span>
          <span className='b2 text-gray-700'>
            {recentPractice.metadata.practiceCount.total}
          </span>
        </div>
      </div>

      {/* 중앙 요약 상자 */}
      <div className='white-card relative col-span-4 row-start-2'>
        <div className='absolute m-4 flex flex-col'>
          <span className='c2 text-gray-700'>
            {recentPractice.metadata.practiceCount.total}회차 연습 결과
          </span>
          <span className='h1 text-gray-900'>
            {recentPractice.graph.currentScore}
          </span>
        </div>
      </div>

      {/* 우측 상자 */}
      <div className='white-card col-span-3 row-span-2 row-start-2 flex flex-col overflow-hidden'>
        <span className='s1 mb-2 text-gray-700'>태그</span>
        <div className='min-h-0 flex-1 overflow-y-auto pr-1'>
          {tag.map(renderTagItem)}
        </div>
      </div>

      {/* 아래 버튼 상자 */}

      <div className='bg-navy-700 col-span-4 col-start-1 row-span-1 row-start-3 flex flex-col overflow-hidden'>
        <span className='s1 mb-2 text-gray-700'>버튼</span>
      </div>
      <div className='bg-navy-700 col-span-3 col-start-5 row-span-1 row-start-3 flex flex-col overflow-hidden'>
        <span className='s1 mb-2 text-gray-700'>버튼</span>
      </div>
    </div>
  );
};

export default RecentPractice;
