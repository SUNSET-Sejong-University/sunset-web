import Image from "next/image";
import type { Organization } from "@/lib/content/partners";

export function OrganizationMark({ organization }: { organization: Organization }) {
  return <div className={`organization-mark organization-mark--${organization.slug}`}>
    {organization.logo.kind === "image" ? <Image src={organization.logo.src} alt={organization.logo.alt} width={280} height={96} /> : <span>{organization.name}</span>}
  </div>;
}
