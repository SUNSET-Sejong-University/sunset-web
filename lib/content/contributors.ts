import type { Contributor } from "@/lib/content/types";

export const contributors: readonly Contributor[] = [
  {
    id: "prithwis-das",
    displayName: "Prithwis Das",
    linkedinUrl: "https://www.linkedin.com/in/prithwis-das/",
    githubUsername: "Prithwis-2023",
    githubUrl: "https://github.com/Prithwis-2023",
    founder: true,
    projectSlugs: ["buildin"],
  },
  {
    id: "azizbek-arzikulov",
    displayName: "Azizbek Arzikulov",
    founder: true,
    githubUsername: "azizbekdevuz",
    githubUrl: "https://github.com/azizbekdevuz",
    linkedinUrl: "https://www.linkedin.com/in/azizbek-arzikulov",
    role: {
      en: "Section Lead · Full Stack Web Development / Engineering",
      ko: "섹션 리드 · 풀스택 웹 개발 / 엔지니어링",
    },
    projectSlugs: [],
  },
  {
    id: "odina-yusupova",
    linkedinUrl: "https://www.linkedin.com/in/odinabonu-yusupova-809534316",
    displayName: "Odina Yusupova",
    githubUsername: "",
    githubUrl: "",
    founder: true,
    role: { en: "Business & Marketing", ko: "비즈니스 및 마케팅" },
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
    founder: true,
    linkedinUrl: "https://www.linkedin.com/in/%ED%98%95%EC%B0%AC-%EC%B5%9C-a5267b3a1/",
    displayName: "Choi Hyong Chan",
    githubUsername: "strughyhchan",
    githubUrl: "https://github.com/strughyhchan",
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
    linkedinUrl: "https://www.linkedin.com/in/myint-myat-aung-457141255/",
    displayName: "Myint Myat Aung",
    githubUsername: "",
    githubUrl: "",
    role: { en: "MoodFlix", ko: "MoodFlix" },
    projectSlugs: ["moodflix"],
  },
  {
    id: "kim-min-ung",
    displayName: "Kim Min Ung",
    githubUsername: "",
    githubUrl: "",
    role: { en: "Creative Arts", ko: "창작 예술" },
    projectSlugs: [],
  },
  {
    id: "adalat-alizada",
    displayName: "Adalat Alizada",
    githubUsername: "",
    githubUrl: "",
    projectSlugs: [],
  },
  {
    id: "choe-jong-u",
    displayName: "최종우",
    githubUsername: "",
    githubUrl: "",
    founder: true,
    role: { en: "HR", ko: "인사 (HR)" },
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
