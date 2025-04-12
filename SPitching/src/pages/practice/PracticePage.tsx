import ScriptViewer from '@/components/practice/ScriptViewer';
import PracticeContent from '@/components/practice/PracticeContent';
import PracticeHeader from '../../components/practice/PracticeHeader';
import { useRef } from 'react';
import CameraRecorder, {
  CameraRecorderHandle,
} from '@/components/practice/CameraRecorder';

const PracticePage = () => {
  const recorderRef = useRef<CameraRecorderHandle>(null);

  const handleRecordingComplete = async (blob: Blob) => {
    const formData = new FormData();
    formData.append('video', blob, 'practice_video.webm');

    // await fetch('/api/v1/practices/1/upload', {
    //   method: 'POST',
    //   body: formData,
    // });

    alert('영상 업로드 완료!');
  };

  const handleFinish = () => {
    recorderRef.current?.stopRecording(); // 🎯 녹화 중단 트리거
  };

  return (
    <div className='box-border flex h-screen w-screen flex-col pt-24 [background:linear-gradient(114deg,#F6FCEF_0%,#E6EFF4_100%)]'>
      <PracticeHeader onFinish={handleFinish} />

      {/* 콘텐츠 영역 */}
      <div className='flex flex-1 items-center justify-center overflow-hidden'>
        <article className='flex h-full max-h-[1080px] min-h-50 w-10/12 max-w-screen-2xl gap-4'>
          <CameraRecorder
            ref={recorderRef}
            onRecordingComplete={handleRecordingComplete}
          />
          <PracticeContent />
        </article>
      </div>

      {/* 대본 */}
      <ScriptViewer />
    </div>
  );
};
export default PracticePage;

// import { useEffect, useState } from 'react';
// import PracticeHeader from '../../components/practice/PracticeHeader';
// import PracticeContent from '../../components/practice/PracticeContent';
//

// const slides = [
//   '/assets/mock_ppt_1.png',
//   '/assets/mock_ppt_2.png',
//   '/assets/mock_ppt_3.png',
// ];

// const mockScript = `2024년, 전 세계적으로 이상기후 현상이 반복되며 많은 피해가 있었습니다.
// 강력한 태풍과 대형 산불, 이상 고온 현상은 많은 지역에 큰 충격을 주었습니다.
// 그뿐 아니라, 예기치 못한 지진이나 국지성 집중호우도 자주 발생하고 있습니다.
// 이러한 기후 변화에 대응하기 위해 우리는 어떤 노력을 해야 할까요?`;

// const PracticePage = () => {
//   const [currentScript] = useState(mockScript);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // 🔁 키보드 이벤트 핸들링
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'ArrowRight' || e.key === ' ') {
//         setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
//       } else if (e.key === 'ArrowLeft') {
//         setCurrentSlide((prev) => Math.max(prev - 1, 0));
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   return (
//     <div className='flex h-screen w-screen flex-col overflow-hidden bg-white'>
//       <Navbar />
//       {/* 상단 버튼 */}
//       {/* <PracticeHeader onFinish={() => alert('발표 종료')} /> */}

//       {/* 좌우 발표 연습 영역 */}
//       <div className='flex-1 pt-16'>
//         <PracticeContent
//           currentScript={currentScript}
//           currentSlide={slides[currentSlide]}
//         />
//       </div>
//     </div>
//   );
// };

// export default PracticePage;
