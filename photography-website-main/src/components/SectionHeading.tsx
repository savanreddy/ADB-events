interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-5 text-[0.7rem] font-medium tracking-[0.3em] text-gold/90 uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl leading-[1.12] font-normal tracking-tight text-balance text-cream sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-pretty text-stone/85">{subtitle}</p>
      )}
    </div>
  );
}
