import { GraphScoreResponse, ScoreItem } from '@/types/feedback.types';
export const transformGraphScoreData = (rawData: GraphScoreResponse): GraphScoreResponse => {
  const { presentationId, score } = rawData;

  // 각 점수 항목의 합산용
  let totalStt = 0;
  let totalGesture = 0;
  let totalCosine = 0;
  let totalEye = 0;

  // 변환된 ScoreItem 배열
  const scoreItems: ScoreItem[] = score.map((item: ScoreItem) => {
    const sttScore = Number(item.sttScore) || 0;
    const gestureScore = Number(item.gestureScore) || 0;
    const cosineSimilarity = Number(item.cosineSimilarity) || 0;
    const eyeContactScore = Number(item.eyeContactScore) || 0;

    totalStt += sttScore;
    totalGesture += gestureScore;
    totalCosine += cosineSimilarity;
    totalEye += eyeContactScore;

    return {
      period: String(item.period),
      sttScore,
      gestureScore,
      cosineSimilarity,
      eyeContactScore,
    };
  });

  const count = score.length;

  const averageScores = {
    sttScore: Math.round(totalStt / count),
    gestureScore: Math.round(totalGesture / count),
    cosineSimilarity: Math.round(totalCosine / count),
    eyeContactScore: Math.round(totalEye / count),
  };

  console.log('네 점수 평균:', averageScores);

  return { presentationId, score: scoreItems };
};
