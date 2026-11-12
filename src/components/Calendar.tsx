import { getCalendarDays, getDday } from "../utils/date";

interface CalendarProps {
  date: string;
}

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];

export default function Calendar({ date }: CalendarProps) {
  const { year, month, day, days } = getCalendarDays(date);
  const dday = getDday(date);

  const ddayText =
    dday > 0
      ? `결혼식까지 ${dday}일 남았습니다`
      : dday === 0
        ? "오늘 결혼합니다"
        : `결혼한 지 ${-dday}일 되었습니다`;

  return (
    <section className="px-8 py-16 text-center">
      <p className="text-xs tracking-[0.3em] text-gray-500">CALENDAR</p>
      <p className="mt-4 text-lg font-medium">
        {year}년{month}월
      </p>

      <div className="mt-6 grid grid-cols-7 gap-y-3 text-sm">
        {WEEK.map((w, i) => (
          <span key={w} className={i === 0 ? "text-red-400" : "text-gray-400"}>
            {w}
          </span>
        ))}

        {days.map((d, i) => (
          <span
            key={i}
            className={
              d === day
                ? "mx-auto flex size-8 items-center justify-center rounded-full bg-rose-400 text-white"
                : i % 7 === 0
                  ? "leading-8 text-red-400"
                  : "leading-8 text-gray-700"
            }
          >
            {d}
          </span>
        ))}
      </div>
      <p className="mt-8 text-gray700">{ddayText}</p>
    </section>
  );
}
