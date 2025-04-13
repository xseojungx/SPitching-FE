// CameraRecorder.tsx
import { useRef, useImperativeHandle, forwardRef } from 'react';
import CameraPreview from './CameraPreview';

export type CameraRecorderHandle = {
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
};

type CameraRecorderProps = { onRecordingComplete: (videoBlob: Blob) => void };

const CameraRecorder = forwardRef<CameraRecorderHandle, CameraRecorderProps>(
  ({ onRecordingComplete }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunksRef = useRef<Blob[]>([]);
    const streamRef = useRef<MediaStream | null>(null);

    useImperativeHandle(ref, () => ({
      async startRecording() {
        if (streamRef.current || mediaRecorderRef.current) return;

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
            if (e.data.size > 0) {
              recordedChunksRef.current.push(e.data);
            }
          };

          mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunksRef.current, {
              type: 'video/webm',
            });
            onRecordingComplete(blob);

            if (streamRef.current) {
              streamRef.current.getTracks().forEach((track) => track.stop());
              streamRef.current = null;
            }

            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.srcObject = null;
              videoRef.current.removeAttribute('src');
              videoRef.current.load();
            }

            recordedChunksRef.current = [];
          };

          mediaRecorderRef.current = mediaRecorder;
          mediaRecorder.start();
          console.log('📽️ MediaRecorder started');
        } catch (err) {
          console.error('❌ Camera initialization failed:', err);
        }
      },

      async stopRecording() {
        const recorder = mediaRecorderRef.current;
        if (recorder && recorder.state === 'recording') {
          recorder.stop();
          console.log('🛑 MediaRecorder stopping...');
        }
      },
    }));

    return <CameraPreview videoRef={videoRef} />;
  },
);

CameraRecorder.displayName = 'CameraRecorder';
export default CameraRecorder;
