// src/services/practice.api.ts
export const postGestureFeedback = async (
  blob: Blob,
  userId: number,
  presentationId: number,
  practiceId: number,
): Promise<any> => {
  const formData = new FormData();
  formData.append('file', blob, 'practice_video.webm');
  formData.append('userId', String(userId));
  formData.append('presentationId', String(presentationId));
  formData.append('practiceId', String(practiceId));

  const response = await fetch(
    'http://localhost:8000/api/v1/feedback/gesture',
    { method: 'POST', body: formData },
  );

  if (!response.ok) {
    throw new Error(`AI 분석 실패: ${response.status}`);
  }

  return await response.json();
};
