import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUploader from '@/components/prep/FileUploader';
import { usePracticeCreation } from '@/contexts/PracticeCreationContext';
import Navbar from '@/components/common/Navbar';
import ProgressBar from '@/components/prep/ProgressBar';
import { ChevronsRightIcon } from 'lucide-react';
import { useUploadPresentation } from '@/hooks/usePrep';

const PracticeFilePage = () => {
  const navigate = useNavigate();
  const { setFile } = usePracticeCreation();
  const { presentationId } = usePracticeCreation();

  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const isValid = fileUpload !== null;
  console.log('presentationId', presentationId);

  const { mutate: uploadFile, isPending } = useUploadPresentation();

  useEffect(() => {
    console.log(fileUpload);
  }, [fileUpload]);

  const handleSubmit = async () => {
    console.log(isValid);
    if (!isValid || !fileUpload) return;
    setSubmitting(true);

    uploadFile({ presentationId: presentationId!, file: fileUpload });
  };
  if (isPending) {
    return <div>대기중</div>;
  }
  return (
    <div className='box-border flex h-screen w-screen flex-col justify-center py-24'>
      <Navbar />

      <article className='shadow-shadow-100 relative mx-auto flex w-8/12 max-w-screen-2xl flex-col space-y-8 rounded-2xl border border-white/30 bg-white/70 p-15 shadow-xl backdrop-blur-md backdrop-saturate-150'>
        <ProgressBar step={2} />
        <h1 className='h1 mt-4 text-gray-900'>파일 업로드 하기</h1>

        <div className='flex flex-col space-y-3'>
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
            className={`b1 flex h-12 w-40 justify-center gap-1 rounded-xl px-6 py-3 text-base font-semibold text-white shadow-sm transition ${
              isValid
                ? 'bg-gradient-to-r from-[#4C9ACF] to-[#A9EAD6] hover:cursor-pointer hover:brightness-110'
                : 'cursor-not-allowed bg-gray-300 text-gray-500'
            }`}
          >
            다음 <ChevronsRightIcon />
          </button>
        </div>
      </article>
      <div className="fixed left-0 -z-1 h-screen w-screen bg-[url('/assets/dashboard_bg.svg')] bg-left-top bg-no-repeat opacity-90 not-first:bg-cover"></div>
    </div>
  );
};

export default PracticeFilePage;
