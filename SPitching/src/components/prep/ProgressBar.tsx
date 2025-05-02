type ProgressBarProps = { step: number };

const ProgressBar = ({ step }: ProgressBarProps) => {
  return (
    <div className='mb-4 flex items-center space-x-4'>
      <span className='bg-mint-500 flex h-8 w-8 items-center justify-center rounded-full text-gray-900'>
        {step}
      </span>
      <div className='h-1.5 flex-1 rounded bg-gray-200'>
        <div className={`bg-mint-500 h-full w-${step}/3 rounded`} /> {/* 퍼센트에 맞춰 */}
      </div>
      <span className='text-gray-500'>Step {step} of 3</span>
    </div>
  );
};
export default ProgressBar;
