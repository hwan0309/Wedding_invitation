import { useEffect, useState } from "react";
import { useSwipe } from "../hooks/useSwipe";
import SectionTitle from "./SectionTitle";

interface NavButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
}

function NavButton({ direction, onClick }: NavButtonProps) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      aria-label={isPrev ? "이전 사진" : "다음 사진"}
      className={`absolute top-1/2 -translate-y-1/2 p-3 text-3xl text-white drop-shadow ${
        isPrev ? "left-1" : "right-1"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {isPrev ? "‹" : "›"}
    </button>
  );
}

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  const total = images.length;
  const [current, setCurrent] = useState(0); // 본문에 보이는 사진
  const [selected, setSelected] = useState<number | null>(null); // 모달에 보이는 사진

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const modalPrev = () =>
    setSelected((s) => (s === null ? null : (s - 1 + total) % total));
  const modalNext = () =>
    setSelected((s) => (s === null ? null : (s + 1) % total));

  const inlineSwipe = useSwipe(prev, next);
  const modalSwipe = useSwipe(modalPrev, modalNext);

  // 모달이 열려 있는 동안 뒤 페이지 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = selected !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section className="px-4 py-16 text-center">
      <SectionTitle>GALLERY</SectionTitle>

      {/* 큰 사진 한 장 */}
      <div className="relative mt-8" {...inlineSwipe}>
        <button
          type="button"
          className="block w-full"
          onClick={() => setSelected(current)}
        >
          <img
            src={images[current]}
            alt={`웨딩 사진 ${current + 1}`}
            className="aspect-3/4 w-full object-cover"
          />
        </button>
        <NavButton direction="prev" onClick={prev} />
        <NavButton direction="next" onClick={next} />
        <p className="absolute bottom-3 right-3 rounded-full bg-black/40 px-2 py-0.5 text-xs text-white">
          {current + 1} / {total}
        </p>
      </div>

      {/* 썸네일 줄 */}
      <div className="mt-2 flex gap-1 overflow-x-auto">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setCurrent(i)}
            className={`shrink-0 transition-opacity ${
              i === current ? "opacity-100" : "opacity-40"
            }`}
          >
            <img src={src} alt="" className="size-14 object-cover" />
          </button>
        ))}
      </div>

      <p className="mt-3 text-xs text-gray-400">
        사진을 누르면 크게 볼 수 있어요
      </p>

      {/* 전체 화면 모달 */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setSelected(null)}
          {...modalSwipe}
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
            ×
          </button>
          <NavButton direction="prev" onClick={modalPrev} />
          <NavButton direction="next" onClick={modalNext} />
          <p className="absolute bottom-6 text-sm text-white/70">
            {selected + 1} / {total}
          </p>
        </div>
      )}
    </section>
  );
}
