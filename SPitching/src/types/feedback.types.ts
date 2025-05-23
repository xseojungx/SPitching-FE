// 전체 요약 점수
export interface FeedbackSummary {
  practiceId: number;
  totalScore: number;
  scriptSimilarity: number;
  gestureScore: number;
  eyeScore: number;
  fluencyScore: number;
  scoreCalculated: boolean;
}

// 시선 점수 (eye tracking)
export interface EyeContactScore {
  userId: number;
  presentationId: number;
  practiceId: number;
  videoUrl: string;
  eyecontactScore: number;
}

// 말하기 유창성 점수 + filler/silence 통계 + 전체 스크립트
export interface FluencyScore {
  userId: number;
  presentationId: number;
  practiceId: number;
  fluencyScore: number;
  statisticsFiller: FillerStatistic[];
  statisticsSilence: SilenceStatistic[];
  transcript: TranscriptSegment[];
}

export interface FillerStatistic {
  eo: number;
  eum: number;
  geu: number;
  totalFillerCount: number;
  fillerRatio: number;
}

export interface SilenceStatistic {
  silenceRatio: number;
  speakingRatio: number;
  totalPresentationTime: number;
}

export interface TranscriptSegment {
  start: number; // in milliseconds
  end: number;
  tag: string; // e.g., "0000", "1000"
  result: string;
}

// 스크립트 유사도
export interface SimilarityScore {
  practiceId: number;
  scriptSimilarity: number; // decimal between 0 and 1
}

// 제스처 점수
export interface GestureScore {
  userId: number;
  presentationId: number;
  practiceId: number;
  gestureScore: number;
  straightScore: number;
  explainScore: number;
  crossedScore: number;
  raisedScore: number;
  faceScore: number;
  videoUrl: string;
}
