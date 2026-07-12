export const aboutFeaturedContributorIds = [
  "prithwis-das",
  "azizbek-arzikulov",
  "basnet-prashant",
  "kang-naeon",
  "choi-hyong-chan",
  "shipulin-arslan",
  "myint-myat-aung",
  "choe-jong-u",
] as const;

export function getContributorInitials(displayName: string): string {
  const trimmed = displayName.trim();
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2 && /^[A-Za-z]/.test(parts[0] ?? "")) {
    const first = parts[0]?.[0] ?? "";
    const last = parts[parts.length - 1]?.[0] ?? "";
    return `${first}${last}`.toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}
