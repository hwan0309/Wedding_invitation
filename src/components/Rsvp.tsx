import { useState } from "react";
import { supabase } from "../lib/supabase";
import SectionTitle from "./SectionTitle";

type GuestSide = "groom" | "bride";
type Meal = "yes" | "no" | "undecided";

function Choice({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-lg border py-2 text-sm ${
        selected
          ? "border-rose-400 bg-rose-400 text-white"
          : "border-gray-300 bg-white text-gray-600"
      }`}
    >
      {children}
    </button>
  );
}

export default function Rsvp() {
  const [name, setName] = useState("");
  const [side, setSide] = useState<GuestSide>("groom");
  const [attending, setAttending] = useState(true);
  const [guestCount, setGuestCount] = useState(1);
  const [meal, setMeal] = useState<Meal>("undecided");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("이름을 입력해 주세요.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const { error } = await supabase.from("rsvp").insert({
      name: name.trim(),
      side,
      attending,
      guest_count: attending ? guestCount : 1, // 불참이면 인원은 의미 없으니 1
      meal: attending ? meal : "no",
    });

    setSubmitting(false);

    if (error) {
      setError("전송하지 못했어요. 다시 시도해 주세요.");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="px-8 py-16 text-center">
        <SectionTitle>RSVP</SectionTitle>
        <p className="mt-8 text-gray-700">응답해 주셔서 감사합니다.</p>
        <p className="mt-1 text-sm text-gray-500">
          {attending ? "그날 뵙겠습니다 :)" : "마음만으로도 감사합니다."}
        </p>
      </section>
    );
  }

  return (
    <section className="px-8 py-16">
      <div className="text-center">
        <SectionTitle>RSVP</SectionTitle>
        <p className="mt-4 text-sm text-gray-500">
          참석 여부를 미리 알려주시면 준비에 큰 도움이 됩니다
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <p className="mb-2 text-sm text-gray-500">구분</p>
          <div className="flex gap-2">
            <Choice
              selected={side === "groom"}
              onClick={() => setSide("groom")}
            >
              신랑측
            </Choice>
            <Choice
              selected={side === "bride"}
              onClick={() => setSide("bride")}
            >
              신부측
            </Choice>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-500">참석 여부</p>
          <div className="flex gap-2">
            <Choice selected={attending} onClick={() => setAttending(true)}>
              참석
            </Choice>
            <Choice selected={!attending} onClick={() => setAttending(false)}>
              불참
            </Choice>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-500">성함</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            maxLength={20}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
          />
        </div>

        {/* 참석일 때만 인원·식사 묻기 */}
        {attending && (
          <>
            <div>
              <p className="mb-2 text-sm text-gray-500">
                참석 인원 (본인 포함)
              </p>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}명
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-2 text-sm text-gray-500">식사 여부</p>
              <div className="flex gap-2">
                <Choice
                  selected={meal === "yes"}
                  onClick={() => setMeal("yes")}
                >
                  예정
                </Choice>
                <Choice selected={meal === "no"} onClick={() => setMeal("no")}>
                  안 함
                </Choice>
                <Choice
                  selected={meal === "undecided"}
                  onClick={() => setMeal("undecided")}
                >
                  미정
                </Choice>
              </div>
            </div>
          </>
        )}

        {error && <p className="text-center text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-rose-400 py-3 text-sm font-medium text-white disabled:opacity-50"
        >
          {submitting ? "보내는 중..." : "참석 여부 전달하기"}
        </button>
      </form>
    </section>
  );
}
