import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUploader from '@/components/prep/FileUploader';
import { usePracticeCreation } from '@/contexts/PracticeCreationContext';
import Navbar from '@/components/common/Navbar';
import ProgressBar from '@/components/prep/ProgressBar';

const PracticeFilePage = () => {
  const navigate = useNavigate();
  const { setFile } = usePracticeCreation();

  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const isValid = fileUpload !== null;

  const handleSubmit = async () => {
    if (!isValid || !fileUpload) return;
    setSubmitting(true);

    // 백엔드에 FormData로 전송
    const form = new FormData();

    form.append('file', fileUpload);

    // try {
    //   const res = await fetch('/api/v1/practices', { method: 'POST', body: form });
    //   if (!res.ok) throw new Error(res.statusText);
    //   const data = await res.json();
    //   // practiceId 리턴 받음
    //   //   setPracticeId(data.id);
    setFile(fileUpload);
    //   navigate('/practices/new/script');
    // } catch (e) {
    //   console.error(e);
    //   alert('연습 생성에 실패했습니다.');
    // } finally {
    //   setSubmitting(false);
    // }
    navigate('/practices/new/script');
  };

  return (
    <div className='box-border flex h-screen w-screen flex-col pt-24'>
      <Navbar />

      <article className='relative mx-auto flex w-8/12 max-w-screen-2xl flex-col space-y-6 rounded-2xl bg-white p-8 shadow-lg'>
        <ProgressBar step={2} />
        <h1 className='text-2xl font-bold'>새 연습 시작하기</h1>

        <div className='flex flex-col space-y-2'>
          <label className='s1 text-gray-900'>발표 슬라이드 추가</label>
          <FileUploader
            file={fileUpload}
            onFileSelect={setFileUpload}
          />
        </div>

        <div className='flex justify-end'>
          <button
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className={`h-12 rounded-xl px-6 font-semibold text-white shadow-md transition ${
              isValid
                ? 'bg-[#255A9B] hover:brightness-110'
                : 'cursor-not-allowed bg-gray-300 text-gray-500'
            }`}
          >
            다음
          </button>
        </div>
      </article>
    </div>
  );
};

export default PracticeFilePage;
