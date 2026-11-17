import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import SectionTitle from "./SectionTitle";

interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //처음 목록
  useEffect(() => {
    supabase
      .from("guestbook")
      .select("id, name, message, created_at")
      .order("created_at", { ascending: false }) //최신글이 위
      .limit(50)
      .then(({ data, error }) => {
        if (error) setError("방명록을 불러오지 못했어요.");
        else setEntries(data ?? []);
        setLoading(false);
      });
  }, []);

  //글 남기기
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    setError(null);

    const { data, error } = await supabase
      .from("guestbook")
      .insert({ name: name.trim(), message: message.trim() })
      .select()
      .single();

    setSubmitting(false);

    if (error) {
      setError("글을 남기지 못했어요. 다시 시도해 주세요.");
      return;
    }

    setEntries((prev) => [data, ...prev]);
    setName("");
    setMessage("");
  };

  return (
    <section className="bg-white px-8 py-16">
      <div className="text-center">
        <SectionTitle>GUESTBOOK</SectionTitle>
        <p className="mt-4 text-sm text-gray-500">축하의 마음을 남겨주세요</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          maxLength={20}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="축하 메시지"
          maxLength={300}
          rows={3}
          className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{message.length} / 300</span>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-rose-400 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            {submitting ? "남기는 중..." : "남기기"}
          </button>
        </div>
      </form>
      {error && (
        <p className="mt-4 text-center text-sm text-red-500">{error}</p>
      )}
      <div className="mt-8 space-y-3">
        {loading && (
          <p className="text-center text-sm text-gray-400">불러오는 중 ...</p>
        )}
        {!loading && entries.length === 0 && (
          <p className="text-center text-sm text-gray-400">
            첫 번째 축하 메시지를 남겨주세요
          </p>
        )}
        {entries.map((entry) => (
          <div key={entry.id} className="rounded-lg bg-rose-50 px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-800">{entry.name}</p>
              <p className="text-xs text-gray-400">
                {new Date(entry.created_at).toLocaleDateString("ko-KR")}
              </p>
            </div>
            <p className="mt-1 whitespace-pre-line text-sm text-gray-600">
              {entry.message}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
