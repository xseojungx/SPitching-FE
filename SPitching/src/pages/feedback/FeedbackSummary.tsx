import Navbar from '../../components/common/Navbar';
import SummaryGraph from '../../components/feedback/summary/SummaryGraph';
import TotalScore from '../../components/feedback/summary/TotalScore';
import DurationCard from '../../components/feedback/summary/DurationCard';
import EyeContactCard from '../../components/feedback/summary/EyeContactCard';
import FluencyCard from '../../components/feedback/summary/FluencyCard';
import GestureScoreCard from '../../components/feedback/summary/GestureScoreCard';
import SimilarityCard from '../../components/feedback/summary/SimilarityCard';
import {
  useFeedbackGesture,
  useFeedbackEyeContact,
  useFeedbackFluency,
  useFeedbackSummary,
  useFeedbackSimilarity,
} from '@/hooks/useFeedback';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import {
  setSummary,
  setEyeContact,
  setFluency,
  setGesture,
  setSimilarity,
  setRecentPractice,
} from '@/redux/slices/feedback.slice';

import { useRecentPractice } from '@/hooks/useDashboard';
import { useEffect } from 'react';

const FeedbackSummary = () => {
  const practiceId = useSelector((state: RootState) => state.practice.practiceId);

  if (!practiceId) return <div>분석 결과 없음</div>;
  const { data: summaryData } = useFeedbackSummary(practiceId);
  const { data: eyeContactData } = useFeedbackEyeContact(practiceId);
  const { data: fluencyData } = useFeedbackFluency(practiceId);
  const { data: gestureData } = useFeedbackGesture(practiceId);
  const { data: similarityData } = useFeedbackSimilarity(practiceId);
  const { data: recentPracticeData } = useRecentPractice();

  // const gesture = useSelector((state: RootState) => state.feedback.gesture);
  // console.log('제스처', gesture);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (recentPracticeData) {
      console.log('recentPracticeData dispatch', recentPracticeData);
      dispatch(setRecentPractice(recentPracticeData));
    }
  }, [recentPracticeData, dispatch]);
  useEffect(() => {
    if (summaryData) {
      console.log('summaryData dispatch', summaryData);
      dispatch(setSummary(summaryData));
    }
  }, [summaryData, dispatch]);
  useEffect(() => {
    if (eyeContactData) {
      console.log('eyeContactData dispatch', eyeContactData);
      dispatch(setEyeContact(eyeContactData));
    }
  }, [eyeContactData, dispatch]);
  useEffect(() => {
    if (fluencyData) {
      console.log('fluencyData dispatch', fluencyData);
      dispatch(setFluency(fluencyData));
    }
  }, [fluencyData, dispatch]);
  useEffect(() => {
    if (gestureData) {
      console.log('gestureData dispatch', gestureData);
      dispatch(setGesture(gestureData));
    }
  }, [gestureData, dispatch]);
  useEffect(() => {
    if (similarityData) {
      console.log('similarityData dispatch', similarityData);
      dispatch(setSimilarity(similarityData));
    }
  }, [similarityData, dispatch]);

  return (
    <div className='box-border flex h-screen w-screen flex-col pt-24 pb-8 [background:linear-gradient(112deg,#E9F4F1_2.32%,#E6EFF4_99.22%)] lg:pb-10 xl:pb-14'>
      <Navbar />

      <main className='grid-layout h-full w-full grid-rows-[auto_repeat(9,1fr)] pt-0'>
        <div className='col-span-0 md:col-span-1' />
        <div className='col-span-10 flex w-full items-end gap-3'>
          <span className='h1 text-gray-900'>{recentPracticeData?.title}</span>
          <span className='s2 text-gray-700'>{recentPracticeData?.description}</span>
        </div>
        {recentPracticeData && (
          <>
            <SummaryGraph recentPracticeData={recentPracticeData} />
            <TotalScore recentPracticeData={recentPracticeData} />
          </>
        )}
        {similarityData && <SimilarityCard similarityData={similarityData} />}
        <DurationCard />
        {gestureData && (
          <GestureScoreCard
            crossedScore={gestureData.crossedScore}
            gestureScore={gestureData.gestureScore}
            raisedScore={gestureData.raisedScore}
            faceScore={gestureData.faceScore}
            explainScore={gestureData.explainScore}
            straightScore={gestureData.straightScore}
          />
        )}
        {fluencyData && <FluencyCard fluencyData={fluencyData} />}
        {eyeContactData && <EyeContactCard eyeContactData={eyeContactData} />}
      </main>
    </div>
  );
};

export default FeedbackSummary;
