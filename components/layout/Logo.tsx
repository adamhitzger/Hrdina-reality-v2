import Image from "next/image";
import Link from "next/link";

import hrMark from "@/public/images/hr-mark.png";

export default function Logo() {
  return (
    <Link href="/" aria-label="Hrdina Reality – úvodní stránka" className="flex items-center gap-[9px] lg:gap-3">
      <Image src={hrMark} alt="" priority className="h-[22px] w-[32px] object-contain lg:h-[30px] lg:w-[44px]" />
      <span className="text-[12px] leading-4 font-semibold tracking-[1.6px] text-navy-900 uppercase whitespace-nowrap lg:text-[14px] lg:leading-5 lg:tracking-[2.2px]">
        Hrdina Reality
      </span>
    </Link>
  );
}
