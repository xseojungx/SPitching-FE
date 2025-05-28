// hooks/useCameraRecorder.ts
import { useRef } from 'react';
import type { CameraRecorderHandle } from '@/components/practice/CameraRecorder';

export const useCameraRecorder = () => {
  const recorderRef = useRef<CameraRecorderHandle>(null);

  const startRecording = () => recorderRef.current?.startRecording();
  const stopRecording = () => recorderRef.current?.stopRecording();

  return { recorderRef, startRecording, stopRecording };
};
