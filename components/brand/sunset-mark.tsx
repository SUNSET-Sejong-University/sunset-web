import Image from "next/image";
import sunsetLockup from "@/public/brand/sunset-lockup.webp";
import sunsetSymbol from "@/public/brand/sunset-symbol.webp";

export function SunsetMark({ lockup = false }: { lockup?: boolean }) {
  return <Image
    className={lockup ? "brand-lockup" : "brand-mark"}
    src={lockup ? sunsetLockup : sunsetSymbol}
    width={lockup ? 420 : 128}
    height={lockup ? 365 : 128}
    alt={lockup ? "SUNSET Sejong" : ""}
  />;
}
