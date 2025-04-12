// components/practice/CameraPreview.tsx
import { RefObject } from 'react';

type CameraPreviewProps = { videoRef: RefObject<HTMLVideoElement> };

const CameraPreview = ({ videoRef }: CameraPreviewProps) => {
  return (
    <section className='h-full flex-7/10 overflow-hidden rounded-xl bg-black shadow-sm'>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className='h-full w-full -scale-x-100 transform rounded-xl object-cover'
      />
    </section>
  );
};

export default CameraPreview;
