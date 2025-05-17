import { usePracticeCreation } from '@/contexts/PracticeCreationContext';
import Navbar from '@/components/common/Navbar';
import ScriptEditor from '@/components/prep/SingleScriptEditor';
import { usePutScript, usePutSingleScript } from '@/hooks/usePrep';
import { Script } from '@/types/presentation.types';

const EditScriptPage = () => {
  const { presentationId, setScript, slides, tagList } = usePracticeCreation();
  console.log('slides', slides);
  console.log('tagList', tagList);

  const { mutate: putSingleScriptMutation } = usePutSingleScript();
  const handleSubmit = () => {
    if (!presentationId) return;

    slides.forEach((slide) => {
      putSingleScriptMutation({
        script: slide.script,
        slideNumber: slide.slideNumber,
        presentationId: presentationId,
      });
    });
  };

  return (
    <div className='box-border flex h-screen w-screen flex-col overflow-scroll py-24'>
      <Navbar />
      <article className='relative mx-auto flex w-10/12 max-w-screen-2xl flex-col space-y-8'>
        <h1 className='text-2xl font-bold'>대본 입력</h1>

        <div className='relative box-border flex w-full flex-col divide-y-1 divide-gray-500 bg-white/50 py-4'>
          <div className='absolute top-0 right-0 -z-1 h-full w-8/10 bg-white/70' />
          {slides.map((slide) => (
            <ScriptEditor
              key={slide.id}
              slideId={slide.id}
              script={slide.script}
              setSlides={setScript}
              imageUrl={slide.imageUrl}
              slideNumber={slide.slideNumber}
            />
          ))}
        </div>

        <div className='flex justify-end'>
          <button
            onClick={handleSubmit}
            className='h-12 rounded-xl bg-[#255A9B] px-6 font-semibold text-gray-500 text-white shadow-md transition hover:brightness-110'
          >
            제출하기
          </button>
        </div>
      </article>
      <div className="fixed top-0 left-0 -z-2 h-screen w-screen bg-[url('/assets/dashboard_bg.svg')] bg-left-top bg-no-repeat opacity-90 not-first:bg-cover"></div>
    </div>
  );
};

export default EditScriptPage;
