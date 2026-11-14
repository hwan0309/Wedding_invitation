import { useState, useRef } from "react";
import SectionTitle from "./SectionTitle";

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const touchStartX = useRef(0);
  const showPrev = () =>
    setSelected((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length,
    );

  const showNext = () =>
    setSelected((prev) => (prev === null ? null : (prev + 1) % images.length));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50)
      showPrev(); // 이전사진 (우측으로 밀기)
    else if (diff < -50) showNext(); //다음사진 (좌측으로 밀기)
  };
  return (
    <section className="px-4 py-16 text-center">
      <SectionTitle>GALLERY</SectionTitle>
      <div className="mt-8 grid grid-cols-3 gap-1">
        {images.map((src, i) => (
          <button key={src} type="button" onClick={() => setSelected(i)}>
            <img
              src={src}
              alt={`웨딩 사진 ${i + 1}`}
              className="aspect-square w-full object-cover"
            />
          </button>
        ))}
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setSelected(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={images[selected]}
            alt={`웨딩 사진 ${selected + 1}`}
            className="max-h-[85vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            aria-label="닫기"
            className="absolute right-4 top-4 text-3xl text-white"
            onClick={() => setSelected(null)}
          >
            x
          </button>
          <button
            type="button"
            aria-label="이전 사진"
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-3xl text-white/70"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="다음 사진"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-3xl text-white/70"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            ›
          </button>
          <p className="absolute bottom-6 text-sm text-white/70">
            {selected + 1} / {images.length}
          </p>
        </div>
      )}
    </section>
  );
}
