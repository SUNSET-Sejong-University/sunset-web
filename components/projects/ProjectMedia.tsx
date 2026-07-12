import Image from "next/image";

import {
  Grip5Diagram,
  MoodflixDiagram,
  NaeonAirDiagram,
  TolqynDiagram,
} from "@/components/diagrams/FlagshipDiagrams";
import {
  AuraDiagram,
  BuildInDiagram,
  DsnsimDiagram,
  IkumplayDiagram,
  IntellichairDiagram,
  LearningStructuresDiagram,
  RoastivatorDiagram,
} from "@/components/diagrams/SupportingDiagrams";
import type { Project } from "@/lib/content/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";

type ProjectMediaProps = {
  project: Project;
  locale: Locale;
  dictionary: Dictionary;
  priority?: boolean;
};

function SystemDiagramForSlug({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  switch (slug) {
    case "grip-5":
      return <Grip5Diagram className={className} />;
    case "tolqyn":
      return <TolqynDiagram className={className} />;
    case "moodflix":
      return <MoodflixDiagram className={className} />;
    case "naeonair-wisdrone":
      return <NaeonAirDiagram className={className} />;
    case "intellichair":
      return <IntellichairDiagram className={className} />;
    case "buildin":
      return <BuildInDiagram className={className} />;
    case "ikumplay":
      return <IkumplayDiagram className={className} />;
    case "roastivator":
      return <RoastivatorDiagram className={className} />;
    case "dsnsim":
      return <DsnsimDiagram className={className} />;
    case "aura":
      return <AuraDiagram className={className} />;
    case "learning-structures":
      return <LearningStructuresDiagram className={className} />;
    default:
      return null;
  }
}

export function ProjectMedia({
  project,
  locale,
  dictionary,
  priority = false,
}: ProjectMediaProps) {
  const diagram = (
    <SystemDiagramForSlug slug={project.slug} className="h-auto w-full" />
  );

  if (
    [
      "grip-5",
      "tolqyn",
      "moodflix",
      "naeonair-wisdrone",
      "intellichair",
      "buildin",
      "ikumplay",
      "roastivator",
      "dsnsim",
      "aura",
      "learning-structures",
    ].includes(project.slug)
  ) {
    return (
      <figure className="diagram-frame">
        {diagram}
        <figcaption>{dictionary.common.systemDiagram}</figcaption>
      </figure>
    );
  }

  const asset = project.media[0];
  if (!asset) {
    return null;
  }

  return (
    <figure className="diagram-frame">
      <div style={{ position: "relative", aspectRatio: "16 / 10", background: "var(--mask)" }}>
        <Image
          src={asset.path}
          alt={asset.alt[locale]}
          fill
          className="object-contain"
          style={{ padding: 16 }}
          sizes="(max-width: 768px) 100vw, 720px"
          priority={priority}
        />
      </div>
      <figcaption>{asset.caption?.[locale] ?? dictionary.common.systemDiagram}</figcaption>
    </figure>
  );
}
