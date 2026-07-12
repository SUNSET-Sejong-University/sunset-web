import type { Contributor } from "@/lib/content/types";

export const contributors = [
  {
    id: "prithwis-das",
    displayName: "Prithwis Das",
    githubUsername: "Prithwis-2023",
    githubUrl: "https://github.com/Prithwis-2023",
    role: { en: "Founding contributor", ko: "Founding contributor" },
    projectSlugs: ["buildin"],
  },
  {
    id: "azizbek-arzikulov",
    displayName: "Azizbek Arzikulov",
    githubUsername: "",
    githubUrl: "",
    role: { en: "Organization member", ko: "Organization member" },
    projectSlugs: [],
  },
  {
    id: "basnet-prashant",
    displayName: "Basnet Prashant",
    githubUsername: "",
    githubUrl: "",
    role: { en: "GRIP-5", ko: "GRIP-5" },
    projectSlugs: ["grip-5"],
  },
  {
    id: "kang-naeon",
    displayName: "Kang Naeon",
    githubUsername: "",
    githubUrl: "",
    role: { en: "NaeonAir", ko: "NaeonAir" },
    projectSlugs: ["naeonair-wisdrone"],
  },
  {
    id: "choi-hyong-chan",
    displayName: "Choi Hyong Chan",
    githubUsername: "strughyhchan",
    githubUrl: "https://github.com/strughyhchan",
    role: { en: "NaeonAir · MoodFlix", ko: "NaeonAir · MoodFlix" },
    projectSlugs: ["naeonair-wisdrone", "moodflix"],
  },
  {
    id: "shipulin-arslan",
    displayName: "Shipulin Arslan",
    githubUsername: "",
    githubUrl: "",
    role: { en: "MoodFlix", ko: "MoodFlix" },
    projectSlugs: ["moodflix"],
  },
  {
    id: "myint-myat-aung",
    displayName: "Myint Myat Aung",
    githubUsername: "",
    githubUrl: "",
    role: { en: "MoodFlix", ko: "MoodFlix" },
    projectSlugs: ["moodflix"],
  },
  {
    id: "choe-jong-u",
    displayName: "최종우",
    githubUsername: "",
    githubUrl: "",
    role: { en: "Intellichair", ko: "Intellichair" },
    projectSlugs: ["intellichair"],
  },
] satisfies readonly Contributor[];

export function getSortedContributors() {
  return [...contributors].sort((a, b) =>
    a.displayName.localeCompare(b.displayName, "en"),
  );
}

export function getContributorsForProject(slug: string) {
  return contributors.filter((c) => c.projectSlugs.includes(slug));
}
