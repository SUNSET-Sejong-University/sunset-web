import type { LocalizedStrings } from "@/lib/content/types";

// Supplied short URL resolved and published embed verified in browser, 2026-11-10.
export const joinApplication = {
  url: "https://forms.gle/8yM9cvjNWBpxJLZw7",
  embedUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfAw5G4yC7mCMfiPtNRx5nROGNdxZvbhdzpurYmk_UXUSr6ag/viewform?embedded=true",
  copy: {
    notes: { en: "Planning a project? Contribution notes", ko: "프로젝트를 구상 중인가요? 기여 안내" },
    heading: { en: "Make your next build with us.", ko: "다음 작업을 함께 시작해요." },
    context: { en: "Complete SUNSET’s official recruitment form below. Google hosts the form and handles your responses.", ko: "아래 SUNSET 공식 모집 양식을 작성해 주세요. 양식과 응답은 Google에서 처리합니다." },
    title: { en: "SUNSET recruitment — official Google Form", ko: "SUNSET 모집 — 공식 Google 설문지" },
    fallback: { en: "Open the form in a new tab", ko: "새 탭에서 양식 열기" },
    hide: { en: "Use the link instead", ko: "링크로 열기" },
    retry: { en: "Show the embedded form", ko: "삽입된 양식 보기" },
    unavailableTitle: { en: "Use Google Forms directly", ko: "Google 설문지에서 바로 작성하세요" },
    unavailable: { en: "If the embedded form is blank, blocked, or unavailable in your browser, open the same official form in a new tab. This website cannot confirm whether Google has accepted a response.", ko: "삽입된 양식이 비어 있거나 차단되어 표시되지 않으면, 같은 공식 양식을 새 탭에서 열어 주세요. 이 웹사이트에서는 Google의 응답 접수 여부를 확인할 수 없습니다." },
    note: { en: "A blank or blocked form? Use the link above. The form has multiple pages; its content, sign-in prompts, and availability are controlled by Google and SUNSET’s form owner.", ko: "양식이 비어 있거나 차단되었나요? 위 링크를 이용해 주세요. 여러 페이지로 구성된 양식의 내용, 로그인 안내, 이용 가능 여부는 Google과 SUNSET 양식 소유자가 관리합니다." },
  },
} as const;

export const communityLinks = [
  { path: "sections", label: { en: "Sections", ko: "활동 분야" } },
  { path: "partners", label: { en: "Partners & Sponsors", ko: "파트너 및 후원사" } },
  { path: "achievements", label: { en: "Achievements", ko: "성과 기록" } },
] as const;

export const communityCopy = {
  sections: {
    title: { en: "Sections", ko: "활동 분야" },
    description: { en: "Find a starting point for what you want to make. Six interest areas connect software, physical systems, and creative practice.", ko: "만들고 싶은 것에서 시작하세요. 소프트웨어, 물리 시스템, 창작을 잇는 여섯 가지 관심 분야를 소개합니다." },
  },
  partners: {
    title: { en: "Partners & Sponsors", ko: "파트너 및 후원사" },
    description: { en: "Meet SUNSET’s partner and sponsor, and explore the work they do.", ko: "SUNSET의 파트너와 후원사, 그리고 각 기업의 사업 분야를 소개합니다." },
  },
  achievements: {
    title: { en: "Achievements", ko: "성과 기록" },
    description: { en: "Member work, recognized beyond the workshop. An archive of achievements with attribution and sources.", ko: "작업실 밖에서도 인정받은 구성원의 작업. 주인공과 근거를 함께 기록합니다." },
  },
  join: { en: "Explore joining SUNSET", ko: "SUNSET 참여 안내" },
  community: { en: "Community", ko: "커뮤니티" },
  founder: { en: "Founder", ko: "창립자" },
  apply: { en: "Apply to join", ko: "지원하기" },
  associatedMember: { en: "Associated member", ko: "함께하는 사람" },
  meetPartners: { en: "Meet our partner & sponsor", ko: "파트너 및 후원사 소개" },
  readAchievement: { en: "Read the achievement", ko: "성과 기록 보기" },
  formAction: { en: "Go to the official application form", ko: "공식 지원 양식으로 이동" },
  sectionNote: { en: "Six interest areas, separate from organizational roles. Exploring a pathway does not save or submit your choice.", ko: "조직 내 직책과 구분되는 여섯 관심 분야입니다. 경로를 둘러보는 것만으로 선택이 저장되거나 제출되지는 않습니다." },
  sectionFormNote: { en: "When applying, describe the field you would like to explore wherever the form allows. No section selection is sent from this website.", ko: "지원 양식에 작성할 수 있는 항목이 있다면 탐구하고 싶은 분야를 적어 주세요. 이 웹사이트에서 분야 선택 정보를 전송하지는 않습니다." },
} satisfies Record<string, LocalizedStrings | { title: LocalizedStrings; description: LocalizedStrings }>;

type BuildSection = {
  slug: string;
  title: LocalizedStrings;
  focus: LocalizedStrings;
  description: LocalizedStrings;
  memberId?: string;
  associatedName?: string;
};

export const buildSections: readonly BuildSection[] = [
  { slug: "full-stack", title: { en: "Full Stack", ko: "풀스택" }, focus: { en: "Interface → system", ko: "인터페이스 → 시스템" }, description: { en: "Explore web interfaces, APIs, and the systems that connect them. Think through a complete path from a user action to a useful result.", ko: "웹 인터페이스와 API, 이를 연결하는 시스템을 탐구합니다. 사용자의 행동이 유용한 결과로 이어지는 전체 흐름을 생각합니다." } },
  { slug: "app-development", title: { en: "App Development", ko: "앱 개발" }, focus: { en: "Interaction → everyday use", ko: "상호작용 → 일상 속 사용" }, description: { en: "Explore mobile experiences, device capabilities, and accessible interaction. Shape ideas around how people use an app in everyday life.", ko: "모바일 경험, 기기 기능, 접근성 있는 상호작용을 탐구합니다. 일상에서 앱을 사용하는 방식에 맞춰 아이디어를 구체화합니다." } },
  { slug: "game-dev", title: { en: "Game Dev", ko: "게임 개발" }, focus: { en: "Rules → play", ko: "규칙 → 플레이" }, description: { en: "Explore mechanics, interactive worlds, and playable prototypes. Use play to investigate how code, art, and sound work together.", ko: "게임 규칙과 상호작용하는 세계, 플레이 가능한 프로토타입을 탐구합니다. 코드, 아트, 사운드가 함께 작동하는 방식을 살펴봅니다." } },
  { slug: "creative-arts", title: { en: "Creative Arts", ko: "크리에이티브 아트" }, focus: { en: "Expression → experience", ko: "표현 → 경험" }, description: { en: "Explore visual storytelling, sound, design, and creative coding. Connect artistic questions with tools for making interactive experiences.", ko: "시각적 스토리텔링, 사운드, 디자인, 크리에이티브 코딩을 탐구합니다. 예술적 질문을 인터랙티브 경험을 만드는 도구와 연결합니다." }, associatedName: "Arif Anzum" },
  { slug: "embedded-systems", title: { en: "Embedded Systems", ko: "임베디드 시스템" }, focus: { en: "Signal → physical response", ko: "신호 → 물리적 반응" }, description: { en: "Explore electronics, firmware, sensors, and control. Follow the path from a measured signal to a physical response.", ko: "전자 회로, 펌웨어, 센서, 제어를 탐구합니다. 측정된 신호가 물리적 반응으로 이어지는 경로를 살펴봅니다." } },
  { slug: "space-sciences", title: { en: "Space Sciences", ko: "우주 과학" }, focus: { en: "Observation → understanding", ko: "관측 → 이해" }, description: { en: "Explore questions about space through observation, computation, and scientific models. Start with a question that can be investigated and documented.", ko: "관측, 계산, 과학적 모델로 우주에 관한 질문을 탐구합니다. 조사하고 기록할 수 있는 질문에서 시작합니다." } },
];
