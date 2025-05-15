import { usePracticeCreation } from '@/contexts/PracticeCreationContext';

interface SingleTagProps {
  slideId: number;
  tag: string;
}

const SingleTag = ({ slideId, tag }: SingleTagProps) => {
  const { removeTag } = usePracticeCreation();
  console.log('tag', tag);
  return (
    <div className='b1 relative inline-flex items-center justify-center rounded-full px-4 py-1 text-white'>
      <span className='from-coral-400 absolute inset-0 rounded-full bg-gradient-to-br to-rose-500 p-[2px]'>
        <span className='block h-full w-full rounded-full bg-white' />
      </span>
      <span className='z-10 text-rose-500'>태그</span>
    </div>
  );
};
export default SingleTag;
