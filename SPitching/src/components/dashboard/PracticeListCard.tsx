import { formatDate } from '@/utils/date';
import { SquarePen, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PracticeListCardProps {
  title: string;
  description: string;
  practice_count: number;
  created_at: string;
  last_practice: string;
  firstSlideImageUrl: string;
  totalScore: number;
  updatedAt: string;
  presentationId: number;
}

const PracticeListCard = ({
  title,
  description,
  practice_count,
  created_at,
  last_practice,
  firstSlideImageUrl,
  totalScore,
  updatedAt,
  presentationId,
}: PracticeListCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/full-practice/${presentationId}`);
  };
  return (
    <div className='white-card flex h-auto w-full flex-row gap-4 overflow-clip p-5'>
      {/* 좌측 썸네일 */}
      <div className='flex aspect-video h-full w-40 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-200'>
        {firstSlideImageUrl && (
          <img
            src={firstSlideImageUrl}
            alt='썸네일'
            className='w-full rounded-lg border-1 border-gray-200 object-cover'
          />
        )}
      </div>

      {/* 본문 내용 */}
      <div className='flex flex-1 flex-col justify-between'>
        {/* 상단 제목 + 설명 */}
        <div>
          {/* 제목 */}
          <div className='flex flex-row items-center justify-between'>
            <span className='s1 flex-1 break-all text-gray-900'>{title}</span>
            <span className='c1 text-gray-600'>{formatDate(created_at)}</span>
          </div>

          {/* 설명 */}
          <p className='b2 mt-1 line-clamp-2 text-gray-700'>{description}</p>
        </div>

        {/* 하단 메타 정보 + 버튼 */}
        <div className='mt-4 flex flex-row items-center justify-between'>
          {/* 연습 정보 */}
          <div className='flex flex-wrap items-center gap-3 text-sm text-gray-600'>
            <span>연습 {practice_count}번</span>
            <span>마지막 연습 {formatDate(last_practice)}</span>
            <span>점수 {totalScore}점</span>
          </div>

          {/* 버튼 그룹 */}
          <div className='flex gap-2'>
            <button className='b2 flex items-center gap-1 truncate rounded-md border-1 border-gray-300 px-2 py-1'>
              <SquarePen className='h-4 w-4' />
              <span>대본 편집</span>
            </button>
            <button
              className='bg-navy-700 b2 flex items-center gap-2 truncate rounded-md px-4 py-2 font-semibold text-white transition hover:brightness-110'
              onClick={handleClick}
            >
              <Play className='h-4 w-4' />
              전체 연습
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeListCard;
