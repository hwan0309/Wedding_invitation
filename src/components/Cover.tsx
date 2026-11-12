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

  return (
    <section className="text-center">
      <img
        src={image}
        alt="웨딩 사진"
        className="w-full aspect-3/4 object-cover"
      />
      <div className="py-10">
        <p className="text-xs tracking-[0.3em] text-gray-500">
          WEDDING INVITTATION
        </p>
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
