// ─────────────────────────────────────────
// 1. 타입 정의: "이런 모양의 데이터여야 한다"는 설계도
// ─────────────────────────────────────────

// 사람 한 명
export interface Person {
  name: string;
  phone: string;
}

// 축의금 계좌 하나
export interface Account {
  label: string; // 화면에 보일 이름 (예: "신랑", "신랑 아버지")
  bank: string;
  number: string;
  holder: string; // 예금주
}

// 신랑 측 또는 신부 측 (본인 + 부모님 + 계좌 목록)
export interface Side {
  person: Person;
  father: Person;
  mother: Person;
  accounts: Account[]; // Account 여러 개를 담는 배열
}

// 예식장
export interface Venue {
  name: string;
  hall: string;
  address: string;
  lat: number; // 위도 (3주차 지도에서 사용)
  lng: number; // 경도
}

// 청첩장 전체
export interface WeddingConfig {
  groom: Side;
  bride: Side;
  date: string; // "2027-05-15T12:30:00" 형식 → 달력, D-day 계산에 사용
  venue: Venue;
  greeting: string;
  coverImage: string;
  gallery: string[]; // 사진 경로 여러 개
}

// ─────────────────────────────────────────
// 2. 실제 데이터 (지금은 가짜 데이터)
// ─────────────────────────────────────────

export const config: WeddingConfig = {
  groom: {
    person: { name: "김민준", phone: "010-0000-0001" },
    father: { name: "김철수", phone: "010-0000-0002" },
    mother: { name: "박영희", phone: "010-0000-0003" },
    accounts: [
      {
        label: "신랑",
        bank: "국민은행",
        number: "000-0000-0000",
        holder: "김민준",
      },
      {
        label: "신랑 아버지",
        bank: "신한은행",
        number: "000-000-000000",
        holder: "김철수",
      },
    ],
  },
  bride: {
    person: { name: "이서연", phone: "010-0000-0004" },
    father: { name: "이영호", phone: "010-0000-0005" },
    mother: { name: "최미정", phone: "010-0000-0006" },
    accounts: [
      {
        label: "신부",
        bank: "카카오뱅크",
        number: "0000-00-0000000",
        holder: "이서연",
      },
      {
        label: "신부 어머니",
        bank: "우리은행",
        number: "0000-000-000000",
        holder: "최미정",
      },
    ],
  },
  date: "2026-12-25T12:30:00",
  venue: {
    name: "OO웨딩홀",
    hall: "3층 그랜드홀",
    address: "서울특별시 강남구 테헤란로 123",
    lat: 37.5005,
    lng: 127.0365,
  },
  greeting: `서로 다른 길을 걸어온 두 사람이
이제 같은 길을 함께 걸어가려 합니다.
귀한 걸음 하시어 축복해 주시면
더없는 기쁨으로 간직하겠습니다.`,
  coverImage: "/images/5.jpg",
  gallery: [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/5.jpg",
    "/images/6.jpg",
  ],
};
