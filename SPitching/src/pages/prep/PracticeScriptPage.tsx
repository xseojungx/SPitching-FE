import { useState, ChangeEvent, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePracticeCreation } from '@/contexts/PracticeCreationContext';
import Navbar from '@/components/common/Navbar';
import ScriptEditor from '@/components/prep/SingleScriptEditor';

const PracticeScriptPage = () => {
  const navigate = useNavigate();
  const { presentationId, setScript, slides, tagList } = usePracticeCreation();
  const [isSubmitting, setSubmitting] = useState(false);
  console.log('slides', slides);
  console.log('tagList', tagList);

  // useEffect(() => {
  //   if (!practiceId) {
  // useEffect(() => {
  //   if (!practiceId) {
  //     // Direct 진입 방지
  //     navigate('/practices/new/details');
  //   }
  // }, [practiceId]);

  const handleSubmit = async () => {
    if (!presentationId) return;
    setSubmitting(true);
    // try {
    //   // 백엔드에 대본 저장 요청
    //   await fetch(`/api/v1/practices/${practiceId}/script`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ script: text }),
    //   });
    //   setScript(text);
    //   navigate(`/practices/${practiceId}/edit`);
    // } catch (e) {
    //   console.error(e);
    //   alert('대본 저장에 실패했습니다.');
    // } finally {
    //   setSubmitting(false);
    // }
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
            disabled={isSubmitting}
            className='h-12 rounded-xl bg-[#255A9B] px-6 font-semibold text-gray-500 text-white shadow-md transition hover:brightness-110'
          >
            다음
          </button>
        </div>
      </article>
      <div className="fixed top-0 left-0 -z-2 h-screen w-screen bg-[url('/assets/dashboard_bg.svg')] bg-left-top bg-no-repeat opacity-90 not-first:bg-cover"></div>
    </div>
  );
};

export default PracticeScriptPage;
