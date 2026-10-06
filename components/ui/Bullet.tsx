import Image from "next/image";
import type { ReactNode } from "react";

import dot from "@/public/images/dot.svg";

// Figma: Bullet (Dot wrap 6×14 + text)
export default function Bullet({ children, size = "s" }: { children: ReactNode; size?: "s" | "m" }) {
  return (
    <li className="flex items-start gap-[10px]">
      <Image src={dot} alt="" width={6} height={14} className={size === "m" ? "mt-[1px] h-[15px]" : ""} />
      <span className={`flex-1 text-ink-700 ${size === "m" ? "text-body-m" : "text-body-s"}`}>{children}</span>
    </li>
  );
}
