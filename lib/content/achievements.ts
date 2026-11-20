import { contributors } from "@/lib/content/contributors";
import type { LocalizedStrings } from "@/lib/content/types";

type Achievement = {
  id: string;
  memberId: string;
  additionalCredits?: readonly ({ kind: "member"; memberId: string } | { kind: "name"; name: string })[];
  project: string;
  event: string;
  year: number;
  date: LocalizedStrings;
  award: LocalizedStrings;
  projectUrl: string;
  description: LocalizedStrings;
  sources: readonly { label: LocalizedStrings; url: string }[];
};

type AchievementImage = {
  src: string;
  width: number;
  height: number;
  alt: LocalizedStrings;
  credit: LocalizedStrings;
};

export const achievementFeaturePhoto = {
  src: "/images/achievements/seoul-bowl.webp", width: 1440, height: 960,
  alt: { en: "The GitGuardian team holding its prize board at Seoul Bowl", ko: "Seoul Bowl에서 수상 보드를 들고 있는 GitGuardian 팀" },
  credit: { en: "Seoul Bowl · Photo supplied by the team", ko: "Seoul Bowl · 팀 제공 사진" },
} satisfies AchievementImage;

export const achievements: readonly Achievement[] = [{
  id: "gitguardian-seoul-bowl-2025",
  memberId: "azizbek-arzikulov",
  project: "GitGuardian / GitGuard Agent",
  event: "Scoop AI Hackathon — Seoul Bowl",
  year: 2025,
  date: { en: "December 20–21, 2025", ko: "2025년 12월 20–21일" },
  award: { en: "Track Winner", ko: "트랙 우승 · Track Winner" },
  projectUrl: "https://github.com/azizbekdevuz/gitguardian",
  description: { en: "Azizbek Arzikulov’s GitGuardian / GitGuard Agent project was recognized as a track winner at the 2025 Seoul Bowl. The project explores AI-assisted recovery from Git issues, including merge conflicts and interrupted rebases.", ko: "Azizbek Arzikulov의 GitGuardian / GitGuard Agent 프로젝트가 2025년 Seoul Bowl에서 트랙 우승을 차지했습니다. 병합 충돌, 중단된 리베이스 등의 Git 문제에서 AI를 활용한 복구를 탐구하는 프로젝트입니다." },
  sources: [
    { label: { en: "Event & award categories · organizer", ko: "행사 및 시상 부문 · 주최 측" }, url: "https://luma.com/hzx0ffcg" },
    { label: { en: "Project listing · SpoonOS community", ko: "프로젝트 목록 · SpoonOS 커뮤니티" }, url: "https://github.com/XSpoonAi/SpoonCommunity" },
    { label: { en: "Winners report · Neo News Today", ko: "수상 결과 보도 · Neo News Today" }, url: "https://neonewstoday.com/ai/neo-and-spoonos-announce-winners-of-scoop-ai-hackathon-seoul-bowl/" },
    { label: { en: "Winners recap · Neo News Today", ko: "수상 결과 요약 · Neo News Today" }, url: "https://neonewstoday.com/week-in-review/neo-news-week-in-review-december-22-december-28/" },
  ],
}, {
  id: "latchops-daytona",
  memberId: "azizbek-arzikulov",
  project: "LatchOps",
  event: "Daytona HackSprint Seoul",
  year: 2026,
  date: { en: "September 19, 2026", ko: "2026년 9월 19일" },
  award: { en: "First Place", ko: "1위" },
  projectUrl: "https://github.com/azizbekdevuz/LatchOps",
  description: { en: "LatchOps checks Git changes for risky repository states and proposes repeatable recovery plans. The project won first place at Daytona HackSprint Seoul.", ko: "LatchOps는 Git 변경 과정에서 저장소의 위험 상태를 확인하고 반복 가능한 복구 계획을 제안합니다. Daytona HackSprint Seoul에서 1위를 수상했습니다." },
  sources: [{ label: { en: "Event listing · Daytona HackSprint Seoul", ko: "행사 안내 · Daytona HackSprint Seoul" }, url: "https://luma.com/daytonaseoul" }],
}, {
  id: "buildin-github-love-of-code",
  additionalCredits: [{ kind: "name", name: "Ryan" }],
  memberId: "prithwis-das",
  project: "BuildIn",
  event: "GitHub For the Love of Code",
  year: 2025,
  date: { en: "October 22, 2025", ko: "2025년 10월 22일" },
  award: { en: "Challenge Winner", ko: "챌린지 수상" },
  projectUrl: "https://github.com/SUNSET-Sejong-University/BuildIn",
  description: { en: "GitHub listed BuildIn among its hardware hack winners. The Arduino desk indicator uses colored lights to display GitHub Actions build status.", ko: "GitHub는 하드웨어 부문 수상작으로 BuildIn을 소개했습니다. 이 아두이노 기반 탁상용 장치는 색이 다른 LED로 GitHub Actions 빌드 상태를 보여 줍니다." },
  sources: [
    { label: { en: "Challenge winners · The GitHub Blog", ko: "챌린지 수상 결과 · The GitHub Blog" }, url: "https://github.blog/open-source/from-karaoke-terminals-to-ai-resumes-the-winners-of-githubs-for-the-love-of-code-challenge/" },
    { label: { en: "Winner confirmation · GitHub Community", ko: "수상 확인 · GitHub Community" }, url: "https://github.com/orgs/community/discussions/166366" },
  ],
}, {
  id: "tolkyn-arduino-feature",
  additionalCredits: [{ kind: "member", memberId: "myint-myat-aung" }],
  memberId: "prithwis-das",
  project: "Tolkyn",
  event: "Arduino",
  year: 2026,
  date: { en: "January 1, 2026 (KST)", ko: "2026년 1월 1일 (한국 시간)" },
  award: { en: "Featured by Arduino", ko: "Arduino 공식 소개" },
  projectUrl: "https://www.instructables.com/Tolkyn-Turning-Invisible-Rhythm-Into-Living-Archit/",
  description: { en: "Prithwis Das and Myint Myat Aung’s wearable project uses the Arduino MKR WiFi 1010 to turn motion and sound into live visuals. Arduino featured it on its official account.", ko: "Prithwis Das와 Myint Myat Aung의 웨어러블 프로젝트는 Arduino MKR WiFi 1010으로 움직임과 소리를 실시간 시각 표현으로 바꿉니다. Arduino는 공식 계정에서 이 작품을 소개했습니다." },
  sources: [{ label: { en: "Project feature · Arduino on X", ko: "프로젝트 소개 · Arduino 공식 X" }, url: "https://x.com/arduino/status/2006397902675980329" }],
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
} as const;
