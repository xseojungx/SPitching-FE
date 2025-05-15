import { useDeleteTag } from '@/hooks/usePrep';
import type { SingleTag } from '@/types/presentation.types';
import { X } from 'lucide-react';
interface SingleTagProps {
  tag: SingleTag;
}

const SingleTag = ({ tag }: SingleTagProps) => {
  const { mutate: removeTagMutation } = useDeleteTag();
  return (
    <div className='b1 relative flex items-center justify-center gap-2 rounded-full py-1 pr-1 pl-4 text-white'>
      <span className='from-coral-400 absolute inset-0 rounded-full bg-gradient-to-br to-rose-500 p-[2px]'>
        <span className='block h-full w-full rounded-full bg-white' />
      </span>
      <span className='z-10 text-rose-500'>{tag.content}</span>
      <button
        className='z-10'
        onClick={() => removeTagMutation({ tagId: tag.tagId })}
      >
        <X className='h-5 text-gray-500' />
      </button>
    </div>
  );
};
export default SingleTag;
