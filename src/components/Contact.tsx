import type { Person, Side } from "../config";
import SectionTitle from "./SectionTitle";

function ContactRow({ label, person }: { label: string; person: Person }) {
  const phone = person.phone.replace(/-/g, "");

  return (
    <div className="flex items-center justify-between py-3">
      <p className="text-gray-700">
        <span className="mr-2 text-sm text-gray-400">{label}</span>
        {person.name}
      </p>
      <div className="flex gap-2">
        <a
          href={`tel:${phone}`}
          className="rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-600"
        >
          전화
        </a>
        <a
          href={`sms:${phone}`}
          className="rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-600"
        >
          문자
        </a>
      </div>
    </div>
  );
}

interface ContactProps {
  groom: Side;
  bride: Side;
}

export default function Contact({ groom, bride }: ContactProps) {
  return (
    <section className="bg-gray-50 px-8 py-16">
      <div className="text-center">
        <SectionTitle>CONTACT</SectionTitle>
      </div>

      <div className="mt-8">
        <p className="text-sm font medium text-gray-500">신랑측</p>
        <div className="divide-y divide-gray-200">
          <ContactRow label="신랑" person={groom.person} />
          <ContactRow label="아버지" person={groom.father} />
          <ContactRow label="어머니" person={groom.mother} />
        </div>
      </div>
      <div className="mt-8">
        <p className="text-sm font medium text-gray-500">신부측</p>
        <div className="divide-y divide-gray-200">
          <ContactRow label="신부" person={bride.person} />
          <ContactRow label="아버지" person={bride.father} />
          <ContactRow label="어머니" person={bride.mother} />
        </div>
      </div>
    </section>
  );
}
