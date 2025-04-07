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
          <span className='text-sm text-blue-500'>{isOpen ? '▼' : '▶'}</span>
          <span className='text-sm text-gray-700'>{data.page} 페이지</span>
          <div className='text-cream-50 flex h-3 w-3 items-center justify-center rounded-full bg-rose-500 text-[0.625rem] font-normal'>
            {data.count}
          </div>
        </div>

        {isOpen && data.notes.length > 0 && (
          <ul className='mt-2 list-disc pl-6 text-xs font-normal text-blue-500'>
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
    <div className='grid grid-cols-10 grid-rows-[auto_240px_64px] gap-2'>
      <div className='col-span-10 row-start-1 flex flex-col'>
        <span className='text-sm font-normal text-gray-700'>최근 연습</span>
        <div className='flex items-baseline gap-2'>
          <span className='text-[21px] font-bold text-gray-700'>
            {recentPractice.title}
          </span>
          <span className='text-sm font-normal text-gray-700'>
            {recentPractice.description}
          </span>
          <span className='text-sm font-normal text-gray-700'>
            {recentPractice.created}
          </span>
        </div>
      </div>

      <div className='col-span-3 row-start-2 flex h-full w-full flex-col gap-2 rounded-xl border border-slate-200 bg-[rgba(255,255,255,0.7)] p-3 shadow-[0px_0px_15px_1px_var(--color-shadow-100)]'>
        <div className='aspect-[16/9] w-full bg-black' />
        <div className='flex flex-row items-center gap-2 text-xs'>
          <span className='font-normal text-gray-700'>최근 연습</span>
          <span className='font-light text-gray-700'>
            {recentPractice.metadata.lastPractice}
          </span>
        </div>
        <div className='flex flex-row items-center gap-2 text-xs'>
          <span className='font-normal text-gray-700'>연습 횟수</span>
          <span className='font-light text-gray-700'>
            {recentPractice.metadata.practiceCount.total}
          </span>
        </div>
      </div>

      <div className='relative col-span-4 row-start-2 flex h-full w-full flex-col rounded-xl border border-slate-200 bg-[rgba(255,255,255,0.7)] p-3 shadow-[0px_0px_15px_1px_var(--color-shadow-100)]'>
        <div className='absolute m-4 flex flex-col'>
          <span className='text-xs font-light text-gray-700'>
            {recentPractice.metadata.practiceCount.total}회차 연습 결과
          </span>
          <span className='text-xl font-bold text-gray-700'>
            {recentPractice.graph.currentScore}
          </span>
        </div>
      </div>

      <div className='col-span-3 row-span-2 row-start-2 flex h-full w-full flex-col rounded-xl border border-slate-200 bg-[rgba(255,255,255,0.7)] p-3 shadow-[0px_0px_15px_1px_var(--color-shadow-100)]'>
        <span className='mb-2 text-base font-bold text-gray-700'>태그</span>
        <div className='flex flex-col'>{tag.map(renderTagItem)}</div>
      </div>
    </div>
  );
};

export default RecentPractice;
