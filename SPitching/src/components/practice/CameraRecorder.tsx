import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import CameraPreview from './CameraPreview';

export type CameraRecorderHandle = { stopRecording: () => Promise<void> };

type CameraRecorderProps = { onRecordingComplete: (videoBlob: Blob) => void };

const CameraRecorder = forwardRef<CameraRecorderHandle, CameraRecorderProps>(
  ({ onRecordingComplete }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunksRef = useRef<Blob[]>([]);
    const streamRef = useRef<MediaStream | null>(null);

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
            if (e.data.size > 0) {
              recordedChunksRef.current.push(e.data);
            }
          };

          mediaRecorder.start();
          mediaRecorderRef.current = mediaRecorder;

          console.log('📽️ MediaRecorder started');
        } catch (err) {
          console.error('❌ Camera initialization failed:', err);
        }
      };

      initCamera();

      // return () => {
      //   const recorder = mediaRecorderRef.current;
      //   const stream = streamRef.current;

      //   if (recorder?.state === 'recording') {
      //     recorder.stop();
      //     console.log('[Cleanup] MediaRecorder forcibly stopped');
      //   }

      //   if (stream) {
      //     stream.getTracks().forEach((track) => {
      //       if (track.readyState === 'live') {
      //         track.stop(); // ✅ 트랙 개별 해제
      //       }
      //     });
      //     streamRef.current = null; // ✅ 스트림 전체 해제
      //     console.log('[Cleanup] Stream tracks stopped');
      //   }

      //   if (videoRef.current) {
      //     videoRef.current.srcObject = null; // ✅ 연결 제거
      //   }
      // };
    }, []);

    useImperativeHandle(ref, () => ({
      async startRecording() {
        if (streamRef.current || mediaRecorderRef.current) return; // 이미 실행 중이면 무시

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

            recordedChunksRef.current = []; // 초기화
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
