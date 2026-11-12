import type { Venue } from "../config";
import { formatWeddingDate } from "../utils/date";

interface WeddingInfoProps {
  date: string;
  venue: Venue;
}

export default function WeddingInfo({ date, venue }: WeddingInfoProps) {
  const { dateText, timeText } = formatWeddingDate(date);

  return (
    <section className=" bg-gray-50 px-8 py-16 text-center">
      <p className="text-xs tracking-[0.3em] text-gray-500">DATE</p>
      <p className="mt-4 font-medium text-gray-800">
        {dateText}
        {timeText}
      </p>
      <p className="mt-12 text-xs tracking-[0.3em] text-gray-500">ADDRESS</p>
      <p className="mt-4 font_medium text-gray-800">
        {venue.hall}
        {venue.name}
      </p>
      <p className="mt-1 text-sm text-gray-500">{venue.address}</p>
    </section>
  );
}
