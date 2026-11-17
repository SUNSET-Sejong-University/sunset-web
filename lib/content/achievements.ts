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
  projectUrl: string;
  media: readonly AchievementImage[];
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

const scoopPhoto = {
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
  media: [scoopPhoto],
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
  description: { en: "LatchOps checks Git changes for risky repository states and proposes repeatable recovery plans. The event photo shows LatchOps announced in first place.", ko: "LatchOps는 Git 변경 과정에서 저장소의 위험 상태를 확인하고 반복 가능한 복구 계획을 제안합니다. 현장 사진에는 LatchOps를 1위로 발표한 화면이 담겨 있습니다." },
  media: [{
    src: "/images/achievements/latchops-daytona.webp", width: 1440, height: 810,
    alt: { en: "Participants on stage in front of a slide reading First Place, LatchOps", ko: "‘1st Place LatchOps’라고 적힌 발표 화면 앞에 선 참가자들" },
    credit: { en: "Daytona HackSprint Seoul · Photo supplied by the team", ko: "Daytona HackSprint Seoul · 팀 제공 사진" },
  }],
  sources: [{ label: { en: "Event listing · Daytona HackSprint Seoul", ko: "행사 안내 · Daytona HackSprint Seoul" }, url: "https://luma.com/daytonaseoul" }],
}, {
  id: "buildin-github-love-of-code",
  memberId: "prithwis-das",
  project: "BuildIn",
  event: "GitHub For the Love of Code",
  year: 2025,
  date: { en: "October 22, 2025", ko: "2025년 10월 22일" },
  award: { en: "Challenge Winner", ko: "챌린지 수상" },
  projectUrl: "https://github.com/SUNSET-Sejong-University/BuildIn",
  description: { en: "GitHub listed BuildIn among its hardware hack winners. The Arduino desk indicator uses colored lights to display GitHub Actions build status.", ko: "GitHub는 하드웨어 부문 수상작으로 BuildIn을 소개했습니다. 이 아두이노 기반 탁상용 장치는 색이 다른 LED로 GitHub Actions 빌드 상태를 보여 줍니다." },
  media: [
    {
      src: "/images/achievements/buildin-project.webp", width: 1024, height: 1024,
      alt: { en: "Four photos of the BuildIn breadboard showing blue, green, yellow, and red LEDs", ko: "파란색, 초록색, 노란색, 빨간색 LED가 켜진 BuildIn 브레드보드 사진 네 장" },
      credit: { en: "BuildIn project photos · The GitHub Blog", ko: "BuildIn 프로젝트 사진 · The GitHub Blog" },
    },
    {
      src: "/images/achievements/buildin-honors.webp", width: 882, height: 459,
      alt: { en: "Cropped honors entry recording the GitHub For the Love of Code win in October 2025", ko: "2025년 10월 GitHub For the Love of Code 수상을 기록한 프로필 화면 일부" },
      credit: { en: "Honors entry · Screenshot supplied by the member", ko: "수상 기록 · 구성원 제공 화면" },
    },
  ],
  sources: [
    { label: { en: "Challenge winners · The GitHub Blog", ko: "챌린지 수상 결과 · The GitHub Blog" }, url: "https://github.blog/open-source/from-karaoke-terminals-to-ai-resumes-the-winners-of-githubs-for-the-love-of-code-challenge/" },
    { label: { en: "Winner confirmation · GitHub Community", ko: "수상 확인 · GitHub Community" }, url: "https://github.com/orgs/community/discussions/166366" },
  ],
}, {
  id: "tolkyn-arduino-feature",
  memberId: "prithwis-das",
  project: "Tolkyn",
  event: "Arduino",
  year: 2026,
  date: { en: "January 1, 2026 (KST)", ko: "2026년 1월 1일 (한국 시간)" },
  award: { en: "Featured by Arduino", ko: "Arduino 공식 소개" },
  projectUrl: "https://www.instructables.com/Tolkyn-Turning-Invisible-Rhythm-Into-Living-Archit/",
  description: { en: "Prithwis Das built a wearable around the Arduino MKR WiFi 1010 that turns motion and sound into live visuals. Arduino featured it on its official account.", ko: "Prithwis Das는 움직임과 소리를 실시간 시각 표현으로 바꾸는 Arduino MKR WiFi 1010 기반 웨어러블을 제작했습니다. Arduino는 공식 계정에서 이 작품을 소개했습니다." },
  media: [{
    src: "/images/achievements/tolkyn-project.webp", width: 1076, height: 896,
    alt: { en: "Tolkyn’s wired wearable glasses in front of the live visualization on a laptop", ko: "실시간 시각화가 표시된 노트북 앞의 Tolkyn 웨어러블 안경과 연결 회로" },
    credit: { en: "Project image · Prithwis Das / Instructables", ko: "프로젝트 이미지 · Prithwis Das / Instructables" },
  }],
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
  photos: { en: "Project and event images", ko: "프로젝트 및 행사 이미지" },
} as const;
