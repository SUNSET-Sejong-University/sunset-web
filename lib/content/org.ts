export const ORG_FULL_NAME =
  "Sejong University Network for Science & Engineering Thinkers" as const;

export const ORG_LOCATION = {
  en: "Seoul, South Korea",
  ko: "대한민국 서울",
} as const;

export const ORG_CONTACT_EMAIL = "prithwisd@sju.ac.kr" as const;

export const ORG_CONTACT = {
  email: ORG_CONTACT_EMAIL,
  location: ORG_LOCATION,
} as const;

export const orgStats = [
  {
    id: "repositories",
    value: "17",
    label: { en: "repositories in the org", ko: "조직 저장소" },
  },
  {
    id: "builders",
    value: "10+",
    label: { en: "students across cohorts", ko: "학생 참여" },
  },
  {
    id: "hardware",
    value: "5",
    label: { en: "hardware platforms active", ko: "활성 하드웨어 플랫폼" },
  },
  {
    id: "templates",
    value: "0",
    label: { en: "template repos — built from scratch", ko: "템플릿 저장소 없음" },
  },
] as const;

export const orgStatsAbout = [
  {
    id: "repositories",
    value: "17",
    label: { en: "Repositories", ko: "저장소" },
  },
  {
    id: "hardware-builds",
    value: "6+",
    label: { en: "Active hardware builds", ko: "활성 하드웨어 빌드" },
  },
  {
    id: "students",
    value: "10+",
    label: { en: "Students involved", ko: "참여 학생" },
  },
  {
    id: "first-commits",
    value: "2024",
    label: { en: "First commits (GitHub activity)", ko: "첫 커밋 (GitHub 활동)" },
  },
] as const;
