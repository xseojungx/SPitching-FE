import { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePracticeCreation } from '@/contexts/PracticeCreationContext';
import Navbar from '@/components/common/Navbar';
import ScriptEditor from '@/components/prep/SingleScriptEditor';
const PracticeScriptPage = () => {
  const navigate = useNavigate();
  const { practiceId, script, setScript } = usePracticeCreation();
  const [text, setText] = useState(script);
  const [isSubmitting, setSubmitting] = useState(false);

  // useEffect(() => {
  //   if (!practiceId) {
  //     // Direct 진입 방지
  //     navigate('/practices/new/details');
  //   }
  // }, [practiceId]);

  const handleSubmit = async () => {
    if (!practiceId) return;
    setSubmitting(true);
    try {
      // 백엔드에 대본 저장 요청
      await fetch(`/api/v1/practices/${practiceId}/script`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script: text }),
      });
      setScript(text);
      navigate(`/practices/${practiceId}/edit`);
    } catch (e) {
      console.error(e);
      alert('대본 저장에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const isValid = text.trim() !== '';

  return (
    <div className='box-border flex h-screen w-screen flex-col overflow-scroll py-24'>
      <Navbar />
      <article className='relative mx-auto flex w-10/12 max-w-screen-2xl flex-col space-y-8'>
        <h1 className='text-2xl font-bold'>대본 입력</h1>

        {/* <textarea
          value={text}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          rows={10}
          placeholder='발표 대본을 입력하세요'
          className='w-full resize-none rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#A9EAD6]'
        /> */}
        <div className='relative box-border flex w-full flex-col divide-y-1 divide-gray-500 bg-white/50 py-4'>
          <div className='absolute top-0 right-0 -z-1 h-full w-8/10 bg-white/70' />
          <ScriptEditor />
          <ScriptEditor />
          <ScriptEditor />
          <ScriptEditor />
          <ScriptEditor />
        </div>

        <div className='flex justify-end'>
          <button
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className={`$ (isValid ? 'bg-[#255A9B] hover:brightness-110' : 'bg-gray-300 cursor-not-allowed') h-12 rounded-xl px-6 font-semibold text-gray-500 text-white shadow-md transition`}
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
