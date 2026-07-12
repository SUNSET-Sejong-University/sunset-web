import type { TimelineEvent } from "@/lib/content/types";

export const timelineEvents = [
  {
    id: "org-first-commits",
    date: "2024",
    type: "milestone",
    title: {
      en: "First commits in the organization",
      ko: "조직의 첫 커밋",
    },
    description: {
      en: "GitHub activity: owner-confirmed year of earliest organizational commits.",
      ko: "GitHub 활동: 소유자가 확인한 조직 최초 커밋 연도.",
    },
  },
  {
    id: "buildin-created",
    date: "2025-09-06",
    type: "repo-created",
    repository: "BuildIn",
    projectSlug: "buildin",
    title: {
      en: "BuildIn repository created",
      ko: "BuildIn 저장소 생성",
    },
    description: {
      en: "GitHub activity: public repository BuildIn was created.",
      ko: "GitHub 활동: 공개 저장소 BuildIn이 생성됨.",
    },
  },
  {
    id: "wisdrone-interface-created",
    date: "2026-01-27",
    type: "repo-created",
    repository: "wisdrone-interface",
    projectSlug: "naeonair-wisdrone",
    title: {
      en: "wisdrone-interface repository created",
      ko: "wisdrone-interface 저장소 생성",
    },
    description: {
      en: "GitHub activity: monitoring interface repository added to the NaeonAir/WisDrone work.",
      ko: "GitHub 활동: NaeonAir/WisDrone 작업에 모니터링 인터페이스 저장소 추가.",
    },
  },
  {
    id: "wisdrone-ai-drone-created",
    date: "2026-01-28",
    type: "repo-created",
    repository: "wisdrone-ai-drone",
    projectSlug: "naeonair-wisdrone",
    title: {
      en: "wisdrone-ai-drone repository created",
      ko: "wisdrone-ai-drone 저장소 생성",
    },
    description: {
      en: "GitHub activity: AI server component repository added; inference remains incomplete.",
      ko: "GitHub 활동: AI 서버 구성요소 저장소 추가; 추론은 미완성 상태.",
    },
  },
  {
    id: "grip-5-created",
    date: "2026-05-08",
    type: "repo-created",
    repository: "GRIP-5",
    projectSlug: "grip-5",
    title: {
      en: "GRIP-5 repository created",
      ko: "GRIP-5 저장소 생성",
    },
    description: {
      en: "GitHub activity: gesture-responsive prosthetic-hand prototype repository created.",
      ko: "GitHub 활동: 제스처 반응형 의수 손 프로토타입 저장소 생성.",
    },
  },
  {
    id: "grip-5-updated",
    date: "2026-06-15",
    type: "repo-updated",
    repository: "GRIP-5",
    projectSlug: "grip-5",
    title: {
      en: "GRIP-5 repository updated",
      ko: "GRIP-5 저장소 업데이트",
    },
    description: {
      en: "GitHub activity: latest observed push to GRIP-5.",
      ko: "GitHub 활동: GRIP-5에 관찰된 최근 푸시.",
    },
  },
] as const satisfies readonly TimelineEvent[];

export function getSortedTimelineEvents(): TimelineEvent[] {
  return [...timelineEvents].sort((a, b) => b.date.localeCompare(a.date));
}

export function getRecentTimelineEvents(limit = 4): TimelineEvent[] {
  return getSortedTimelineEvents().slice(0, limit);
}
