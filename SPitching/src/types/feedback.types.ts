import { Tag } from './presentation.types';

// 전체 요약 점수
export interface ScoreDetails {
  scriptSimilarity: number | null;
  gestureScore: number | null;
  eyeScore: number | null;
  practiceId: number;
  scoreCalculated: boolean;
  fluencyScore: number | null;
  totalScore: number | null;
}

export interface RecentFeedback {
  presentationId: number;
  practiceId: number;
  title: string;
  description: string;
  created: string; // 발표 생성일
  lastPractice: string; // 마지막 연습 일시
  practiceCount: number;
  firstSlideImageUrl: string;
  tags: Tag[];
  graph: FeedbackGraph;
}
export interface FeedbackGraph {
  cosineSimilarity: number;
  currentScore: number;
  eyeScore: number;
  gestureScore: number;
  sttScore: number;
  previousScores: number[];
}
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

export interface ScoreItem {
  period: string;
  sttScore: number;
  gestureScore: number;
  cosineSimilarity: number;
  eyeContactScore: number;
}

export interface GraphScoreResponse {
  score: ScoreItem[];
  presentationId: number;
}

// src/types/presentation.types.ts

export interface PresentationUser {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN'; // 필요하면 다른 Role 추가
  picture: string;
}

export interface Presentation {
  id: number;
  title: string;
  description: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  deletedAt: string | null;
  practiceCount: number;
  duration: string;
  user: PresentationUser;
}
