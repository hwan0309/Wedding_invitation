interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTitle({
  children,
  className = "",
}: SectionTitleProps) {
  return (
    <p className={`text-xs tracking-[0.3em] text-gray-500 ${className}`}>
      {children}
    </p>
  );
}
