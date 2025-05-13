const isSameDay = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const now = new Date();

  if (isSameDay(dateObj, now)) {
    // 오늘이면 시간만 반환 (HH:mm)
    return dateObj.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } else {
    // 어제 또는 그 이전이면 날짜 반환 (MM-DD)
    const monthDay = dateObj
      .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .replace(/\s/g, '');
    return monthDay;
  }
};

export const formatDateWithTime = (date: string) => {
  const dateObj = new Date(date);

  return dateObj.toLocaleTimeString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};
