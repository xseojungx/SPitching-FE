import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePracticeCreation } from '@/contexts/PracticeCreationContext';
import Navbar from '@/components/common/Navbar';
import ProgressBar from '@/components/prep/ProgressBar';
import { ChevronsRightIcon } from 'lucide-react';
const PracticeDetailsPage = () => {
  const navigate = useNavigate();
  const { setDetails, setPracticeId } = usePracticeCreation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const isValid = title.trim() !== '' && description.trim() !== '' && duration.trim() !== '';

  const handleSubmit = async () => {
    if (!isValid) return;
    setSubmitting(true);

    // 백엔드에 FormData로 전송
    const form = new FormData();
    form.append('title', title);
    form.append('description', description);
    form.append('duration', duration);

    // try {
    //   const res = await fetch('/api/v1/practices', { method: 'POST', body: form });
    //   if (!res.ok) throw new Error(res.statusText);
    //   const data = await res.json();
    //   // practiceId 리턴 받음
    //   setPracticeId(data.id);
    //   setDetails({ title, description, duration });
    //   navigate('/practices/new/script');
    // } catch (e) {
    //   console.error(e);
    //   alert('연습 생성에 실패했습니다.');
    // } finally {
    //   setSubmitting(false);
    // }

    setDetails({ title, description, duration });
    navigate('/practices/new/file');
  };

  return (
    <div className='box-border flex h-screen w-screen flex-col justify-center py-24'>
      <Navbar />

      <article className='shadow-shadow-100 relative mx-auto flex w-8/12 max-w-screen-2xl flex-col space-y-8 rounded-2xl border border-white/30 bg-white/70 p-15 shadow-xl backdrop-blur-md backdrop-saturate-150'>
        <ProgressBar step={1} />
        <h1 className='h1 mt-4 text-gray-900'>새 연습 시작하기</h1>

        <div className='flex flex-col space-y-2'>
          <label className='s1 text-gray-900'>제목</label>
          <input
            type='text'
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            className='focus:ring-navy-700 w-full rounded-lg border border-gray-400 bg-gray-50 px-4 py-3 placeholder-gray-400 transition focus:bg-white focus:ring-1 focus:outline-none'
          />
        </div>

        <div className='flex flex-col space-y-2'>
          <label className='s1 text-gray-900'>설명</label>
          <input
            type='text'
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
            className='focus:ring-navy-700 w-full rounded-lg border border-gray-400 bg-gray-50 px-4 py-3 placeholder-gray-400 transition focus:bg-white focus:ring-1 focus:outline-none'
          />
        </div>

        <div className='flex flex-col space-y-2'>
          <label className='s1 text-gray-900'>목표 시간</label>
          <div className='flex items-center'>
            <input
              type='text'
              value={duration}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  setDuration(e.target.value);
                }
              }}
              className='focus:ring-navy-700 w-24 rounded-l-xl border border-gray-400 px-4 py-3 focus:ring-1'
            />
            <span className='inline-block rounded-r-xl border border-l-0 border-gray-400 bg-gray-50 px-4 py-3'>
              분
            </span>
          </div>
        </div>

        <div className='flex justify-end'>
          <button
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className={`b1 flex h-12 w-40 justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold text-white shadow-sm transition ${
              isValid
                ? 'bg-gradient-to-r from-[#4C9ACF] to-[#A9EAD6] hover:cursor-pointer hover:brightness-110'
                : 'cursor-not-allowed bg-gray-300 text-gray-500'
            }`}
          >
            다음
            <ChevronsRightIcon />
          </button>
        </div>
      </article>
      <div className="fixed left-0 -z-1 h-screen w-screen bg-[url('/assets/dashboard_bg.svg')] bg-left-top bg-no-repeat opacity-90 not-first:bg-cover"></div>
    </div>
  );
};

export default PracticeDetailsPage;
