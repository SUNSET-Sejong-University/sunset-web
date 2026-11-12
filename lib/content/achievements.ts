import { contributors } from "@/lib/content/contributors";
import type { LocalizedStrings } from "@/lib/content/types";

type Achievement = {
  id: string;
  memberId: string;
  project: string;
  event: string;
  year: number;
  date: LocalizedStrings;
  award: LocalizedStrings;
  repository: string;
  description: LocalizedStrings;
  sources: readonly { label: LocalizedStrings; url: string }[];
};

export const achievements: readonly Achievement[] = [{
  id: "gitguardian-seoul-bowl-2025",
  memberId: "azizbek-arzikulov",
  project: "GitGuardian / GitGuard Agent",
  event: "Scoop AI Hackathon — Seoul Bowl",
  year: 2025,
  date: { en: "December 20–21, 2025", ko: "2025년 12월 20–21일" },
  award: { en: "Track Winner", ko: "트랙 우승 · Track Winner" },
  repository: "https://github.com/azizbekdevuz/gitguardian",
  description: { en: "Azizbek Arzikulov’s GitGuardian / GitGuard Agent project was recognized as a track winner at the 2025 Seoul Bowl. The project explores AI-assisted recovery from Git issues, including merge conflicts and interrupted rebases.", ko: "Azizbek Arzikulov의 GitGuardian / GitGuard Agent 프로젝트가 2025년 Seoul Bowl에서 트랙 우승을 차지했습니다. 병합 충돌, 중단된 리베이스 등의 Git 문제에서 AI를 활용한 복구를 탐구하는 프로젝트입니다." },
  sources: [
    { label: { en: "Event & award categories · organizer", ko: "행사 및 시상 부문 · 주최 측" }, url: "https://luma.com/hzx0ffcg" },
    { label: { en: "Project listing · SpoonOS community", ko: "프로젝트 목록 · SpoonOS 커뮤니티" }, url: "https://github.com/XSpoonAi/SpoonCommunity" },
    { label: { en: "Winners report · Neo News Today", ko: "수상 결과 보도 · Neo News Today" }, url: "https://neonewstoday.com/ai/neo-and-spoonos-announce-winners-of-scoop-ai-hackathon-seoul-bowl/" },
    { label: { en: "Winners recap · Neo News Today", ko: "수상 결과 요약 · Neo News Today" }, url: "https://neonewstoday.com/week-in-review/neo-news-week-in-review-december-22-december-28/" },
  ],
}];

export function achievementMember(memberId: string) {
  const person = contributors.find((entry) => entry.id === memberId);
  if (!person) throw new Error(`Unknown achievement member: ${memberId}`);
  return person;
}

export const achievementCopy = {
  member: { en: "Member achievement", ko: "구성원 성과" },
  project: { en: "Explore the project", ko: "프로젝트 살펴보기" },
  evidence: { en: "Sources & context", ko: "출처 및 맥락" },
  note: { en: "This is a member project achievement. The award is Track Winner; no specific technical track is attributed. PRISM received overall first place.", ko: "구성원 프로젝트의 성과입니다. 수상 명칭은 Track Winner이며, 특정 기술 트랙은 명시하지 않습니다. 대회 전체 1위는 PRISM입니다." },
} as const;
