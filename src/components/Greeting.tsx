import type { Side } from "../config";

interface GreetingProps {
  message: string;
  groom: Side;
  bride: Side;
}

export default function Greeting({ message, groom, bride }: GreetingProps) {
  return (
    <section className="px-8 py-16 text-center">
      <p className="text-xs tracking-[0.3em] text-gray-500">INVITATION</p>
      <p className="mt-8 whitespace-pre-line leading-8 text-gray-700">
        {message}
      </p>
      <div className="mt-10 space-y-2 text-gray-700">
        <p>
          {groom.father.name} · {groom.mother.name}
          <span className="text-gray-400">의 아들</span> {groom.person.name}
        </p>
        <p>
          {bride.father.name} · {bride.mother.name}
          <span className="text-gray-400">의 딸</span> {bride.person.name}
        </p>
      </div>
    </section>
  );
}
