import type { Locale } from "@/lib/i18n/locales";

export type Dictionary = {
  site: {
    name: string;
    descriptor: string;
    disclaimer: string;
    githubOrgLabel: string;
  };
  nav: {
    projects: string;
    people: string;
    timeline: string;
    about: string;
    join: string;
    openMenu: string;
    closeMenu: string;
    skipToContent: string;
    languageSwitch: string;
    currentPage: string;
    themeToLight: string;
    themeToDark: string;
  };
  footer: {
    archive: string;
    github: string;
    websiteBy: string;
  };
  common: {
    exploreProjects: string;
    viewOnGitHub: string;
    repository: string;
    repositories: string;
    limitations: string;
    relatedProjects: string;
    systemDiagram: string;
    clearFilters: string;
    searchPlaceholder: string;
    resultCountSingular: string;
    resultCountPlural: string;
    noResults: string;
    noResultsHint: string;
    filterTier: string;
    filterStatus: string;
    filterCategory: string;
    filterPanelTitle: string;
    all: string;
    backToProjects: string;
    contributors: string;
    githubActivity: string;
    implemented: string;
    experimental: string;
    proposed: string;
    incomplete: string;
    notFoundTitle: string;
    notFoundDescription: string;
    returnHome: string;
  };
  status: Record<
    | "concept"
    | "prototype"
    | "working-prototype"
    | "completed"
    | "learning"
    | "archived",
    string
  >;
  tier: Record<
    "flagship" | "supporting" | "incubator" | "learning",
    string
  >;
  category: Record<
    | "robotics"
    | "embedded"
    | "ai-experiment"
    | "creative-coding"
    | "web"
    | "education",
    string
  >;
  home: {
    headline: string;
    subhead: string;
    heroLead: string;
    heroAccent: string;
    heroDescription: string;
    heroProjectsLink: string;
    timeMotif: readonly { time: string; label: string }[];
    timeMotifLabel: string;
    featuredTitle: string;
    featuredEyebrow: string;
    featuredBody: string;
    allReposCta: string;
    missionEyebrow: string;
    missionTitle: string;
    missionBody: string;
    pillars: readonly { refdes: string; title: string; body: string }[];
    flowEyebrow: string;
    flowTitle: string;
    flowBody: string;
    flowSteps: readonly { step: string; title: string; body: string }[];
    stackEyebrow: string;
    stackTitle: string;
    disciplinesTitle: string;
    disciplines: readonly { title: string; body: string }[];
    lifecycleTitle: string;
    lifecycle: readonly { step: string; title: string; body: string }[];
    activityTitle: string;
    activityNote: string;
    joinTitle: string;
    joinBody: string;
    joinCta: string;
  };
  projectsPage: {
    title: string;
    description: string;
    heroEyebrow: string;
    readoutLabel: string;
    readoutProjects: string;
    readoutTiers: string;
    readoutChannel: string;
  };
  probe: {
    openLabel: string;
    title: string;
    placeholder: string;
    empty: string;
    trigger: string;
    footNavigate: string;
    footRun: string;
    footClose: string;
    commands: {
      home: string;
      about: string;
      projects: string;
      people: string;
      structure: string;
      timeline: string;
      scope: string;
      mission: string;
      featured: string;
      how: string;
      stack: string;
      join: string;
      joinPage: string;
      github: string;
      email: string;
      projectCaseStudy: string;
      projectRepo: string;
      subPage: string;
      subSection: string;
      subExternal: string;
      subContact: string;
      subProject: string;
      subRepo: string;
    };
  };
  peoplePage: {
    title: string;
    description: string;
    heroEyebrow: string;
    incompleteNote: string;
    contributorLabel: string;
    projectsLabel: string;
    groupsNavLabel: string;
    groupsTitle: string;
    groupsIntro: string;
    noPublishedMembers: string;
    memberCountSingular: string;
    memberCountPlural: string;
    contributorsTitle: string;
    contributorsIntro: string;
    structureLinkLabel: string;
    structureLinkHint: string;
  };
  orgStructurePage: {
    title: string;
    description: string;
    heroEyebrow: string;
    verifiedNote: string;
    groupsTitle: string;
    groupsIntro: string;
    relationshipsTitle: string;
    relationshipsIntro: string;
    unpublishedNote: string;
    viewGroupLabel: string;
    backToPeople: string;
    navLabel: string;
  };
  timelinePage: {
    title: string;
    description: string;
    heroEyebrow: string;
    evidenceNote: string;
    eventTypes: Record<string, string>;
  };
  aboutPage: {
    title: string;
    heroEyebrow: string;
    heroHeadline: string;
    heroLede: string;
    originKicker: string;
    originTitle: string;
    originParagraphs: readonly string[];
    originTerminalSummary: string;
    originTerminal: readonly (
      | { kind: "blank" }
      | { kind: "comment"; text: string }
      | { kind: "command"; command: string; args: string }
      | { kind: "commit"; hash: string; repo: string; message: string }
    )[];
    valuesEyebrow: string;
    valuesTitle: string;
    valuesIntro: string;
    values: readonly { title: string; body: string }[];
    peopleEyebrow: string;
    peopleTitle: string;
    peopleIntro: string;
    joinCtaTitle: string;
    joinCtaEmail: string;
    joinCtaRepos: string;
  };
  joinPage: {
    title: string;
    description: string;
    heroEyebrow: string;
    whoCanParticipateTitle: string;
    whoCanParticipate: string;
    projectTypesTitle: string;
    projectTypes: string;
    proposalProcessTitle: string;
    proposalProcess: string;
    documentationExpectationsTitle: string;
    documentationExpectations: string;
    checklistTitle: string;
    checklist: readonly string[];
    contactTitle: string;
    githubCta: string;
    noFormNote: string;
  };
  caseStudy: {
    identity: string;
    status: string;
    summary: string;
    problem: string;
    implementation: string;
    architecture: string;
    decisions: string;
    media: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    site: {
      name: "SUNSET",
      descriptor: "Student-built systems after sunset",
      disclaimer:
        "SUNSET is an independent student-led collective. References to Sejong University describe the students' academic community and do not imply official university endorsement.",
      githubOrgLabel: "GitHub organization",
    },
    nav: {
      projects: "Projects",
      people: "People",
      timeline: "Timeline",
      about: "About",
      join: "Join",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      skipToContent: "Skip to content",
      languageSwitch: "Switch language",
      currentPage: "Current page",
      themeToLight: "Switch to light theme",
      themeToDark: "Switch to dark theme",
    },
    footer: {
      archive: "Engineering archive for collaborative student projects.",
      github: "Organization on GitHub",
      websiteBy: "Website by",
    },
    common: {
      exploreProjects: "Explore projects",
      viewOnGitHub: "View on GitHub",
      repository: "Repository",
      repositories: "Repositories",
      limitations: "Known limitations",
      relatedProjects: "Related projects",
      systemDiagram: "System diagram",
      clearFilters: "Clear filters",
      searchPlaceholder: "Search projects…",
      resultCountSingular: "1 project",
      resultCountPlural: "{count} projects",
      noResults: "No projects match these filters",
      noResultsHint: "Try clearing filters or changing your search terms.",
      filterTier: "Tier",
      filterStatus: "Status",
      filterCategory: "Category",
      filterPanelTitle: "Archive controls",
      all: "All",
      backToProjects: "Back to projects",
      contributors: "Contributors",
      githubActivity: "GitHub activity",
      implemented: "Implemented",
      experimental: "Experimental",
      proposed: "Proposed",
      incomplete: "Incomplete",
      notFoundTitle: "Page not found",
      notFoundDescription: "This route does not exist in the archive.",
      returnHome: "Return home",
    },
    status: {
      concept: "Concept",
      prototype: "Prototype",
      "working-prototype": "Working Prototype",
      completed: "Completed",
      learning: "Learning Archive",
      archived: "Archived",
    },
    tier: {
      flagship: "Flagship",
      supporting: "Supporting",
      incubator: "Incubator",
      learning: "Learning",
    },
    category: {
      robotics: "Robotics",
      embedded: "Embedded",
      "ai-experiment": "AI Experiment",
      "creative-coding": "Creative Coding",
      web: "Web",
      education: "Education",
    },
    home: {
      headline: "WE BUILD AFTER CLASS.",
      subhead:
        "Software, hardware, and experiments created by students at Sejong University.",
      heroLead: "We build things that",
      heroAccent: "actually run.",
      heroDescription:
        "SUNSET is a student-run engineering collective at Sejong University. Robotic hands, load-cell chairs, UAV payloads, AI movie engines — built in dorm rooms and lab benches, documented like the real thing, because it is.",
      heroProjectsLink: "See the projects ↓",
      timeMotif: [
        { time: "18:00", label: "classes end" },
        { time: "18:40", label: "tools open" },
        { time: "21:20", label: "first prototype" },
        { time: "01:10", label: "still debugging" },
      ],
      timeMotifLabel: "After-class signal log",
      featuredTitle: "A few things currently on the bench",
      featuredEyebrow: "FROM THE ORG",
      featuredBody:
        "Pulled straight from our GitHub — real commit histories, real hardware, real students attached to every one of them.",
      allReposCta: "See all 17 repositories on GitHub",
      missionEyebrow: "WHY WE EXIST",
      missionTitle: "Most class projects die in a final ZIP file.\nOurs keep running.",
      missionBody:
        "SUNSET exists so the best group-project ideas at Sejong don't end at the demo — they get a repo, a maintainer, and a reason to keep building after the grade is in.",
      pillars: [
        {
          refdes: "U1 — BUILD",
          title: "Hardware-first, always",
          body: "If it can be touched, wired, or soldered, we'd rather build the real thing than mock it up. Servos, load cells, flight controllers, microcontrollers — the lab bench is the whiteboard.",
        },
        {
          refdes: "U2 — DOCUMENT",
          title: "Write it down properly",
          body: "Every project ships with a real README — wiring diagrams, protocols, calibration steps, cited sources. Future-you and the next cohort should be able to pick it up cold.",
        },
        {
          refdes: "U3 — SHIP TOGETHER",
          title: "Cross-major by design",
          body: "CS students pair with mechanical and electronics majors on every build. Nobody finishes a SUNSET project having only touched the part they already knew.",
        },
      ],
      flowEyebrow: "HOW A BUILD HAPPENS",
      flowTitle: "From idea on a napkin to a repo with a README",
      flowBody:
        "There's no committee. If a few people want to build it and can explain why it should exist, it becomes a project.",
      flowSteps: [
        {
          step: "1",
          title: "Pitch it",
          body: 'Anyone proposes a build — hardware, software, or both. The bar is "can we actually make this," not "is this impressive enough."',
        },
        {
          step: "2",
          title: "Team up",
          body: "Find the people who complement your gaps. Mechanical, embedded, ML, frontend — the mix matters more than the pitch deck.",
        },
        {
          step: "3",
          title: "Build in the open",
          body: "Push early, push often. Broken commits are fine. The README should explain what works and what doesn't.",
        },
        {
          step: "4",
          title: "Document and hand off",
          body: "Architecture notes, limitations, wiring diagrams. Make it possible for the next student to continue without a oral history.",
        },
      ],
      stackEyebrow: "TOOLS ON THE BENCH",
      stackTitle: "Technologies we actually use",
      disciplinesTitle: "Disciplines and working modes",
      disciplines: [
        {
          title: "Physical computing",
          body: "Load cells, servos, RF links, and embedded firmware that connect sensors to visible behavior.",
        },
        {
          title: "Systems software",
          body: "Gateways, clients, and pipelines that move data between devices, services, and interfaces.",
        },
        {
          title: "Creative experiments",
          body: "Generative visuals, multimodal prototypes, and playful tools built to explore an idea.",
        },
      ],
      lifecycleTitle: "From question to documented prototype",
      lifecycle: [
        {
          step: "01",
          title: "Define the question",
          body: "State the problem, experiment, or system boundary before writing code.",
        },
        {
          step: "02",
          title: "Build the smallest working path",
          body: "Connect input, processing, and output—even if the result is fragile.",
        },
        {
          step: "03",
          title: "Document what exists",
          body: "Record architecture, decisions, and limitations so the next contributor can continue.",
        },
      ],
      activityTitle: "Recent GitHub activity",
      activityNote:
        "Dates below reflect public GitHub repository activity and may not equal project start dates.",
      joinTitle: "Start a project",
      joinBody:
        "SUNSET archives student-built systems. Proposals should include a clear question, expected output, and documentation plan.",
      joinCta: "How to join",
    },
    projectsPage: {
      title: "Projects",
      description:
        "A technical archive of verified student engineering work — filters, metadata, and case studies for every public repository in the org.",
      heroEyebrow: "PROJECT ARCHIVE",
      readoutLabel: "Archive instrument readout",
      readoutProjects: "indexed projects",
      readoutTiers: "tier bands",
      readoutChannel: "live index",
    },
    probe: {
      openLabel: "Open command palette",
      title: "PROBE — COMMAND PALETTE",
      placeholder: "Type a command or destination…",
      empty: "no match — try a different signal",
      trigger: "PROBE",
      footNavigate: "↑↓ navigate",
      footRun: "↵ run",
      footClose: "esc close",
      commands: {
        home: "Go to home",
        about: "Go to about",
        projects: "Go to projects archive",
        people: "Go to people",
        structure: "Go to organization structure",
        timeline: "Go to timeline",
        scope: "Jump to live readout",
        mission: "Jump to mission",
        featured: "Jump to featured projects",
        how: "Jump to how a build happens",
        stack: "Jump to the stack",
        join: "Jump to join",
        joinPage: "Go to join page",
        github: "Open GitHub org",
        email: "Email the org",
        projectCaseStudy: "Open {name} case study",
        projectRepo: "Open {name} repo",
        subPage: "page",
        subSection: "section",
        subExternal: "external ↗",
        subContact: "contact",
        subProject: "project",
        subRepo: "repo ↗",
      },
    },
    peoplePage: {
      title: "People",
      description:
        "Contributors attached to SUNSET repositories — names from commit history and verified project associations, not job titles.",
      heroEyebrow: "BUILDER NETWORK",
      incompleteNote:
        "Contributor records are incomplete. Roles are listed as Contributor unless directly verified. SUNSET does not rank contributors by commit volume.",
      contributorLabel: "Contributor",
      projectsLabel: "Browse the full project archive for case studies and repositories.",
      groupsNavLabel: "People groups",
      groupsTitle: "Groups",
      groupsIntro:
        "SUNSET is organized into four groups. Members are listed only where their role has been confirmed.",
      noPublishedMembers: "No members published yet. Names are added only once they are verified.",
      memberCountSingular: "1 published member",
      memberCountPlural: "{count} published members",
      contributorsTitle: "Contributors",
      contributorsIntro:
        "Confirmed SUNSET members and repository contributors, listed alphabetically with verified project associations.",
      structureLinkLabel: "Organization structure",
      structureLinkHint: "See how these groups relate to one another.",
    },
    orgStructurePage: {
      title: "Organization Structure",
      description:
        "How the SUNSET groups — Founding Members, Section Leads, Advisory Committee, and Industry Mentors — relate to one another.",
      heroEyebrow: "HOW SUNSET IS ORGANIZED",
      verifiedNote:
        "SUNSET is an independent student engineering collective. Only confirmed groups and relationships are shown here; nothing on this page implies an official Sejong University role.",
      groupsTitle: "The four groups",
      groupsIntro: "Each group and what it is for. Select a group name to see its members.",
      relationshipsTitle: "How the groups relate",
      relationshipsIntro: "Relationships that have been confirmed so far.",
      unpublishedNote:
        "Reporting lines and relationships between the other groups have not been published yet, so none are shown.",
      viewGroupLabel: "View members",
      backToPeople: "Back to people",
      navLabel: "Organization structure",
    },
    timelinePage: {
      title: "Timeline",
      description:
        "A signal-bus view of documented milestones and GitHub repository activity across the organization.",
      heroEyebrow: "SIGNAL HISTORY",
      evidenceNote:
        "Repository creation and push dates are labeled as GitHub activity. They do not necessarily mark when a project concept began.",
      eventTypes: {
        "repo-created": "Repository created",
        "repo-updated": "Repository updated",
        milestone: "Documented milestone",
      },
    },
    aboutPage: {
      title: "About SUNSET",
      heroEyebrow: "ABOUT SUNSET",
      heroHeadline:
        "A network of students who'd rather build the thing than write the slide about it.",
      heroLede:
        "SUNSET — Sejong University Network for Science & Engineering Thinkers — started as a way for students across majors to keep working on the projects worth keeping, long after the assignment ended.",
      originKicker: "HOW THIS STARTED",
      originTitle: "It began with data-structures homework.",
      originParagraphs: [
        "The earliest repos in this org are exactly what they look like — queues, linked lists, trees, written for a class. Nothing glamorous. But the people writing them kept talking after the course ended, and the conversation kept turning into \"what if we actually built that.\"",
        "That instinct is the whole organization. SUNSET isn't a club with a constitution — it's the same small group of builders saying yes to each other's ideas, repo after repo, until a robotic hand and a UAV crowd-safety payload showed up next to the old coursework.",
        "We kept the old repos. They're the part of the story that explains the rest of it.",
      ],
      originTerminalSummary:
        "Illustrative git log showing coursework repos evolving into hardware and AI projects.",
      originTerminal: [
        { kind: "command", command: "git", args: "log --oneline --all | tail -6" },
        { kind: "blank" },
        { kind: "commit", hash: "a1c44f9", repo: "Trees", message: "add BST traversal exercises" },
        { kind: "commit", hash: "c92e0d1", repo: "Linked-Lists", message: "initial commit" },
        { kind: "commit", hash: "7fa30b2", repo: "Queues", message: "circular buffer impl" },
        { kind: "blank" },
        { kind: "comment", text: "// a few semesters later..." },
        { kind: "commit", hash: "8e21a40", repo: "Intellichair", message: "add CoP calculation" },
        { kind: "commit", hash: "f0c9b15", repo: "GRIP-5", message: "two-stage smoothing for servos" },
        { kind: "commit", hash: "3d77a22", repo: "MoodFlix", message: "Jetson inference server" },
      ],
      valuesEyebrow: "WHAT WE OPTIMIZE FOR",
      valuesTitle: "Four things every project gets held to",
      valuesIntro:
        "Not a rulebook — just the questions that come up in every project chat, eventually.",
      values: [
        {
          title: "Working beats theoretical",
          body: "A janky prototype that mirrors your hand in front of a camera says more than a perfect spec document that doesn't run. We ship the version that powers on.",
        },
        {
          title: "Cite your sources",
          body: "When we borrow a formula — like the biomechanics symmetry indices behind Intellichair — we credit the paper it came from. Good engineering shows its references.",
        },
        {
          title: "No solo silos",
          body: "MoodFlix had four contributors with named roles. NaeonAir had three. We try to make sure no single person is the only one who understands how a project works.",
        },
        {
          title: "Document like someone else will read it",
          body: "Wiring diagrams, calibration notes, protocol schemas. A README should let a future student fork the project without messaging anyone first.",
        },
      ],
      peopleEyebrow: "THE PEOPLE BEHIND IT",
      peopleTitle: "Builders, not job titles",
      peopleIntro:
        "Names pulled from the commit history and contributor lists across our repositories — the people who actually wrote the code and bent the metal.",
      joinCtaTitle: "Studying at Sejong and want in on the next build?",
      joinCtaEmail: "Email the org",
      joinCtaRepos: "Browse our repos →",
    },
    joinPage: {
      title: "Join",
      description:
        "Propose a build for the SUNSET archive — a project brief, not a recruitment funnel.",
      heroEyebrow: "BUILD PROPOSAL",
      whoCanParticipateTitle: "Who can participate",
      whoCanParticipate:
        "Students interested in collaborative engineering work—software, hardware, creative coding, or experimental systems—can propose a project.",
      projectTypesTitle: "Project types",
      projectTypes:
        "Projects should have a clear technical question, expected output, and a path to documented prototypes. Course exercises may be grouped as learning archive material rather than flagship case studies.",
      proposalProcessTitle: "Proposal process",
      proposalProcess:
        "Prepare a short proposal describing the problem, expected output, technologies, hardware needs, contributor needs, safety or privacy concerns, demonstration plan, repository owner, and documentation owner. Discuss the proposal with current SUNSET contributors through your existing collaboration channels.",
      documentationExpectationsTitle: "Documentation expectations",
      documentationExpectations:
        "Public projects need honest status labels, architecture notes, limitations, and repository links. Incomplete work remains visible when it helps future contributors.",
      checklistTitle: "Proposal checklist",
      checklist: [
        "Problem or experiment question",
        "Expected output",
        "Likely technologies",
        "Hardware needs",
        "Contributor needs",
        "Safety and privacy concerns",
        "Demonstration plan",
        "Repository owner",
        "Documentation owner",
      ],
      contactTitle: "Contact",
      githubCta: "Browse our repos →",
      noFormNote:
        "This site does not provide a submission form or chat channel. Contact prithwisd@sju.ac.kr or reach SUNSET contributors through your existing collaboration channels.",
    },
    caseStudy: {
      identity: "Project identity",
      status: "Public status",
      summary: "Verified summary",
      problem: "Problem or experiment question",
      implementation: "What was actually built",
      architecture: "Architecture or workflow",
      decisions: "Important technical decisions",
      media: "Evidence",
    },
  },
  ko: {
    site: {
      name: "SUNSET",
      descriptor: "해 질 무렵, 학생들이 만든 시스템",
      disclaimer:
        "SUNSET은 학생 주도의 독립적인 공학 공동체입니다. 세종대학교에 대한 언급은 학생들의 학업 공동체를 설명하는 것이며, 대학의 공식적인 보증을 의미하지 않습니다.",
      githubOrgLabel: "GitHub 조직",
    },
    nav: {
      projects: "프로젝트",
      people: "사람들",
      timeline: "타임라인",
      about: "소개",
      join: "참여",
      openMenu: "메뉴 열기",
      closeMenu: "메뉴 닫기",
      skipToContent: "본문으로 건너뛰기",
      languageSwitch: "언어 전환",
      currentPage: "현재 페이지",
      themeToLight: "라이트 테마로 전환",
      themeToDark: "다크 테마로 전환",
    },
    footer: {
      archive: "협업 학생 프로젝트를 위한 공학 아카이브.",
      github: "GitHub 조직",
      websiteBy: "웹사이트 제작",
    },
    common: {
      exploreProjects: "프로젝트 탐색",
      viewOnGitHub: "GitHub에서 보기",
      repository: "저장소",
      repositories: "저장소",
      limitations: "알려진 한계",
      relatedProjects: "관련 프로젝트",
      systemDiagram: "시스템 다이어그램",
      clearFilters: "필터 초기화",
      searchPlaceholder: "프로젝트 검색…",
      resultCountSingular: "1개 프로젝트",
      resultCountPlural: "{count}개 프로젝트",
      noResults: "조건에 맞는 프로젝트가 없습니다",
      noResultsHint: "필터를 초기화하거나 검색어를 변경해 보세요.",
      filterTier: "등급",
      filterStatus: "상태",
      filterCategory: "분야",
      filterPanelTitle: "아카이브 컨트롤",
      all: "전체",
      backToProjects: "프로젝트 목록으로",
      contributors: "기여자",
      githubActivity: "GitHub 활동",
      implemented: "구현됨",
      experimental: "실험적",
      proposed: "제안됨",
      incomplete: "미완성",
      notFoundTitle: "페이지를 찾을 수 없습니다",
      notFoundDescription: "아카이브에 존재하지 않는 경로입니다.",
      returnHome: "홈으로 돌아가기",
    },
    status: {
      concept: "개념",
      prototype: "프로토타입",
      "working-prototype": "동작 프로토타입",
      completed: "완료",
      learning: "학습 아카이브",
      archived: "보관됨",
    },
    tier: {
      flagship: "플래그십",
      supporting: "서포팅",
      incubator: "인큐베이터",
      learning: "학습",
    },
    category: {
      robotics: "로보틱스",
      embedded: "임베디드",
      "ai-experiment": "AI 실험",
      "creative-coding": "크리에이티브 코딩",
      web: "웹",
      education: "교육",
    },
    home: {
      headline: "WE BUILD AFTER CLASS.",
      subhead:
        "세종대학교 학생들이 만든 소프트웨어, 하드웨어, 실험 프로젝트.",
      heroLead: "We build things that",
      heroAccent: "actually run.",
      heroDescription:
        "SUNSET은 세종대학교 학생 주도 공학 집단입니다. 기숙사와 실험실에서 로봇 손, 로드셀 의자, UAV 페이로드, AI 영화 엔진을 만들고, 실제 시스템처럼 문서화합니다.",
      heroProjectsLink: "프로젝트 보기 ↓",
      timeMotif: [
        { time: "18:00", label: "수업 종료" },
        { time: "18:40", label: "도구 준비" },
        { time: "21:20", label: "첫 프로토타입" },
        { time: "01:10", label: "아직 디버깅 중" },
      ],
      timeMotifLabel: "방과 후 신호 로그",
      featuredTitle: "현재 벤치 위의 프로젝트",
      featuredEyebrow: "FROM THE ORG",
      featuredBody:
        "GitHub에서 직접 가져온 프로젝트 — 실제 커밋 기록, 하드웨어, 학생이 연결되어 있습니다.",
      allReposCta: "GitHub에서 17개 저장소 모두 보기",
      missionEyebrow: "WHY WE EXIST",
      missionTitle: "대부분의 수업 프로젝트는 ZIP으로 끝납니다.\n우리 것은 계속 돌아갑니다.",
      missionBody:
        "SUNSET은 세종에서 좋은 팀 프로젝트가 데모 후 사라지지 않도록, 저장소와 유지보수자, 계속 빌드할 이유를 남깁니다.",
      pillars: [
        {
          refdes: "U1 — BUILD",
          title: "하드웨어 우선",
          body: "만질 수 있고 연결할 수 있다면 목업보다 실물을 만듭니다. 서보, 로드셀, FC, MCU — 실험대가 화이트보드입니다.",
        },
        {
          refdes: "U2 — DOCUMENT",
          title: "제대로 기록",
          body: "배선도, 프로토콜, 보정 절차, 출처가 있는 README. 다음 학생이 처음부터 읽을 수 있어야 합니다.",
        },
        {
          refdes: "U3 — SHIP TOGETHER",
          title: "학과를 넘어서",
          body: "CS, 기계, 전자 학생이 매 빌드에서 함께합니다. 이미 아는 부분만 건드리고 끝나지 않습니다.",
        },
      ],
      flowEyebrow: "HOW A BUILD HAPPENS",
      flowTitle: "낙서에서 README 있는 저장소까지",
      flowBody:
        "위원회가 없습니다. 몇 명이 만들고 싶고 왜 필요한지 설명할 수 있으면 프로젝트가 됩니다.",
      flowSteps: [
        {
          step: "1",
          title: "Pitch it",
          body: "누구나 하드웨어/소프트웨어 빌드를 제안합니다. 기준은 '실제로 만들 수 있는가'입니다.",
        },
        {
          step: "2",
          title: "Team up",
          body: "부족한 역량을 보완할 사람을 찾습니다. 기계, 임베디드, ML, 프론트 — 조합이 중요합니다.",
        },
        {
          step: "3",
          title: "Build in the open",
          body: "일찍, 자주 푸시합니다. 깨진 커밋도 괜찮습니다. README에 동작/미동작을 적습니다.",
        },
        {
          step: "4",
          title: "Document and hand off",
          body: "아키텍처, 한계, 배선도. 구두 전달 없이 이어갈 수 있게 만듭니다.",
        },
      ],
      stackEyebrow: "TOOLS ON THE BENCH",
      stackTitle: "실제로 쓰는 기술",
      disciplinesTitle: "분야와 작업 방식",
      disciplines: [
        {
          title: "피지컬 컴퓨팅",
          body: "로드셀, 서보, RF 링크, 펌웨어로 센서 입력을 실제 동작과 연결합니다.",
        },
        {
          title: "시스템 소프트웨어",
          body: "디바이스, 서비스, 인터페이스 사이에서 데이터를 이동시키는 게이트웨이와 클라이언트.",
        },
        {
          title: "창의적 실험",
          body: "아이디어를 탐색하기 위한 생성형 비주얼, 멀티모달 프로토타입, 도구.",
        },
      ],
      lifecycleTitle: "질문에서 문서화된 프로토타입까지",
      lifecycle: [
        {
          step: "01",
          title: "질문 정의",
          body: "코드를 작성하기 전에 문제, 실험, 시스템 경계를 명확히 합니다.",
        },
        {
          step: "02",
          title: "최소 동작 경로 구축",
          body: "결과가 불안정하더라도 입력, 처리, 출력을 연결합니다.",
        },
        {
          step: "03",
          title: "존재하는 것을 문서화",
          body: "다음 기여자가 이어갈 수 있도록 아키텍처, 결정, 한계를 기록합니다.",
        },
      ],
      activityTitle: "최근 GitHub 활동",
      activityNote:
        "아래 날짜는 공개 GitHub 저장소 활동을 반영하며, 프로젝트 시작 시점과 같지 않을 수 있습니다.",
      joinTitle: "프로젝트 시작하기",
      joinBody:
        "SUNSET은 학생이 만든 시스템을 아카이브합니다. 제안에는 명확한 질문, 기대 결과, 문서화 계획이 포함되어야 합니다.",
      joinCta: "참여 방법",
    },
    projectsPage: {
      title: "프로젝트",
      description:
        "검증된 학생 공학 작업의 기술 아카이브 — 조직의 모든 공개 저장소에 대한 필터, 메타데이터, 사례 연구.",
      heroEyebrow: "PROJECT ARCHIVE",
      readoutLabel: "아카이브 계기판",
      readoutProjects: "색인 프로젝트",
      readoutTiers: "티어 밴드",
      readoutChannel: "라이브 인덱스",
    },
    probe: {
      openLabel: "명령 팔레트 열기",
      title: "PROBE — COMMAND PALETTE",
      placeholder: "명령 또는 목적지 입력…",
      empty: "일치 없음 — 다른 신호를 시도하세요",
      trigger: "PROBE",
      footNavigate: "↑↓ 이동",
      footRun: "↵ 실행",
      footClose: "esc 닫기",
      commands: {
        home: "홈으로",
        about: "소개로",
        projects: "프로젝트 아카이브로",
        people: "사람들로",
        structure: "조직 구조로",
        timeline: "타임라인으로",
        scope: "라이브 리드아웃으로",
        mission: "미션으로",
        featured: "추천 프로젝트로",
        how: "빌드 과정으로",
        stack: "스택으로",
        join: "참여로",
        joinPage: "참여 페이지로",
        github: "GitHub 조직 열기",
        email: "조직에 이메일",
        projectCaseStudy: "{name} 사례 연구 열기",
        projectRepo: "{name} 저장소 열기",
        subPage: "페이지",
        subSection: "섹션",
        subExternal: "외부 ↗",
        subContact: "연락",
        subProject: "프로젝트",
        subRepo: "저장소 ↗",
      },
    },
    peoplePage: {
      title: "사람들",
      description:
        "SUNSET 저장소에 연결된 기여자 — 커밋 기록과 검증된 프로젝트 연관, 직함이 아닌 빌더 네트워크.",
      heroEyebrow: "BUILDER NETWORK",
      incompleteNote:
        "기여자 기록은 불완전합니다. 역할이 직접 확인되지 않으면 Contributor로 표시합니다. SUNSET은 커밋 수로 기여자 순위를 매기지 않습니다.",
      contributorLabel: "기여자",
      projectsLabel: "사례 연구와 저장소는 프로젝트 아카이브에서 확인하세요.",
      groupsNavLabel: "사람 그룹",
      groupsTitle: "그룹",
      groupsIntro:
        "SUNSET은 네 개의 그룹으로 구성됩니다. 역할이 확인된 구성원만 표시합니다.",
      noPublishedMembers: "아직 공개된 구성원이 없습니다. 이름은 확인된 후에만 추가됩니다.",
      memberCountSingular: "공개 구성원 1명",
      memberCountPlural: "공개 구성원 {count}명",
      contributorsTitle: "기여자",
      contributorsIntro:
        "확인된 SUNSET 구성원과 저장소 기여자를 이름순으로, 확인된 프로젝트 연관과 함께 표시합니다.",
      structureLinkLabel: "조직 구조",
      structureLinkHint: "이 그룹들이 서로 어떻게 연결되는지 확인하세요.",
    },
    orgStructurePage: {
      title: "조직 구조",
      description:
        "SUNSET의 그룹 — 창립 멤버, 섹션 리드, 자문위원회, 업계 멘토 — 이 서로 어떻게 연결되는지 설명합니다.",
      heroEyebrow: "HOW SUNSET IS ORGANIZED",
      verifiedNote:
        "SUNSET은 독립적인 학생 엔지니어링 집단입니다. 이 페이지에는 확인된 그룹과 관계만 표시하며, 세종대학교의 공식 직책을 의미하지 않습니다.",
      groupsTitle: "네 개의 그룹",
      groupsIntro: "각 그룹의 목적입니다. 그룹 이름을 선택하면 구성원을 볼 수 있습니다.",
      relationshipsTitle: "그룹 간 관계",
      relationshipsIntro: "현재까지 확인된 관계입니다.",
      unpublishedNote:
        "다른 그룹 사이의 보고 체계와 관계는 아직 공개되지 않아 표시하지 않습니다.",
      viewGroupLabel: "구성원 보기",
      backToPeople: "사람들로 돌아가기",
      navLabel: "조직 구조",
    },
    timelinePage: {
      title: "타임라인",
      description:
        "조직의 문서화된 이정표와 GitHub 저장소 활동을 보여주는 신호 버스 뷰.",
      heroEyebrow: "SIGNAL HISTORY",
      evidenceNote:
        "저장소 생성 및 푸시 날짜는 GitHub 활동으로 표시됩니다. 프로젝트 개념이 시작된 시점과 같지 않을 수 있습니다.",
      eventTypes: {
        "repo-created": "저장소 생성",
        "repo-updated": "저장소 업데이트",
        milestone: "문서화된 이정표",
      },
    },
    aboutPage: {
      title: "SUNSET 소개",
      heroEyebrow: "ABOUT SUNSET",
      heroHeadline: "슬라이드보다 실제로 돌아가는 것을 만드는 학생들의 네트워크.",
      heroLede:
        "SUNSET — Sejong University Network for Science & Engineering Thinkers — 는 전공을 넘어 과제가 끝난 뒤에도 계속할 가치가 있는 프로젝트를 이어가기 위해 시작되었습니다.",
      originKicker: "HOW THIS STARTED",
      originTitle: "자료구조 과제에서 시작했습니다.",
      originParagraphs: [
        "조직의 가장 오래된 저장소는 이름 그대로 큐, 연결 리스트, 트리 같은 수업 과제입니다. 화려하지 않습니다. 하지만 그 코드를 쓴 사람들은 수업이 끝난 뒤에도 대화를 이어갔고, 그 대화는 \"이걸 진짜로 만들면 어떨까\"로 이어졌습니다.",
        "그 본능이 조직 전체입니다. SUNSET은 정관이 있는 동아리가 아닙니다 — 아이디어에 계속 yes라고 답하는 작은 빌더 그룹이 repo를 쌓다가, 옛 과제 옆에 로봇 손과 UAV 군중 안전 페이로드가 나타난 것입니다.",
        "옛 저장소는 그대로 남겨 두었습니다. 나머지 이야기를 설명하는 부분입니다.",
      ],
      originTerminalSummary:
        "수업용 저장소에서 하드웨어·AI 프로젝트로 이어지는 과정을 보여주는 예시 git 로그입니다.",
      originTerminal: [
        { kind: "command", command: "git", args: "log --oneline --all | tail -6" },
        { kind: "blank" },
        { kind: "commit", hash: "a1c44f9", repo: "Trees", message: "add BST traversal exercises" },
        { kind: "commit", hash: "c92e0d1", repo: "Linked-Lists", message: "initial commit" },
        { kind: "commit", hash: "7fa30b2", repo: "Queues", message: "circular buffer impl" },
        { kind: "blank" },
        { kind: "comment", text: "// a few semesters later..." },
        { kind: "commit", hash: "8e21a40", repo: "Intellichair", message: "add CoP calculation" },
        { kind: "commit", hash: "f0c9b15", repo: "GRIP-5", message: "two-stage smoothing for servos" },
        { kind: "commit", hash: "3d77a22", repo: "MoodFlix", message: "Jetson inference server" },
      ],
      valuesEyebrow: "WHAT WE OPTIMIZE FOR",
      valuesTitle: "모든 프로젝트에 적용하는 네 가지 기준",
      valuesIntro: "규칙집이 아니라 — 결국 모든 프로젝트 대화에서 나오는 질문들입니다.",
      values: [
        {
          title: "동작하는 것이 이론보다 낫다",
          body: "카메라 앞에서 손을 따라 움직이는 조잡한 프로토타입이, 실행되지 않는 완벽한 스펙 문서보다 더 많은 것을 말합니다. 전원이 들어오는 버전을 만듭니다.",
        },
        {
          title: "출처를 밝힌다",
          body: "공식을 빌릴 때 — Intellichair의 생체역학 대칭 지수처럼 — 논문 출처를 명시합니다. 좋은 엔지니어링은 참고 문헌을 보여 줍니다.",
        },
        {
          title: "혼자만 아는 silo 금지",
          body: "MoodFlix는 네 명의 기여자가 역할을 나눴습니다. NaeonAir는 세 명이었습니다. 한 사람만 프로젝트를 이해하는 상황을 피하려 합니다.",
        },
        {
          title: "다른 사람이 읽을 문서처럼 작성",
          body: "배선도, 보정 노트, 프로토콜 스키마. README만으로도 후배가 DM 없이 fork할 수 있어야 합니다.",
        },
      ],
      peopleEyebrow: "THE PEOPLE BEHIND IT",
      peopleTitle: "직함이 아니라 빌더",
      peopleIntro:
        "저장소 커밋 기록과 기여자 목록에서 가져온 이름 — 실제로 코드를 쓰고 금속을 구부린 사람들입니다.",
      joinCtaTitle: "세종대학교에서 다음 빌드에 참여하고 싶나요?",
      joinCtaEmail: "조직에 이메일",
      joinCtaRepos: "저장소 둘러보기 →",
    },
    joinPage: {
      title: "참여",
      description: "SUNSET 아카이브에 빌드를 제안하는 방법 — 채용 페이지가 아닌 프로젝트 브리프.",
      heroEyebrow: "BUILD PROPOSAL",
      whoCanParticipateTitle: "참여 대상",
      whoCanParticipate:
        "소프트웨어, 하드웨어, 크리에이티브 코딩, 실험 시스템 등 협업 공학 작업에 관심 있는 학생이 프로젝트를 제안할 수 있습니다.",
      projectTypesTitle: "프로젝트 유형",
      projectTypes:
        "프로젝트에는 명확한 기술적 질문, 기대 결과, 문서화된 프로토타입으로 이어지는 경로가 있어야 합니다. 수업 연습은 플래그십 사례 대신 학습 아카이브로 묶일 수 있습니다.",
      proposalProcessTitle: "제안 절차",
      proposalProcess:
        "문제, 기대 결과, 기술, 하드웨어 필요 사항, 기여자 필요 사항, 안전·개인정보 우려, 시연 계획, 저장소 소유자, 문서화 담당자를 설명하는 짧은 제안서를 준비하세요. 기존 협업 경로를 통해 SUNSET 기여자와 논의하세요.",
      documentationExpectationsTitle: "문서화 기대치",
      documentationExpectations:
        "공개 프로젝트에는 정직한 상태 라벨, 아키텍처 메모, 한계, 저장소 링크가 필요합니다. 미완성 작업도 이후 기여자에게 도움이 되면 공개됩니다.",
      checklistTitle: "제안 체크리스트",
      checklist: [
        "문제 또는 실험 질문",
        "기대 결과",
        "예상 기술",
        "하드웨어 필요 사항",
        "기여자 필요 사항",
        "안전 및 개인정보 우려",
        "시연 계획",
        "저장소 소유자",
        "문서화 담당자",
      ],
      contactTitle: "연락",
      githubCta: "저장소 둘러보기 →",
      noFormNote:
        "이 사이트는 제출 양식이나 채팅 채널을 제공하지 않습니다. prithwisd@sju.ac.kr로 연락하거나 기존 협업 경로를 이용하세요.",
    },
    caseStudy: {
      identity: "프로젝트 정보",
      status: "공개 상태",
      summary: "검증된 요약",
      problem: "문제 또는 실험 질문",
      implementation: "실제로 구현된 것",
      architecture: "아키텍처 또는 워크플로",
      decisions: "주요 기술적 결정",
      media: "근거 자료",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
