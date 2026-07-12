import type { Locale } from "@/lib/i18n/locales";

export type HomeFeaturedCard = {
  slug: string;
  repoUrl: string;
  langDot: string;
  statusLine: Record<Locale, string>;
  tags: readonly string[];
  specRows: readonly { label: string; value: Record<Locale, string> }[];
  footLeft: Record<Locale, string>;
};

export const homeFeaturedSlugs = [
  "grip-5",
  "moodflix",
  "naeonair-wisdrone",
  "intellichair",
  "tolqyn",
  "aura",
] as const;

export const homeFeaturedCards: readonly HomeFeaturedCard[] = [
  {
    slug: "grip-5",
    repoUrl: "https://github.com/SUNSET-Sejong-University/GRIP-5",
    langDot: "#3572A5",
    statusLine: { en: "Python · ★ 5", ko: "Python · ★ 5" },
    tags: ["MediaPipe CV", "Arduino", "Robotics"],
    specRows: [
      {
        label: "geometry",
        value: {
          en: "vector dot-product → arccos → degrees, per joint",
          ko: "벡터 내적 → arccos → 관절별 각도",
        },
      },
      {
        label: "smoothing",
        value: { en: "EMA on host + easing on MCU (two-stage)", ko: "호스트 EMA + MCU 이징 (2단)" },
      },
      {
        label: "link",
        value: {
          en: "serial or UDP transport, quantized 0–9 digit string",
          ko: "시리얼/UDP, 0–9 양자화 문자열",
        },
      },
    ],
    footLeft: { en: "GPL-3.0", ko: "GPL-3.0" },
  },
  {
    slug: "moodflix",
    repoUrl: "https://github.com/SUNSET-Sejong-University/MoodFlix",
    langDot: "#f1e05a",
    statusLine: { en: "JavaScript · ★ 2", ko: "JavaScript · ★ 2" },
    tags: ["React", "Jetson", "LLM"],
    specRows: [
      {
        label: "protocol",
        value: { en: "custom MFNP schema between client and server", ko: "클라이언트-서버 MFNP 스키마" },
      },
      {
        label: "inference",
        value: { en: "local Ollama LLM + ML classifier on Jetson", ko: "Jetson Ollama LLM + ML 분류기" },
      },
      {
        label: "enrichment",
        value: { en: "TMDB lookups, geolocation + weather context", ko: "TMDB, 위치/날씨 컨텍스트" },
      },
    ],
    footLeft: { en: "99 commits", ko: "99 commits" },
  },
  {
    slug: "naeonair-wisdrone",
    repoUrl: "https://github.com/SUNSET-Sejong-University/NaeonAir",
    langDot: "#f1e05a",
    statusLine: { en: "JavaScript · MIT", ko: "JavaScript · MIT" },
    tags: ["ESP-CAM", "UAV", "IoT"],
    specRows: [
      {
        label: "payload",
        value: { en: "ESP-CAM + GPS module, F405 flight controller", ko: "ESP-CAM + GPS, F405 FC" },
      },
      {
        label: "coordination",
        value: { en: "Raspberry Pi Pico W as link/telemetry hub", ko: "Pico W 링크/텔레메트리 허브" },
      },
      {
        label: "motivation",
        value: {
          en: "direct response to the Itaewon crowd crush",
          ko: "이태원 압사 사건 대응 동기",
        },
      },
    ],
    footLeft: { en: "3-person team", ko: "3인 팀" },
  },
  {
    slug: "intellichair",
    repoUrl: "https://github.com/SUNSET-Sejong-University/Intellichair",
    langDot: "#f34b7d",
    statusLine: { en: "C++ · ★ 1", ko: "C++ · ★ 1" },
    tags: ["Embedded", "Biomechanics", "IoT"],
    specRows: [
      {
        label: "sensing",
        value: { en: "4× load cells via HX711 ADCs", ko: "HX711 ADC ×4 로드셀" },
      },
      {
        label: "metrics",
        value: { en: "Symmetry Index + Center of Pressure", ko: "대칭 지수 + COP" },
      },
      {
        label: "sources",
        value: { en: "Queen 2020, Kumar 2014, Bartlett 2014", ko: "Queen 2020, Kumar 2014, Bartlett 2014" },
      },
    ],
    footLeft: { en: "MIT", ko: "MIT" },
  },
  {
    slug: "tolqyn",
    repoUrl: "https://github.com/SUNSET-Sejong-University/Tolqyn",
    langDot: "#0096D8",
    statusLine: { en: "Processing · ★ 1", ko: "Processing · ★ 1" },
    tags: ["Generative Art", "Creative Coding"],
    specRows: [
      {
        label: "engine",
        value: { en: "Processing, real-time pattern generation", ko: "Processing 실시간 패턴" },
      },
      {
        label: "input",
        value: { en: "live signal feeds the visual evolution", ko: "라이브 입력 → 시각 진화" },
      },
      {
        label: "role",
        value: {
          en: "creative-coding counterweight to hardware roster",
          ko: "하드웨어 중심 로스터의 크리에이티브 코딩",
        },
      },
    ],
    footLeft: { en: "MIT", ko: "MIT" },
  },
  {
    slug: "aura",
    repoUrl: "https://github.com/SUNSET-Sejong-University/aura",
    langDot: "#5b4b8a",
    statusLine: { en: "Concept", ko: "Concept" },
    tags: ["Proposal", "Open for builders"],
    specRows: [
      {
        label: "status",
        value: { en: "README-only — pitch doc, no code yet", ko: "README만 — 피치 문서" },
      },
      {
        label: "concept",
        value: { en: "object-presence sensing triggers workflows", ko: "물체 감지 → 워크플로 트리거" },
      },
      {
        label: "needs",
        value: { en: "a team to take it from spec to hardware", ko: "스펙→하드웨어 팀 필요" },
      },
    ],
    footLeft: { en: "Looking for a team", ko: "팀 모집 중" },
  },
];

export const homeStackChips = [
  "Python",
  "C++",
  "JavaScript",
  "Arduino",
  "ESP32",
  "Jetson",
  "MediaPipe",
  "React",
  "Processing",
  "OpenCV",
] as const;
