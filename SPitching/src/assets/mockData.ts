export const presentationMockData = {
  data: [
    {
      title: '졸프 중간 발표 데모',
      description: '4월 14일 졸프 중간 발표 데모용 발표연습',
      practice_count: 6,
      last_practice: '2025.04.14',
      created_at: '2025.04.07',
    },
    {
      title: '환경오염의 원인과 해결방안',
      description: '기후 변화와 환경오염에 대한 발표 연습',
      practice_count: 5,
      last_practice: '2025.04.12',
      created_at: '2025.04.04',
    },
    {
      title: '스마트폰이 청소년에게 미치는 영향',
      description: '현대 청소년의 스마트폰 사용 실태 분석 발표',
      practice_count: 4,
      last_practice: '2025.04.10',
      created_at: '2025.04.02',
    },
    {
      title: '나의 진로 탐색',
      description: '진로 교육 수업 발표를 위한 자기 탐색 주제',
      practice_count: 3,
      last_practice: '2025.04.08',
      created_at: '2025.03.31',
    },
    {
      title: '세계 속의 한국 문화',
      description: '한류와 전통 문화에 대한 소개 발표 연습',
      practice_count: 2,
      last_practice: '2025.04.06',
      created_at: '2025.03.29',
    },
  ],
};

export interface PracticeScore {
  name: string;
  score: number;
  ges: number;
  eye: number;
  sim: number;
  fluen: number;
}

export const prevPracticeData = [
  { name: '1회차', score: 52, ges: 45, eye: 60, sim: 50, fluen: 55 },
  { name: '2회차', score: 59, ges: 52, eye: 58, sim: 65, fluen: 62 },
  { name: '3회차', score: 63, ges: 60, eye: 55, sim: 70, fluen: 68 },
  { name: '4회차', score: 69, ges: 65, eye: 72, sim: 66, fluen: 74 },
  { name: '5회차', score: 69, ges: 58, eye: 78, sim: 73, fluen: 70 },
  { name: '6회차', score: 72, ges: 70, eye: 65, sim: 80, fluen: 75 },
];
