import { useNavigate } from 'react-router-dom';
import DashboardScoreLineChart from '../dashboard/ScoreLineChart';
import ScorePieChart from '../common/ScorePieChart';
import TagList from './TagList';
import EyeIcon from '../../assets/eye.svg?react';
import GestureIcon from '../../assets/gesture.svg?react';
import SimilarityIcon from '../../assets/sim.svg?react';
import FluencyIcon from '../../assets/fluency.svg?react';
import { SquarePen, Play } from 'lucide-react';
import { prevPracticeData } from '@/assets/mockData';
import { formatDateWithTime } from '@/utils/date';

import { RecentPractice as RecentPracticeProps } from '@/types/presentation.types';

const RecentPractice = ({
  practiceId,
  presentationId,
  title,
  description,
  practiceCount,
  lastPractice,
  created,
  firstSlideImageUrl,
  tags,
  graph,
}: RecentPracticeProps) => {
  const navigate = useNavigate();

  const prevPracticeData = [
    { name: 1, score: graph.currentScore },
    ...graph.previousScores.map((data, key) => {
      return { name: key + 2, score: data };
    }),
  ].reverse();

  return (
    <div className='mx-auto grid h-3/4 max-h-[600px] min-h-fit w-10/12 max-w-screen-2xl grid-cols-10 grid-rows-[auto_1fr_auto] gap-4 px-4 py-6'>
      {/* 상단 제목 */}
      <div className='col-span-10 row-start-1 flex flex-col'>
        <span className='c1 text-gray-700'>최근 연습</span>
        <div className='flex items-baseline gap-2'>
          <span className='h2 text-gray-900'>{title}</span>
          <span className='b1 text-gray-700'>{description}</span>
          <span className='b1 text-gray-700'>{formatDateWithTime(created)}</span>
        </div>
      </div>

      {/* 좌측 요약 상자 */}
      <div className='white-card col-span-3 row-start-2 gap-1'>
        <div className='mb-4 aspect-4/3 w-full flex-shrink-0 overflow-hidden rounded-lg border-1 border-gray-200 bg-gray-200 shadow-xl shadow-gray-400/20'>
          {firstSlideImageUrl && (
            <img
              src={firstSlideImageUrl}
              alt='썸네일'
              className='w-full object-cover'
            />
          )}
        </div>
        {lastPractice && (
          <div className='mt-2 flex flex-row items-center gap-2'>
            <span className='b1 truncate font-semibold text-gray-900'>최근 연습</span>
            <span className='b1 truncate text-gray-700'>{formatDateWithTime(lastPractice)}</span>
          </div>
        )}
        <div className='mb-2 flex flex-row items-center gap-3 text-xs'>
          <span className='b1 font-semibold text-gray-900'>연습 횟수</span>
          <span className='b1 text-gray-700'>{practiceCount}</span>
        </div>
      </div>

      {/* 중앙 요약 상자 */}
      <div className='white-card relative col-span-4 row-start-2 justify-between'>
        {graph ? (
          <div className='absolute z-2 m-4 flex flex-col rounded-xl bg-white/10 p-4 shadow-lg backdrop-blur-sm'>
            <span className='b1 text-gray-700'>{practiceCount}회차 연습 결과</span>
            <span className='h1 text-gray-900'>{Math.round(graph.currentScore)}점</span>
          </div>
        ) : (
          <div className='absolute top-0 left-0 z-1 flex h-full w-full flex-col items-center justify-center rounded-2xl bg-gray-600/40 backdrop-blur-xs'>
            <span className='s1 text-gray-900'>첫 연습을 시작해보세요!</span>
          </div>
        )}

        <div className='box-border w-full flex-3 pt-2'>
          <DashboardScoreLineChart data={prevPracticeData} />
        </div>
        <div className='flex h-12 w-full flex-2'>
          <div className='relative flex-1'>
            <ScorePieChart value={graph?.eyeScore || 0} />
            <EyeIcon className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
          </div>
          <div className='relative flex-1'>
            <ScorePieChart value={graph?.gestureScore || 0} />
            <GestureIcon className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
          </div>
          <div className='relative flex-1'>
            <ScorePieChart value={graph?.cosineSimilarity || 0} />
            <SimilarityIcon className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
          </div>
          <div className='relative flex-1'>
            <ScorePieChart value={graph?.sttScore || 0} />
            <FluencyIcon className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
          </div>
        </div>
      </div>

      {/* 우측 상자 */}
      <div className='white-card col-span-3 row-span-2 row-start-2 flex flex-col overflow-hidden px-2'>
        <span className='s1 mb-2 px-3 text-black'>태그</span>
        <div className='scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 min-h-0 w-full flex-1 overflow-y-auto'>
          <TagList tags={tags} />
        </div>
        <div className='mt-4 flex w-full items-center justify-center px-4'>
          <button className='b1 bg-navy-700 flex flex-1 cursor-pointer items-center justify-center rounded-md border border-gray-300 py-2 font-semibold text-white transition hover:brightness-120'>
            <SquarePen className='mr-2 h-4 w-4' />
            대본 / 태그 수정하기
          </button>
        </div>
      </div>

      {/* 아래 버튼 상자 */}

      {/* 왼쪽: 전체 연습 */}
      <div className='col-span-7 col-start-1 row-span-1 row-start-3 flex flex-col'>
        <div className='flex w-full justify-between gap-3'>
          {/* 전체 연습 */}
          <button
            onClick={() => navigate(`/full-practice/${presentationId}`)}
            className='s2 flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4C9ACF] to-[#A9EAD6] px-6 py-3 text-white shadow-sm transition hover:cursor-pointer hover:brightness-105'
          >
            <Play className='h-4 w-4 fill-white stroke-4' />
            전체 연습 시작하기
          </button>

          {/* 부분 연습 */}
          <button className='flex cursor-not-allowed items-center justify-center gap-1 rounded-xl border border-[#C2E59C] bg-white px-5 py-2.5 text-sm text-[#5A5F5C] transition hover:bg-[#f8faf5]'>
            ✂️ 부분 연습
          </button>

          {/* 피드백 보기 */}
          {lastPractice && (
            <button
              className='flex items-center justify-center gap-1 rounded-xl border border-[#DADADA] bg-white px-5 py-2.5 text-sm text-[#5A5F5C] transition hover:bg-[#f1f1f1]'
              onClick={() => navigate(`/feedback/${practiceId}/summary`)}
            >
              📄 피드백 보기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentPractice;
