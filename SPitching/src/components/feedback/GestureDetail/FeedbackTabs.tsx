import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface FeedbackTabsProps {
  positiveFeedback: string[];
  negativeFeedback: string[];
}

const FeedbackTabs = ({
  positiveFeedback,
  negativeFeedback,
}: FeedbackTabsProps) => {
  const [activeTab, setActiveTab] = useState<'positive' | 'negative'>(
    'positive',
  );

  const feedbackList =
    activeTab === 'positive' ? positiveFeedback : negativeFeedback;

  return (
    <div className='white-card col-span-7 col-start-5 row-span-3 row-start-7 flex flex-col gap-4'>
      <div className='flex gap-3'>
        <button
          className={`s2 flex items-center gap-2 rounded-full px-4 py-1.5 transition ${
            activeTab === 'positive'
              ? 'bg-avocado-400 text-gray-900'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('positive')}
        >
          <CheckCircle className='h-4 w-4' />
          잘한 점
        </button>
        <button
          className={`s2 rounded-full px-4 py-1.5 transition ${
            activeTab === 'negative'
              ? 'bg-rose-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('negative')}
        >
          ⚠️ 개선이 필요한 점
        </button>
      </div>

      <ul className='b1 list-disc space-y-1 pl-6 text-gray-900'>
        {feedbackList.length > 0 ? (
          feedbackList.map((line, index) => <li key={index}>{line}</li>)
        ) : (
          <li>피드백이 없습니다.</li>
        )}
      </ul>
    </div>
  );
};

export default FeedbackTabs;
