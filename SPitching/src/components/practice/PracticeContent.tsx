import MockPPT from '@/assets/mock_ppt_1.png';
import PracticeTag from './PracticeTag';

const PracticeContent = () => {
  return (
    <section className='flex flex-3/10 flex-col overflow-hidden p-2'>
      <div className='shadow-shadow-200 flex shrink-0 flex-col justify-center rounded-md shadow-xl'>
        <img
          src={MockPPT}
          alt='PPT'
          className='h-full w-full rounded-md object-cover'
        />
      </div>
      <div className='mt-8 flex max-h-full w-full flex-wrap gap-2.5 overflow-y-auto pb-4'>
        <PracticeTag content={'시작하기 전에 인사하기'} />
        <PracticeTag content={'바른 자세 유지하기'} />
        <PracticeTag content={'발음 또박또박! 말 꼬이지 않게!!'} />
        <PracticeTag content={'설명 제스처'} /> <PracticeTag content={'바른 자세'} />
        <PracticeTag content={'팔짱'} /> <PracticeTag content={'팔 들어올리기'} />
        <PracticeTag content={'얼굴 만지기'} />
      </div>
    </section>
  );
};
export default PracticeContent;
