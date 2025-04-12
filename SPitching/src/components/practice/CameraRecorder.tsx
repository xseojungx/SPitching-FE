// components/practice/CameraRecorder.tsx
import { useEffect, useRef } from 'react';
import CameraPreview from './CameraPreview';

type CameraRecorderProps = { onRecordingComplete: (videoBlob: Blob) => void };

const CameraRecorder = ({ onRecordingComplete }: CameraRecorderProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // 초기 카메라 접근 및 녹화 시작
  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'video/webm',
        });

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) recordedChunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, {
            type: 'video/webm',
          });
          onRecordingComplete(blob);
        };

        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
      } catch (err) {
        console.error('🎥 카메라 접근 오류:', err);
      }
    };

    initCamera();

    return () => {
      // 컴포넌트 언마운트 시 정리
      if (mediaRecorderRef.current?.state !== 'inactive') {
        mediaRecorderRef.current?.stop();
      }
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // 외부에서 stop 요청 가능하게 핸들러 반환 (선택적 확장)
  // → 예: useImperativeHandle로 제어 가능하게 만들 수도 있음

  return <CameraPreview videoRef={videoRef} />;
};

export default CameraRecorder;
