import type { LocalizedStrings } from "@/lib/content/types";

export type Organization = {
  slug: string;
  name: string;
  status: "partner" | "sponsor";
  field: LocalizedStrings;
  description: LocalizedStrings;
  website: string;
  sources: readonly { label: string; url: string }[];
  logo: { kind: "wordmark" } | { kind: "image"; src: string; alt: string };
};

// Relationship statuses confirmed by the owner, 2026-11-10. No terms inferred.
export const organizations: readonly Organization[] = [
  {
    slug: "pcbway", name: "PCBWay", status: "partner", logo: { kind: "wordmark" },
    field: { en: "Electronics & manufacturing", ko: "전자 및 제조" },
    description: { en: "PCBWay offers PCB fabrication and assembly, alongside manufacturing services such as 3D printing, CNC machining, and sheet metal fabrication. Its Future Innovators Program provides an application route for student manufacturing support.", ko: "PCBWay는 PCB 제작과 조립을 비롯해 3D 프린팅, CNC 가공, 판금 제작 등의 제조 서비스를 제공합니다. Future Innovators Program을 통해 학생들이 제조 지원을 신청할 수 있습니다." },
    website: "https://www.pcbway.com/",
    sources: [{ label: "PCBWay · Future Innovators Program", url: "https://www.pcbway.com/project/sponsor/future-innovators-program.html" }],
  },
  {
    slug: "tuya", name: "Tuya", status: "sponsor", logo: { kind: "wordmark" },
    field: { en: "AI cloud & connected devices", ko: "AI 클라우드 및 연결 기기" },
    description: { en: "Tuya provides an AI cloud platform and tools for connected products. Its developer ecosystem includes TuyaOS, app development tools, and cloud APIs for building and connecting smart devices.", ko: "Tuya는 연결 기기를 위한 AI 클라우드 플랫폼과 개발 도구를 제공합니다. 개발 생태계에는 스마트 기기를 만들고 연결하기 위한 TuyaOS, 앱 개발 도구, 클라우드 API가 포함됩니다." },
    website: "https://www.tuya.com/",
    sources: [{ label: "Tuya · About", url: "https://www.tuya.com/about" }, { label: "Tuya · Contact", url: "https://www.tuya.com/contact" }],
  },
];

export const relationshipLabels = {
  partner: { en: "Partner", ko: "파트너" },
  sponsor: { en: "Sponsor", ko: "후원사" },
} as const;

export const partnerCopy = {
  company: { en: "About the company", ko: "기업 소개" },
  relationship: { en: "Relationship with SUNSET", ko: "SUNSET과의 관계" },
  note: { en: "The relationship status is confirmed by SUNSET. Specific terms and contributions are not published here. The company overview describes its general work.", ko: "관계 상태는 SUNSET이 확인했습니다. 구체적인 조건과 지원 내용은 여기에 공개하지 않습니다. 기업 소개는 해당 기업의 일반적인 사업을 설명합니다." },
  website: { en: "Visit official website", ko: "공식 웹사이트 방문" },
  sources: { en: "Company sources", ko: "기업 정보 출처" },
  profile: { en: "View profile", ko: "상세 소개" },
} as const;
