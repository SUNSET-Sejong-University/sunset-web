export function SunsetChipMark({ className = "brand-mark" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="9" y="9" width="14" height="14" rx="1.5" stroke="var(--copper, #d97a4d)" strokeWidth="1.6" />
      <circle cx="16" cy="16" r="2.6" fill="var(--phosphor, #9fffa3)" />
      <path
        d="M9 13H4M9 19H4M28 13H23M28 19H23M13 9V4M19 9V4M13 28V23M19 28V23"
        stroke="var(--via-bright, #3a4a3f)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
