export const GITHUB_ORG = "SUNSET-Sejong-University" as const;

export const GITHUB_ORG_URL = `https://github.com/${GITHUB_ORG}` as const;

export const EXCLUDED_REPOSITORIES = [
  "dummy-files",
  "pixel-231a6fa7a5be46149da33813796eea22",
] as const;

export function repoUrl(name: string): string {
  return `${GITHUB_ORG_URL}/${name}`;
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) {
    return configured.replace(/\/$/, "");
  }
  return "http://localhost:3000";
}
