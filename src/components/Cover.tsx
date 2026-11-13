import { formatWeddingDate } from "../utils/date";
import SectionTitle from "./SectionTitle";

interface CoverProps {
  groomName: string;
  brideName: string;
  date: string;
  venueName: string;
  image: string;
}

export default function Cover({
  groomName,
  brideName,
  date,
  venueName,
  image,
}: CoverProps) {
  const { dateText, timeText } = formatWeddingDate(date);

  return (
    <section className="text-center">
      <img
        src={image}
        alt="웨딩 사진"
        className="w-full aspect-3/4 object-cover"
      />
      <div className="py-10">
        <SectionTitle>WEDDING INVITTATION</SectionTitle>
        <h1 className="mt-4 text-2xl font-semibold">
          {groomName} <span className="mx-2 text-gray-400">&</span> {brideName}
        </h1>
        <p className="mt-6 text-gray-700">
          {dateText}
          {timeText}
        </p>
        <p className="text-gray-700">{venueName}</p>
      </div>
    </section>
  );
}
