import { useEffect, useRef } from "react";
import type { Venue } from "../config";
import { loadKakaoMap } from "../utils/loadKakaoMap";
import SectionTitle from "./SectionTitle";

interface LocationProps {
  venue: Venue;
}

export default function Location({ venue }: LocationProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadKakaoMap()
      .then(() => {
        if (!mapRef.current) return;
        const { kakao } = window;
        const center = new kakao.maps.LatLng(venue.lat, venue.lng);
        new kakao.maps.Map(mapRef.current, { center, level: 3 });
      })
      .catch(console.error);
  }, [venue.lat, venue.lng]);

  return (
    <section className="px-8 py-16 text-center">
      <SectionTitle>LOCATION</SectionTitle>
      <div ref={mapRef} className="mt-8 h-72 w-full rounded-lg"></div>
    </section>
  );
}
