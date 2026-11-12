//날짜 변환 함수
export function formatWeddingDate(date: string) {
  const d = new Date(date);

  const dateText = d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const timeText = d.toLocaleTimeString("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
  });
  return { dateText, timeText };
}

//디데이
export function getDday(date: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.round(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
}

//예식이 있는 달의 달력 칸
export function getCalendarDays(date: string) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay(); //0 = 일요일
  const lastDate = new Date(year, month + 1, 0).getDate(); //그달 의 마지막 날

  const days: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) days.push(null);
  for (let i = 1; i < lastDate; i++) days.push(i);

  return { year, month: month + 1, day: d.getDate(), days };
}
