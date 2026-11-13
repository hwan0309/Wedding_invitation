import SectionTitle from "./SectionTitle";

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  return (
    <section className="px-4 py-16 text-center">
      <SectionTitle>GALLERY</SectionTitle>
      <div className="mt-8 grid grid-cols-3 gap-1">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`웨딩 사진 ${i + 1}`}
            className="aspect-square w-full object-cover"
          />
        ))}
      </div>
    </section>
  );
}
