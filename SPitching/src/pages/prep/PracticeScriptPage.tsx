import { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePracticeCreation } from '@/contexts/PracticeCreationContext';
import Navbar from '@/components/common/Navbar';
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
    <div className='box-border flex h-screen w-screen flex-col pt-24'>
      <Navbar />

      <article className='relative mx-auto flex w-8/12 max-w-screen-2xl flex-col space-y-8'>
        <h1 className='text-2xl font-bold'>대본 입력</h1>

        <textarea
          value={text}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          rows={10}
          placeholder='발표 대본을 입력하세요'
          className='w-full resize-none rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#A9EAD6]'
        />

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
    </div>
  );
};

export default PracticeScriptPage;
