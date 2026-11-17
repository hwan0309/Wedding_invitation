declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any; // 지도 SDK
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any; // 공유 SDK
  }
}

export {};
