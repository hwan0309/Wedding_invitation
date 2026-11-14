let promise: Promise<void> | null = null;

export function loadKakaoMap(): Promise<void> {
  if (promise) return promise;

  promise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_JS_KEY}&autoload=false`;
    script.onload = () => window.kakao.maps.load(() => resolve());
    script.onerror = () =>
      reject(new Error("카카오맵 SDK를 불러오지 못했습니다"));
    document.head.appendChild(script);
  });
  return promise;
}
