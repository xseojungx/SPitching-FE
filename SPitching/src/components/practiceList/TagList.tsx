import { useState } from 'react';
import type { TagListProps } from '@/types/presentation.types';

const TagList = ({ tags }: TagListProps) => {
  const [openPages, setOpenPages] = useState<number[]>([]);

  const togglePage = (page: number) => {
    setOpenPages((prev) =>
      prev.includes(page) ? prev.filter((p) => p !== page) : [...prev, page],
    );
  };

  return (
    <div className='space-y-1'>
      {tags.map((tag) => {
        const isOpen = openPages.includes(tag.page);

        return (
          <div
            key={tag.page}
            className='rounded-lg hover:bg-white/50'
          >
            {/* 헤더: 접기/펼치기 토글 */}
            <button
              onClick={() => togglePage(tag.page)}
              className='flex w-full items-center justify-between px-1 focus:ring-0 focus:outline-none'
            >
              <div className='flex cursor-pointer items-center gap-2'>
                <span className='text-blue-500'>{isOpen ? '▼' : '▶'}</span>
                <span className='b1 text-gray-900'>페이지 {tag.page}</span>
              </div>
              <span className='flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[0.625rem] font-normal text-white'>
                {tag.count}
              </span>
            </button>

            {/* 내용: notes 리스트 + 이동 버튼 */}
            {isOpen && tag.notes.length > 0 && (
              <div className='mt-2 ml-6'>
                <ul className='list-inside list-disc space-y-1 text-gray-700'>
                  {tag.notes.map((note, idx) => (
                    <li
                      key={idx}
                      className='b2'
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TagList;
