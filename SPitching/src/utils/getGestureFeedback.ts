interface GestureFeedbackParams {
  gestureScore: number;
  crossedScore: number;
  raisedScore: number;
  faceScore: number;
  explainScore: number;
  straightScore: number;
}

interface GestureFeedbackResult {
  positiveFeedback: string[];
  negativeFeedback: string[];
}

export function getGestureFeedbackMessage({
  gestureScore,
  crossedScore,
  raisedScore,
  faceScore,
  explainScore,
  straightScore,
}: GestureFeedbackParams): GestureFeedbackResult {
  const positiveFeedback: string[] = [];
  const negativeFeedback: string[] = [];

  if (gestureScore >= 70) {
    positiveFeedback.push(
      '발표 자세가 매우 안정적이고 손동작을 효과적으로 활용하여 청중의 이해를 도왔습니다.',
      '자연스럽고 자신감 있는 제스처 사용이 발표 전달력을 극대화하는 데 큰 도움이 되었습니다.',
    );
  } else {
    negativeFeedback.push(
      '발표 중 몸의 균형을 유지하고 적극적인 손동작을 활용하면 더욱 설득력 있는 발표가 가능합니다.',
      '적절한 손동작은 발표 내용의 핵심을 강조하는 데 효과적이며, 청중의 집중도를 높이는 데 기여할 수 있습니다.',
    );
  }

  if (explainScore >= 25) {
    positiveFeedback.push(
      '손을 펼쳐 설명하는 제스처가 효과적으로 사용되었습니다. 이는 발표 내용의 명확성을 높이는 데 긍정적인 영향을 주었습니다.',
    );
  }

  if (straightScore >= 20) {
    positiveFeedback.push(
      '발표 내내 몸을 곧게 펴고 흔들림 없이 자세를 유지한 점이 인상적이었습니다. 이는 발표자의 신뢰도를 높이는 요소로 작용합니다.',
    );
  }

  if (crossedScore >= 10) {
    negativeFeedback.push(
      '발표 중 팔짱을 끼는 습관은 청중에게 방어적인 인상을 줄 수 있습니다.',
      '팔짱을 푸는 것만으로도 더욱 개방적이고 친근한 태도를 연출할 수 있으니 신경 써보세요.',
    );
  }

  if (raisedScore >= 10) {
    negativeFeedback.push(
      '손을 과도하게 올리는 제스처는 자칫 청중에게 강압적이거나 불필요한 긴장감을 줄 수 있습니다.',
      '자연스럽고 절제된 손동작을 사용하면 보다 전문적인 발표 태도를 유지할 수 있습니다.',
    );
  }

  if (faceScore >= 10) {
    negativeFeedback.push(
      '발표 중 얼굴을 자주 만지는 행동은 청중에게 긴장하거나 불안한 인상을 줄 수 있습니다.',
      '손의 움직임을 자연스럽게 조절하고, 시선과 제스처를 활용하여 자신감을 표현하는 것이 더욱 효과적입니다.',
    );
  }
  console.log(positiveFeedback, negativeFeedback);

  return { positiveFeedback, negativeFeedback };
}
