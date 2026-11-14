import { useState } from "react";
import type { Account, Side } from "../config";
import { copyText } from "../utils/clipboard";
import SectionTitle from "./SectionTitle";

function AccountRow({ account }: { account: Account }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyText(`${account.bank} ${account.number}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 500);
  };

  return (
    <div className="flex item-center justify-between py-3">
      <div className="text-left">
        <p className="text-sm text-gray-400">
          {account.label} · {account.holder}
        </p>
        <p className="text-gray-700">
          {account.bank} · {account.number}
        </p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-600"
      >
        {copied ? "복사됨" : "복사"}
      </button>
    </div>
  );
}

//접기/펼치기 그룹
function AccountGroup({
  title,
  accounts,
}: {
  title: string;
  accounts: Account[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-white">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3 text-gray-700"
      >
        <span>{title}</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ⌄
        </span>
      </button>
      {open && (
        <div className="divide-y divide-gray-100 border-t border-gray-200 px-4">
          {accounts.map((account) => (
            <AccountRow key={account.number} account={account} />
          ))}
        </div>
      )}
    </div>
  );
}

interface AccountSectionProps {
  groom: Side;
  bride: Side;
}

export default function AccountSection({ groom, bride }: AccountSectionProps) {
  return (
    <section className="px-8 py-16 text-center">
      <SectionTitle>ACCOUNT</SectionTitle>
      <p className="mt-4 text-sm text-gray-500">마음 전하실 곳</p>
      <AccountGroup
        title="신랑측 계좌번호"
        accounts={groom.accounts}
      ></AccountGroup>
      <AccountGroup
        title="신부측 계좌번호"
        accounts={bride.accounts}
      ></AccountGroup>
    </section>
  );
}
