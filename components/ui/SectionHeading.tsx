import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Obsah vpravo na desktopu (lead nebo tlačítko) – Figma „Section head“ */
  aside?: ReactNode;
  tone?: "light" | "dark";
  titleClassName?: string;
};

export default function SectionHeading({ eyebrow, title, lead, aside, tone = "light", titleClassName = "lg:max-w-[620px]" }: Props) {
  const dark = tone === "dark";
  return (
    <div data-reveal className="flex flex-col gap-[14px] lg:flex-row lg:items-end lg:justify-between lg:gap-10">
      <div className="flex flex-col gap-[14px] lg:gap-4">
        <p className={`text-label-s lg:text-label-m ${dark ? "text-brass-300" : "text-brass-500"}`}>{eyebrow}</p>
        <h2 className={`text-heading-s lg:text-display-l ${dark ? "text-surface-0" : "text-ink-900"} ${titleClassName}`}>{title}</h2>
        {lead && <div className="text-body-m text-ink-500 lg:mt-0.5 lg:max-w-[620px] lg:text-body-l">{lead}</div>}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}
