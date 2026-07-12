import type { ReactNode } from "react";

/** PCB palette tokens for atlas-style system diagrams.
 *  Resolved through the theme CSS variables (with dark fallbacks) so inline
 *  SVG diagrams follow dark/light mode automatically. */
export const PCB = {
  void: "var(--void, #050607)",
  mask: "var(--mask, #0d1411)",
  maskRaised: "var(--mask-raised, #131f1a)",
  via: "var(--via, #1c2520)",
  viaBright: "var(--via-bright, #3d4f43)",
  copper: "var(--copper, #d97a4d)",
  copperDim: "var(--copper-dim, #8a4f33)",
  phosphor: "var(--phosphor, #9fffa3)",
  phosphorDim: "var(--phosphor-dim, #4f8a52)",
  silk: "var(--silk, #6f7a72)",
  solder: "var(--solder, #d4cdbe)",
  solderDim: "var(--solder-dim, #8b9089)",
} as const;

export type DiagramProps = {
  className?: string;
};

export type ChannelKind = "implemented" | "experimental" | "incomplete" | "research";

export type DiagramNodeProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  sub?: string;
  kind?: ChannelKind;
  fontSize?: number;
};

export type DiagramZoneProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  children?: ReactNode;
};

export type ArrowMarkerProps = {
  id: string;
  color?: string;
};

export function channelStroke(kind: ChannelKind = "implemented"): string {
  switch (kind) {
    case "implemented":
      return PCB.phosphor;
    case "experimental":
      return PCB.copper;
    case "incomplete":
    case "research":
      return PCB.silk;
  }
}

export function channelDash(kind: ChannelKind = "implemented"): string | undefined {
  if (kind === "incomplete") {
    return "4 3";
  }
  if (kind === "research") {
    return "6 4";
  }
  return undefined;
}

export function ArrowMarker({ id, color = PCB.phosphor }: ArrowMarkerProps) {
  return (
    <marker
      id={id}
      markerWidth="7"
      markerHeight="7"
      refX="6"
      refY="3.5"
      orient="auto"
      markerUnits="strokeWidth"
    >
      <path d="M0,0 L7,3.5 L0,7 Z" fill={color} />
    </marker>
  );
}

export function DiagramBackdrop({
  width,
  height,
  channelId,
  children,
}: {
  width: number;
  height: number;
  channelId: string;
  children: ReactNode;
}) {
  return (
    <>
      <rect width={width} height={height} fill={PCB.void} rx="6" />
      <rect
        x="1"
        y="1"
        width={width - 2}
        height={height - 2}
        fill={PCB.mask}
        stroke={PCB.viaBright}
        strokeWidth="1"
        rx="5"
      />
      <text
        x="16"
        y="22"
        fill={PCB.silk}
        fontFamily="var(--font-mono, ui-monospace, monospace)"
        fontSize="10"
        letterSpacing="0.08em"
      >
        {channelId}
      </text>
      <line x1="16" y1="28" x2={width - 16} y2="28" stroke={PCB.via} strokeWidth="1" />
      {children}
    </>
  );
}

export function DiagramZone({ x, y, width, height, label, children }: DiagramZoneProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={PCB.maskRaised}
        stroke={PCB.viaBright}
        strokeWidth="1"
        rx="4"
      />
      <text
        x={x + 10}
        y={y + 14}
        fill={PCB.copper}
        fontFamily="var(--font-mono, ui-monospace, monospace)"
        fontSize="9"
        letterSpacing="0.06em"
      >
        {label}
      </text>
      {children}
    </g>
  );
}

export function DiagramNode({
  x,
  y,
  width,
  height,
  label,
  sub,
  kind = "implemented",
  fontSize = 10,
}: DiagramNodeProps) {
  const stroke = channelStroke(kind);
  const dash = channelDash(kind);

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={PCB.via}
        stroke={stroke}
        strokeWidth="1.25"
        strokeDasharray={dash}
        rx="3"
      />
      <text
        x={x + width / 2}
        y={y + (sub ? height / 2 - 2 : height / 2 + 4)}
        fill={PCB.solder}
        fontSize={fontSize}
        textAnchor="middle"
        fontFamily="var(--font-sans, system-ui, sans-serif)"
      >
        {label}
      </text>
      {sub ? (
        <text
          x={x + width / 2}
          y={y + height / 2 + 12}
          fill={PCB.solderDim}
          fontSize="8"
          textAnchor="middle"
          fontFamily="var(--font-mono, ui-monospace, monospace)"
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

export function FlowConnector({
  x1,
  y1,
  x2,
  y2,
  markerId,
  kind = "implemented",
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  markerId: string;
  kind?: ChannelKind;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={channelStroke(kind)}
      strokeWidth="1.5"
      strokeDasharray={channelDash(kind)}
      markerEnd={`url(#${markerId})`}
    />
  );
}

export function LegendItem({
  x,
  y,
  kind,
  label,
}: {
  x: number;
  y: number;
  kind: ChannelKind;
  label: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="14"
        height="10"
        fill={PCB.via}
        stroke={channelStroke(kind)}
        strokeWidth="1"
        strokeDasharray={channelDash(kind)}
        rx="2"
      />
      <text
        x={x + 20}
        y={y + 8}
        fill={PCB.silk}
        fontSize="8"
        fontFamily="var(--font-mono, ui-monospace, monospace)"
      >
        {label}
      </text>
    </g>
  );
}

export function AccessibleDiagramTitle({ id, children }: { id: string; children: string }) {
  return (
    <title id={id} className="sr-only">
      {children}
    </title>
  );
}
