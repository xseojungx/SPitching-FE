import { BookmarkIcon } from 'lucide-react';

type PracticeTagProps = { content: string };

const PracticeTag = ({ content }: PracticeTagProps) => {
  return (
    <div className='flex h-fit w-fit items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-gray-900 shadow-sm'>
      <BookmarkIcon
        className='h-4 w-4 text-rose-500'
        fill='#E1677B'
      />
      <span className='b1'>{content}</span>
    </div>
  );
};

export default PracticeTag;
