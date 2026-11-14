import { useState } from "react";
import SectionTitle from "./SectionTitle";

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section className="px-4 py-16 text-center">
      <SectionTitle>GALLERY</SectionTitle>
      <div className="mt-8 grid grid-cols-3 gap-1">
        {images.map((src, i) => (
          <button key={src} type="button" onClick={() => setSelected(i)}>
            <img
              key={src}
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
            className="absolute right-4 top-4 text-exl text-white"
            onClick={() => setSelected(null)}
          >
            x
          </button>
          <p className="absolute bottom-6 text-sm text-white/70">
            {selected + 1} / {images.length}
          </p>
        </div>
      )}
    </section>
  );
}
