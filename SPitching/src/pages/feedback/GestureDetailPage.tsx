import Navbar from '@/components/common/Navbar';
import HeaderSection from '@/components/feedback/GestureDetail/HeaderSection';
import ScoreSummaryCard from '@/components/feedback/GestureDetail/ScoreSummaryCard';
import GestureVideo from '@/components/feedback/GestureDetail/GestureVideo';
import FeedbackTabs from '@/components/feedback/GestureDetail/FeedbackTabs';
import { getGestureFeedbackMessage } from '@/utils/getGestureFeedback';

const GestureDetailPage = () => {
  const { positiveFeedback, negativeFeedback } = getGestureFeedbackMessage({
    gestureScore: 89,
    crossedScore: 12,
    raisedScore: 8,
    faceScore: 15,
    explainScore: 5,
    straightScore: 20,
  });

  return (
    <div className='box-border flex h-screen w-screen flex-col pt-24 pb-8 [background:linear-gradient(112deg,#E9F4F1_2.32%,#E6EFF4_99.22%)] lg:pb-10 xl:pb-14'>
      <Navbar />

      <main className='grid-layout h-full w-full grid-rows-[auto_repeat(9,1fr)] pt-0'>
        {/* col-span은 grid-layout 기준에 맞춰서 조정 */}
        <div className='col-span-0 md:col-span-1' />

        {/* 제목 + 날짜 + 돌아가기 버튼 */}
        <HeaderSection
          title='기후 변화와 글로벌 경제: 지속 가능한 미래를 위한 대응 전략'
          date='7/23일 기후정의 기말 발표'
        />

        {/* 제스처 점수 카드 */}
        <ScoreSummaryCard
          gestureScore={89}
          crossedScore={12}
          raisedScore={8}
          faceScore={15}
          explainScore={5}
          straightScore={20}
        />

        {/* 분석 영상 */}
        <GestureVideo videoUrl='/videos/gesture_sample.mp4' />

        {/* 피드백 텍스트 탭 */}
        <FeedbackTabs
          positiveFeedback={positiveFeedback}
          negativeFeedback={negativeFeedback}
        />
      </main>
    </div>
  );
};

export default GestureDetailPage;
