interface GestureVideoProps {
  videoUrl: string;
}

const GestureVideo = ({ videoUrl }: GestureVideoProps) => {
  console.log(videoUrl);
  return (
    <div className='white-card col-span-7 col-start-5 row-span-6 row-start-2 flex flex-col items-start justify-start overflow-hidden'>
      <div className='flex h-full w-full flex-1 items-center justify-center'>
        {/* <video
          src='/Users/user/개발/SPitching-AI_SERVER/static/outputs/practice_video_제스처_20250414_111150.mp4'
          controls
          className='w-9/10 rounded-lg shadow-md outline-none'
        > */}
        <video
          src={videoUrl}
          controls
          className='aspect-[4/3] h-full w-9/10 rounded-lg shadow-md outline-none'
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default GestureVideo;
