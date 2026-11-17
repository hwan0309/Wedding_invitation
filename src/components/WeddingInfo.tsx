import { formatWeddingDate } from "../utils/date";
import SectionTitle from "./SectionTitle";

interface WeddingInfoProps {
  date: string;
}

export default function WeddingInfo({ date }: WeddingInfoProps) {
  const { dateText, timeText } = formatWeddingDate(date);

  return (
    <section className="  px-8 py-16 text-center">
      <SectionTitle>DATE</SectionTitle>
      <p className="mt-4 font-medium text-gray-800">
        {dateText} {timeText}
      </p>
    </section>
  );
}
