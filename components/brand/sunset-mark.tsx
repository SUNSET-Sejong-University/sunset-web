import Image from "next/image";
import sunsetLockup from "@/public/brand/sunset-lockup.webp";
import sunsetSymbol from "@/public/brand/sunset-symbol.webp";
import sunsetWordmark from "@/public/brand/sunset-wordmark.webp";

export function SunsetMark({ lockup = false }: { lockup?: boolean }) {
  return <Image
    className={lockup ? "brand-lockup" : "brand-mark"}
    src={lockup ? sunsetLockup : sunsetSymbol}
    unoptimized
    alt={lockup ? "SUNSET Sejong" : ""}
  />;
}

/** Displays the original lettering from the supplied transparent logo. */
export function SunsetWordmark() {
  return <Image className="brand-wordmark" src={sunsetWordmark} alt="" aria-hidden="true" unoptimized />;
}
