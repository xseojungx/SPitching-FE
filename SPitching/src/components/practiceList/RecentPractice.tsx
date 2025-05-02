import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { recentPractice } from './mockdata';
import ScoreLineChart from '../dashboard/ScoreLineChart';
import ScorePieChart from '../common/ScorePieChart';

import EyeIcon from '../../assets/eye.svg?react';
import GestureIcon from '../../assets/gesture.svg?react';
import SimilarityIcon from '../../assets/sim.svg?react';
import MockPPT from '../../assets/mock_ppt.png';
import FluencyIcon from '../../assets/fluency.svg?react';

import { prevPracticeData } from '@/assets/mockData';
import { formatDate } from '@/utils/date';

type TagType = { page: number; count: number; notes: string[] };

interface PracticeListCardProps {
  title: string;
  description: string;
  practice_count: number;
  last_practice: string;
  created_at: string;
}

const RecentPractice = ({
  title,
  description,
  practice_count,
  last_practice,
  created_at,
}: PracticeListCardProps) => {
  const navigate = useNavigate();
  const data = prevPracticeData;

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
    <div className='max-h-600px mx-auto grid h-3/4 w-10/12 max-w-screen-xl grid-cols-10 grid-rows-[auto_1fr_auto] gap-4 px-4 py-6'>
      {/* 상단 제목 */}
      <div className='col-span-10 row-start-1 flex flex-col'>
        <span className='c2 text-gray-700'>최근 연습</span>
        <div className='flex items-baseline gap-2'>
          <span className='h2 text-gray-900'>{title}</span>
          <span className='b2 text-gray-700'>{description}</span>
          <span className='b2 text-gray-700'>{formatDate(created_at)}</span>
        </div>
      </div>

      {/* 좌측 요약 상자 */}
      <div className='white-card col-span-3 row-start-2 gap-1'>
        <div className='mb-3 aspect-[16/9] w-full overflow-hidden'>
          {/* 확대 삭제하기 */}
          <img
            src={MockPPT}
            alt='최근 연습 썸네일'
            className='w-full scale-120 object-cover'
          />
        </div>
        <div className='flex flex-row items-center gap-2'>
          <span className='s2 text-gray-900'>최근 연습</span>
          <span className='b2 text-gray-700'>{formatDate(last_practice)}</span>
        </div>
        <div className='flex flex-row items-center gap-3 text-xs'>
          <span className='s2 text-gray-900'>연습 횟수</span>
          <span className='b2 text-gray-700'>{practice_count}</span>
        </div>
      </div>

      {/* 중앙 요약 상자 */}
      <div className='white-card relative col-span-4 row-start-2'>
        <div className='absolute m-4 flex flex-col'>
          <span className='c2 text-gray-700'>
            {recentPractice.metadata.practiceCount.total}회차 연습 결과
          </span>
          <span className='h1 text-gray-900'>72점</span>
        </div>
        <div className='box-border w-full flex-3 pt-2'>
          <ScoreLineChart data={data} />
        </div>
        <div className='flex h-12 w-full flex-2'>
          <div className='relative flex-1'>
            <ScorePieChart value={data[data.length - 1].eye} />
            <EyeIcon className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
          </div>
          <div className='relative flex-1'>
            <ScorePieChart value={data[data.length - 1].ges} />
            <GestureIcon className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
          </div>
          <div className='relative flex-1'>
            <ScorePieChart value={data[data.length - 1].sim} />
            <SimilarityIcon className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
          </div>
          <div className='relative flex-1'>
            <ScorePieChart value={data[data.length - 1].fluen} />
            <FluencyIcon className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
          </div>
        </div>
      </div>

      {/* 우측 상자 */}
      <div className='white-card col-span-3 row-span-2 row-start-2 flex flex-col overflow-hidden'>
        <span className='s1 mb-2 text-gray-700'>태그</span>
        <div className='min-h-0 flex-1 overflow-y-auto pr-1'>{tag.map(renderTagItem)}</div>
        <div className='mt-4 space-y-2'>
          <button className='w-full rounded-md border border-gray-300 py-2 text-sm text-gray-700 transition hover:bg-gray-50'>
            ✏️ 대본 수정하기
          </button>
          <button className='w-full rounded-md border border-gray-300 py-2 text-sm text-gray-700 transition hover:bg-gray-50'>
            🏷️ 태그 수정하기
          </button>
        </div>
      </div>

      {/* 아래 버튼 상자 */}

      {/* 왼쪽: 전체 연습 */}
      <div className='col-span-7 col-start-1 row-span-1 row-start-3 flex flex-col'>
        <div className='flex w-full justify-between gap-3'>
          {/* 전체 연습 */}
          <button
            onClick={() => navigate('/practice')}
            className='flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4C9ACF] to-[#A9EAD6] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:cursor-pointer hover:brightness-105'
          >
            <span className='text-lg'>▶</span>
            전체 연습 시작하기
          </button>

          {/* 부분 연습 */}
          <button className='flex items-center justify-center gap-1 rounded-xl border border-[#C2E59C] bg-white px-5 py-2.5 text-sm text-[#5A5F5C] transition hover:bg-[#f8faf5]'>
            ✂️ 부분 연습
          </button>

          {/* 피드백 보기 */}
          <button className='flex items-center justify-center gap-1 rounded-xl border border-[#DADADA] bg-white px-5 py-2.5 text-sm text-[#5A5F5C] transition hover:bg-[#f1f1f1]'>
            📄 피드백 보기
          </button>
        </div>
      </div>

      {/* 오른쪽: 부분 연습 + 피드백 리포트 (가로 배치, 미니멀) */}
      {/* <div className='col-span-3 col-start-5 row-span-1 row-start-3 flex flex-row items-center justify-between gap-2 overflow-hidden'>
        <button className='flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-800 transition hover:bg-gray-100'>
          ✂️ 부분 연습
        </button>
        <button className='flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-800 transition hover:bg-gray-100'>
          📄 피드백 보기
        </button>
      </div> */}
    </div>
  );
};

export default RecentPractice;
