import type { LocalizedStrings } from "@/lib/content/types";

export const visualCopy = {
  mapTitle: { en: "One collective. Six starting points.", ko: "하나의 공동체, 여섯 가지 출발점." },
  mapHint: { en: "Follow a pathway to explore its focus.", ko: "관심 있는 경로를 따라 분야를 살펴보세요." },
  companyScope: { en: "Company capabilities", ko: "기업의 사업 분야" },
  showcase: { en: "Partner & sponsor showcase", ko: "파트너 및 후원사 쇼케이스" },
  previous: { en: "Previous organization", ko: "이전 기업" },
  next: { en: "Next organization", ko: "다음 기업" },
  directory: { en: "Organization directory", ko: "기업 목록" },
  pipeline: { en: "Inside GitGuard Agent", ko: "GitGuard Agent의 내부 흐름" },
  pipelineHint: { en: "Explore the five analysis stages in the project’s SpoonOS graph.", ko: "프로젝트의 SpoonOS 그래프를 구성하는 다섯 분석 단계를 살펴보세요." },
  codeSource: { en: "Implementation source · graph.py", ko: "구현 소스 · graph.py" },
  stage: { en: "Stage", ko: "단계" },
} satisfies Record<string, LocalizedStrings>;

export const companyCapabilities = {
  partner: [
    { en: "PCB fabrication", ko: "PCB 제작" },
    { en: "Assembly", ko: "조립" },
    { en: "Digital fabrication", ko: "디지털 제작" },
  ],
  sponsor: [
    { en: "Device tools", ko: "기기 개발 도구" },
    { en: "App development", ko: "앱 개발" },
    { en: "Cloud APIs", ko: "클라우드 API" },
  ],
} as const;

// Exact node order verified in the canonical repository's apps/agent/graph.py.
export const gitguardianPipelineSource = "https://github.com/azizbekdevuz/gitguardian/blob/main/apps/agent/graph.py";
export const gitguardianStages = [
  { id: "detect_issue", title: { en: "Detect", ko: "문제 감지" }, description: { en: "Identify the Git issue in the repository snapshot.", ko: "저장소 스냅샷에서 Git 문제를 식별합니다." } },
  { id: "build_graph", title: { en: "Map", ko: "구조 파악" }, description: { en: "Build a view of the repository’s Git graph.", ko: "저장소의 Git 그래프 구조를 구성합니다." } },
  { id: "extract_conflicts", title: { en: "Extract", ko: "충돌 추출" }, description: { en: "Extract conflict information for analysis.", ko: "분석에 필요한 충돌 정보를 추출합니다." } },
  { id: "collect_signals", title: { en: "Gather", ko: "단서 수집" }, description: { en: "Collect repository signals to inform the analysis.", ko: "분석을 위한 저장소의 단서를 수집합니다." } },
  { id: "generate_analysis", title: { en: "Analyze", ko: "분석 생성" }, description: { en: "Generate an analysis from the collected repository context.", ko: "수집한 저장소 맥락을 바탕으로 분석을 생성합니다." } },
] as const;
