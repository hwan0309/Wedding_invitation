import { useEffect, useRef, useState } from "react";
import type { Venue } from "../config";
import { loadKakaoMap } from "../utils/loadKakaoMap";
import SectionTitle from "./SectionTitle";
import { copyText } from "../utils/clipboard";

interface LocationProps {
  venue: Venue;
}

export default function Location({ venue }: LocationProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadKakaoMap()
      .then(() => {
        if (!mapRef.current) return;
        const { kakao } = window;
        const center = new kakao.maps.LatLng(venue.lat, venue.lng);
        const map = new kakao.maps.Map(mapRef.current, { center, level: 3 });

        //마커 핀
        const marker = new kakao.maps.Marker({ position: center });
        marker.setMap(map);
      })
      .catch(console.error);
  }, [venue.lat, venue.lng]);

  const place = `${encodeURIComponent(venue.name)},${venue.lat},${venue.lng}`;
  const routeUrl = `https://map.kakao.com/link/to/${place}`;
  const mapUrl = `https://map.kakao.com/link/map/${place}`;

  const handleCopyAddress = async () => {
    await copyText(venue.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <section className="px-8 py-16 text-center">
      <SectionTitle>LOCATION</SectionTitle>

      <p className="mt-6 font-medium text-gray-800">
        {venue.name} {venue.hall}
      </p>
      <p className="mt-1 text-sm text-gray-500">{venue.address}</p>
      <div ref={mapRef} className="mt-8 h-72 w-full rounded-lg"></div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <a
          href={routeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-yellow-300 font-medium  text-gray-700 py-3"
        >
          길찾기
        </a>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreFerrer"
          className="rounded-lg border border-gray-300  bg-white py-3 text-gray-700"
        >
          지도 크게보기
        </a>
        <button
          type="button"
          onClick={handleCopyAddress}
          className="rounded-lg border border-gray-300 bg-white py-3   text-gray-700"
        >
          {copied ? "복사됨" : "주소 복사"}
        </button>
      </div>
    </section>
  );
}
