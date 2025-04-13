interface GestureVideoProps {
  videoUrl: string;
}

const GestureVideo = ({ videoUrl }: GestureVideoProps) => {
  return (
    <div className='white-card col-span-7 col-start-5 row-span-5 row-start-2 flex flex-col items-start justify-start overflow-hidden'>
      <h2 className='s2 mb-2 text-gray-700'>제스처 분석 영상</h2>
      <div className='flex w-full flex-1 items-center justify-center'>
        <video
          src={videoUrl}
          controls
          className='w-9/10 rounded-lg shadow-md outline-none'
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default GestureVideo;
