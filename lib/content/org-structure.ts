import { contributors } from "@/lib/content/contributors";
import type { Contributor, LocalizedStrings } from "@/lib/content/types";

/**
 * Organization groups and the relationships between them.
 *
 * Only verified information belongs here. Membership is recorded as contributor
 * ids from `contributors.ts`. A group with an empty `memberIds` list means no
 * verified members have been published yet — never fill it with guesses.
 *
 * Verified sources:
 * - Founding Members: `docs/REPOSITORY_AUDIT.md` §7 lists Prithwis Das as the
 *   owner-confirmed "Founding contributor".
 * - Section Leads lead projects in their respective groups: stated by the
 *   project owner. Owner-confirmed (2026-10-16): Azizbek Arzikulov leads
 *   Full-Stack Development / Engineering; Odina Yusupova leads Business.
 *   Other sections have no confirmed lead yet.
 * - Advisory Committee and Industry Mentors: group names are owner-provided;
 *   no members or relationships have been confirmed yet.
 */

export type OrgGroupId =
  | "founding-members"
  | "section-leads"
  | "advisory-committee"
  | "industry-mentors";

export type OrgGroup = {
  id: OrgGroupId;
  title: LocalizedStrings;
  /** Concise description of the group's purpose. */
  purpose: LocalizedStrings;
  /** Contributor ids from `contributors.ts`. Empty until verified. */
  memberIds: readonly string[];
};

export type OrgRelationship = {
  id: string;
  /** Group the statement is about. */
  groupId: OrgGroupId;
  statement: LocalizedStrings;
};

export const orgGroups = [
  {
    id: "founding-members",
    title: { en: "Founding Members", ko: "창립 멤버" },
    purpose: {
      en: "Contributors confirmed as founding contributors of the SUNSET organization.",
      ko: "SUNSET 조직의 창립 기여자로 확인된 구성원입니다.",
    },
    memberIds: ["prithwis-das"],
  },
  {
    id: "section-leads",
    title: { en: "Section Leads", ko: "섹션 리드" },
    purpose: {
      en: "Lead projects in their respective groups.",
      ko: "각자의 그룹에서 프로젝트를 이끕니다.",
    },
    memberIds: ["azizbek-arzikulov", "odina-yusupova"],
  },
  {
    id: "advisory-committee",
    title: { en: "Advisory Committee", ko: "자문위원회" },
    purpose: {
      en: "Advisors who give guidance to the organization.",
      ko: "조직에 조언과 방향을 제공하는 자문 구성원입니다.",
    },
    memberIds: [],
  },
  {
    id: "industry-mentors",
    title: { en: "Industry Mentors", ko: "업계 멘토" },
    purpose: {
      en: "Industry professionals who mentor SUNSET members.",
      ko: "SUNSET 구성원을 멘토링하는 업계 전문가입니다.",
    },
    memberIds: [],
  },
] as const satisfies readonly OrgGroup[];

export const orgRelationships = [
  {
    id: "section-leads-lead-projects",
    groupId: "section-leads",
    statement: {
      en: "Section Leads lead projects in their respective groups.",
      ko: "섹션 리드는 각자의 그룹에서 프로젝트를 이끕니다.",
    },
  },
] as const satisfies readonly OrgRelationship[];

export function getOrgGroup(id: OrgGroupId): OrgGroup {
  const group = orgGroups.find((entry) => entry.id === id);
  if (!group) {
    throw new Error(`Unknown organization group: ${id}`);
  }
  return group;
}

/** Resolves a group's member ids to contributor records, failing the build on unknown ids. */
export function getGroupMembers(id: OrgGroupId): readonly Contributor[] {
  return getOrgGroup(id).memberIds.map((memberId) => {
    const contributor = contributors.find((entry) => entry.id === memberId);
    if (!contributor) {
      throw new Error(`Group "${id}" references unknown contributor: ${memberId}`);
    }
    return contributor;
  });
}