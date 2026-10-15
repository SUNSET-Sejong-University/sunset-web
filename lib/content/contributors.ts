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
    githubUsername: "azizbekdevuz",
    githubUrl: "https://github.com/azizbekdevuz",
    linkedinUrl: "https://www.linkedin.com/in/azizbek-arzikulov",
    role: {
      en: "Section Lead · Full-Stack Development / Engineering",
      ko: "섹션 리드 · 풀스택 개발 / 엔지니어링",
    },
    projectSlugs: [],
  },
  {
    id: "odina-yusupova",
    displayName: "Odina Yusupova",
    githubUsername: "",
    githubUrl: "",
    role: { en: "Section Lead · Business", ko: "섹션 리드 · 비즈니스" },
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
  return contributors.filter((c: Contributor) => c.projectSlugs.includes(slug));
}
