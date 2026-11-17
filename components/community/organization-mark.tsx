import Image from "next/image";
import type { Organization } from "@/lib/content/partners";

export function OrganizationMark({ organization }: { organization: Organization }) {
  return <div className={`organization-mark organization-mark--${organization.slug}`}>
    {organization.logo.kind === "image" ? <div className="organization-logo-plate">
      <Image src={organization.logo.src} alt={organization.logo.alt} width={organization.logo.width} height={organization.logo.height} sizes="(max-width: 640px) 80vw, 540px" />
    </div> : <span>{organization.name}</span>}
  </div>;
}
