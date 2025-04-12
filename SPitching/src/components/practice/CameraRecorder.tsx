import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import CameraPreview from './CameraPreview';

export type CameraRecorderHandle = { stopRecording: () => void };

type CameraRecorderProps = { onRecordingComplete: (videoBlob: Blob) => void };

const CameraRecorder = forwardRef<CameraRecorderHandle, CameraRecorderProps>(
  ({ onRecordingComplete }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunksRef = useRef<Blob[]>([]);
    const streamRef = useRef<MediaStream | null>(null);

    useImperativeHandle(ref, () => ({
      stopRecording() {
        if (mediaRecorderRef.current?.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
      },
    }));

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
        if (mediaRecorderRef.current?.state !== 'inactive') {
          mediaRecorderRef.current?.stop();
        }
        streamRef.current?.getTracks().forEach((track) => track.stop());
      };
    }, []);

    return <CameraPreview videoRef={videoRef} />;
  },
);

// ✅ displayName 설정
CameraRecorder.displayName = 'CameraRecorder';

export default CameraRecorder;
