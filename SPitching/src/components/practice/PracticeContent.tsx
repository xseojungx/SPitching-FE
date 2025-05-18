import PracticeTag from './PracticeTag';
import { UploadSlidesResponse } from '@/types/presentation.types';
import { useGetTagFromSlide } from '@/hooks/usePractice';

const PracticeContent = ({
  slideList,
  currentIndex,
}: {
  slideList: UploadSlidesResponse;
  currentIndex: number;
}) => {
  console.log(slideList);
  const { data: tagList } = useGetTagFromSlide(slideList[currentIndex].id) || [];

  console.log(tagList);
  return (
    <section className='flex flex-3/10 flex-col overflow-hidden p-2'>
      <div className='shadow-shadow-200 flex shrink-0 flex-col justify-center rounded-md shadow-xl'>
        <img
          src={slideList[currentIndex].imageUrl}
          alt='PPT'
          className='h-full w-full rounded-md object-cover'
        />
      </div>
      <div className='mt-8 flex max-h-full w-full flex-wrap gap-2.5 overflow-y-auto pb-4'>
        {tagList?.map((tag, index) => (
          <PracticeTag
            key={index}
            content={tag.content}
          />
        ))}
      </div>
    </section>
  );
};
export default PracticeContent;
