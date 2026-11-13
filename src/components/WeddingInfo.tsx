import type { Venue } from "../config";
import { formatWeddingDate } from "../utils/date";
import SectionTitle from "./SectionTitle";

interface WeddingInfoProps {
  date: string;
  venue: Venue;
}

export default function WeddingInfo({ date, venue }: WeddingInfoProps) {
  const { dateText, timeText } = formatWeddingDate(date);

  return (
    <section className=" bg-gray-50 px-8 py-16 text-center">
      <SectionTitle>DATE</SectionTitle>
      <p className="mt-4 font-medium text-gray-800">
        {dateText}
        {timeText}
      </p>
      <SectionTitle className="mt-12">ADDRESS</SectionTitle>
      <p className="mt-4 font_medium text-gray-800">
        {venue.hall}
        {venue.name}
      </p>
      <p className="mt-1 text-sm text-gray-500">{venue.address}</p>
    </section>
  );
}
