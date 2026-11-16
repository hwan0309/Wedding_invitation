import { useState } from "react";
import { copyText } from "../utils/clipboard";

const SITE_URL = "https://wedding-invitation-eta-virid-85.vercel.app";

interface ShareProps {
  title: string;
  description: string;
}

export default function Share({ title, description }: ShareProps) {
  const [copied, setCopied] = useState(false);

  const handleKakaoShare = () => {
    const { Kakao } = window;
    if (!Kakao) return;
    if (!Kakao.isInitialized()) {
      Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
    }
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title,
        description,
        imageUrl: `${SITE_URL}/images/og.jpg`,
        link: { mobileWebUrl: SITE_URL, webUrl: SITE_URL },
      },
      buttons: [
        {
          title: "청첩장 보기",
          link: { mobileWebUrl: SITE_URL, webUrl: SITE_URL },
        },
      ],
    });
  };
  const handleCopyLink = async () => {
    await copyText(SITE_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <section className="px-8   pb-24 pt-8">
      <div className="grid grid-cols-2 gap-2 text-sm">
        <button
          type="button"
          onClick={handleKakaoShare}
          className="rounded-lg bg-yellow-300 py-3 font-medium text-gray-900"
        >
          카카오톡 공유하기
        </button>
        <button
          type="button"
          onClick={handleCopyLink}
          className="rounded-lg border border-gray-300 bg-white py-3   text-gray-700"
        >
          {copied ? "복사됨" : "링크 복사"}
        </button>
      </div>
    </section>
  );
}
