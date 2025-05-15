// 발표 슬라이드 정보
export interface Slide {
  id?: number;
  content?: string;
  order?: number;
  // 기타 필요한 필드들 추가
}

// 개별 연습 정보 (기본)
export interface Practice {
  id?: number;
  score?: number;
  createdAt?: string;
  updatedAt?: string;
  graph?: PracticeGraph; // optional하게 그래프 포함 가능
}

// 발표 정보 (전체 DB 기준)
export interface Presentation {
  id: number;
  title: string;
  description: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  totalScore: number | null;
  practiceCount: number | null;
  firstSlideImageUrl: string | null;
  practices: Practice[];
  slides: Slide[];
}

// 최근 연습이 포함된 요약형 발표 데이터 (대시보드 등에서 사용)
export interface RecentPractice {
  presentationId: number;
  practiceId: number;
  title: string;
  description: string;
  created: string; // 발표 생성일
  lastPractice: string; // 마지막 연습 일시
  practiceCount: number;
  firstSlideImageUrl: string | null;
  tags: string[];
  graph: PracticeGraph;
}

// 연습 관련 점수 그래프 정보
export interface PracticeGraph {
  cosineSimilarity: number;
  currentScore: number;
  eyeScore: number | null;
  gestureScore: number | null;
  sttScore: number | null;
  previousScores: number[];
}
export interface CreatedPresentationResponse {
  id: number;
  title: string;
  description: string;
  duration: string; // "00:03:00" 형태
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  practiceCount: number | null;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN'; // 역할이 enum이라면 이렇게 지정
    picture: string; // URL
  };
}
export interface UploadPresentationParams {
  presentationId: number;
  file: File; // 업로드할 파일 (video, audio 등)
}

interface UploadedSlide {
  id: number;
  slideNumber: number;
  imageUrl: string;
  script: string | null;
  createdAt: string;
}

export type UploadSlidesResponse = UploadedSlide[];

export type SingleTag = { tagId: number; content: string };

export type SlideTag = { slideId: number; content: SingleTag[] };
export type NewTag = { slideId: number; content: string };

export type TagsList = SlideTag[];
