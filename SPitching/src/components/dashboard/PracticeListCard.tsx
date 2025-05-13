import { formatDate } from '@/utils/date';

interface PracticeListCardProps {
  title: string;
  description: string;
  practice_count: number;
  created_at: string;
  last_practice: string;
}

const PracticeListCard = ({
  title,
  description,
  practice_count,
  created_at,
  last_practice,
}: PracticeListCardProps) => {
  return (
    <div className='white-card flex h-auto w-full flex-row gap-4 p-5'>
      {/* 썸네일 */}
      <div className='aspect-video w-40 flex-shrink-0 rounded-lg bg-gray-200' />

      {/* 본문 내용 */}
      <div className='flex flex-1 flex-col justify-between'>
        <div>
          {/* 제목 */}
          <div className='flex flex-row items-center justify-between'>
            <span className='s1 truncate text-gray-900'>{title}</span>
            <span className='c2 text-gray-600'>{formatDate(created_at)}</span>
          </div>

          {/* 설명 */}
          <p className='b2 mt-1 line-clamp-2 text-gray-700'>{description}</p>
        </div>

        {/* 하단 메타 정보 + 버튼 */}
        <div className='mt-4 flex flex-row items-center justify-between'>
          {/* 연습 정보 */}
          <div className='flex flex-wrap items-center gap-3 text-sm text-gray-600'>
            <span>전체 연습 {practice_count}번</span>
            <span>마지막 연습 {formatDate(last_practice)}</span>
            <span>점수 72점</span>
            <span className='flex items-center gap-1'>
              ✏️ <span>대본 편집</span>
            </span>
          </div>

          {/* 버튼 그룹 */}
          <div className='flex gap-2'>
            <button className='bg-navy-700 rounded-md px-4 py-2 text-sm font-medium text-white transition hover:brightness-110'>
              전체 연습
            </button>
            <button className='rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50'>
              부분 연습
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeListCard;
