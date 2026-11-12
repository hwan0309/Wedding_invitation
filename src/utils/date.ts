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
