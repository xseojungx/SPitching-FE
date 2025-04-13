import { ArrowLeft } from 'lucide-react';

interface HeaderSectionProps {
  title: string;
  date: string;
}

const HeaderSection = ({ title, date }: HeaderSectionProps) => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className='col-span-10 flex w-full items-center justify-between gap-3'>
      <div className='flex items-baseline gap-3'>
        <span className='h1 text-gray-900'>{title}</span>
        <span className='b2 text-gray-700'>{date}</span>
      </div>

      <button
        onClick={handleBack}
        className='flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50'
      >
        <ArrowLeft size={16} /> 전체 피드백으로 돌아가기
      </button>
    </div>
  );
};

export default HeaderSection;
