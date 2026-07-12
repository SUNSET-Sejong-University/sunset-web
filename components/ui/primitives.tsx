export function StatusBadge({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "accent" | "warning";
}) {
  const toneClass =
    tone === "accent"
      ? "spec-badge spec-badge--accent"
      : tone === "warning"
        ? "spec-badge spec-badge--warning"
        : "spec-badge";

  return <span className={toneClass}>{label}</span>;
}
