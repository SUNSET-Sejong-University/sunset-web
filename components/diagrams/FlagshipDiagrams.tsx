import type { ComponentType } from "react";

import {
  AccessibleDiagramTitle,
  ArrowMarker,
  DiagramBackdrop,
  DiagramNode,
  DiagramZone,
  FlowConnector,
  LegendItem,
  PCB,
  type DiagramProps,
} from "@/components/diagrams/diagram-shared";

const GRIP5_TITLE_ID = "grip5-diagram-title";
const TOLQYN_TITLE_ID = "tolqyn-diagram-title";
const MOODFLIX_TITLE_ID = "moodflix-diagram-title";
const NAEONAIR_TITLE_ID = "naeonair-diagram-title";

export function Grip5Diagram({ className = "" }: DiagramProps) {
  const marker = "grip5-arrow-phosphor";

  return (
    <svg
      viewBox="0 0 640 420"
      className={className}
      role="img"
      aria-labelledby={GRIP5_TITLE_ID}
    >
      <AccessibleDiagramTitle id={GRIP5_TITLE_ID}>
        GRIP-5 signal path from webcam input through MediaPipe hand tracking with twenty-one
        landmarks, joint-angle geometry, finger openness mapping, exponential moving average
        smoothing, zero-to-nine quantization, and a five-character state string over serial or
        UDP transport to Arduino parsing and proportional easing on five servos. Zones group host
        processing, transport, microcontroller firmware, and servo output.
      </AccessibleDiagramTitle>

      <DiagramBackdrop width={640} height={420} channelId="SIG-GRIP · HAND-TO-SERVO PATH">
        <DiagramZone x={12} y={40} width={616} height={196} label="HOST · VISION & STATE">
          <DiagramNode x={24} y={72} width={68} height={44} label="Webcam" sub="frame in" />
          <DiagramNode x={104} y={72} width={72} height={44} label="MediaPipe" sub="hands" />
          <DiagramNode
            x={188}
            y={72}
            width={78}
            height={44}
            label="Landmarks"
            sub="21 pts"
          />
          <DiagramNode x={278} y={72} width={78} height={44} label="Joint angles" sub="geometry" />
          <DiagramNode x={368} y={72} width={78} height={44} label="Openness" sub="per finger" />
          <DiagramNode x={458} y={72} width={58} height={44} label="EMA" sub="smooth" />
          <DiagramNode x={528} y={72} width={52} height={44} label="0–9 Q" sub="discrete" />
          <DiagramNode
            x={280}
            y={148}
            width={96}
            height={44}
            label="Five-char state"
            sub="finger codes"
          />

          <FlowConnector x1={92} y1={94} x2={104} y2={94} markerId={marker} />
          <FlowConnector x1={176} y1={94} x2={188} y2={94} markerId={marker} />
          <FlowConnector x1={266} y1={94} x2={278} y2={94} markerId={marker} />
          <FlowConnector x1={356} y1={94} x2={368} y2={94} markerId={marker} />
          <FlowConnector x1={446} y1={94} x2={458} y2={94} markerId={marker} />
          <FlowConnector x1={516} y1={94} x2={528} y2={94} markerId={marker} />
          <FlowConnector x1={554} y1={116} x2={328} y2={148} markerId={marker} />
        </DiagramZone>

        <DiagramZone x={12} y={252} width={148} height={108} label="TRANSPORT">
          <DiagramNode
            x={28}
            y={284}
            width={116}
            height={52}
            label="Serial / UDP"
            sub="five-char packet"
          />
        </DiagramZone>

        <DiagramZone x={172} y={252} width={148} height={108} label="MCU">
          <DiagramNode
            x={188}
            y={284}
            width={116}
            height={52}
            label="Arduino parse"
            sub="validate & map"
          />
        </DiagramZone>

        <DiagramZone x={332} y={252} width={148} height={108} label="OUTPUT">
          <DiagramNode
            x={348}
            y={284}
            width={116}
            height={52}
            label="Five servos"
            sub="eased motion"
          />
        </DiagramZone>

        <FlowConnector x1={328} y1={192} x2={86} y2={252} markerId={marker} />
        <FlowConnector x1={160} y1={310} x2={172} y2={310} markerId={marker} />
        <FlowConnector x1={320} y1={310} x2={332} y2={310} markerId={marker} />

        <text
          x={500}
          y={276}
          fill={PCB.silk}
          fontSize="8"
          fontFamily="var(--font-mono, ui-monospace, monospace)"
        >
          RPS demo path
        </text>
        <path
          d="M498 284 L548 310"
          stroke={PCB.copper}
          strokeWidth="1"
          strokeDasharray="3 3"
          fill="none"
        />

        <LegendItem x={488} y={328} kind="implemented" label="verified path" />
        <LegendItem x={488} y={346} kind="experimental" label="demo branch" />
      </DiagramBackdrop>

      <defs>
        <ArrowMarker id={marker} />
      </defs>
    </svg>
  );
}

export function TolqynDiagram({ className = "" }: DiagramProps) {
  const marker = "tolqyn-arrow-copper";
  const nodes: Array<{ cx: number; cy: number }> = [
    { cx: 318, cy: 118 },
    { cx: 352, cy: 132 },
    { cx: 286, cy: 136 },
    { cx: 340, cy: 168 },
    { cx: 298, cy: 176 },
    { cx: 362, cy: 188 },
    { cx: 276, cy: 198 },
    { cx: 330, cy: 210 },
    { cx: 308, cy: 228 },
    { cx: 348, cy: 236 },
    { cx: 288, cy: 244 },
    { cx: 322, cy: 258 },
  ];

  return (
    <svg
      viewBox="0 0 640 420"
      className={className}
      role="img"
      aria-labelledby={TOLQYN_TITLE_ID}
    >
      <AccessibleDiagramTitle id={TOLQYN_TITLE_ID}>
        Tolqyn generative visual system combining audio FFT and beat detection, webcam frame-difference
        centroid, and gyroscope orientation into interaction logic driving approximately three thousand
        nodes and edges rendered in real time through Processing P3D output.
      </AccessibleDiagramTitle>

      <DiagramBackdrop width={640} height={420} channelId="SIG-TOL · GENERATIVE FIELD">
        <DiagramZone x={12} y={40} width={148} height={300} label="SENSORS & AUDIO">
          <DiagramNode x={28} y={72} width={116} height={48} label="Audio in" sub="FFT · beat" />
          <DiagramNode x={28} y={136} width={116} height={48} label="Camera" sub="frame diff" />
          <DiagramNode x={28} y={200} width={116} height={48} label="Gyro" sub="orientation" />
          <DiagramNode
            x={28}
            y={264}
            width={116}
            height={48}
            label="UDP / serial"
            sub="interaction"
            kind="experimental"
          />
        </DiagramZone>

        <DiagramZone x={176} y={40} width={288} height={300} label="INTERACTION LOGIC · ~3000 NODES">
          <circle cx={320} cy={188} r="96" fill="none" stroke={PCB.copperDim} strokeWidth="1" />
          <circle cx={320} cy={188} r="72" fill={PCB.via} stroke={PCB.copper} strokeWidth="1.25" />
          {nodes.map((node, index) => (
            <g key={`tolqyn-node-${index}`}>
              <circle cx={node.cx} cy={node.cy} r="4" fill={PCB.copper} opacity="0.9" />
              {index < nodes.length - 1 ? (
                <line
                  x1={node.cx}
                  y1={node.cy}
                  x2={nodes[index + 1]?.cx ?? node.cx}
                  y2={nodes[index + 1]?.cy ?? node.cy}
                  stroke={PCB.phosphorDim}
                  strokeWidth="0.75"
                  opacity="0.55"
                />
              ) : null}
            </g>
          ))}
          <line x1={248} y1={148} x2={392} y2={228} stroke={PCB.phosphorDim} strokeWidth="0.75" />
          <line x1={392} y1={148} x2={248} y2={228} stroke={PCB.phosphorDim} strokeWidth="0.75" />
          <text
            x={320}
            y={184}
            fill={PCB.solder}
            fontSize="11"
            textAnchor="middle"
            fontFamily="var(--font-display, sans-serif)"
          >
            ~3000 nodes
          </text>
          <text
            x={320}
            y={200}
            fill={PCB.silk}
            fontSize="8"
            textAnchor="middle"
            fontFamily="var(--font-mono, ui-monospace, monospace)"
          >
            edges · procedural notes
          </text>
        </DiagramZone>

        <DiagramZone x={480} y={40} width={148} height={300} label="P3D OUTPUT">
          <rect
            x={496}
            y={88}
            width={116}
            height={180}
            fill={PCB.void}
            stroke={PCB.phosphor}
            strokeWidth="1.25"
            rx="3"
          />
          {[0, 1, 2, 3, 4].map((row) => (
            <line
              key={`tolqyn-scan-${row}`}
              x1={504}
              y1={104 + row * 32}
              x2={604}
              y2={104 + row * 32}
              stroke={PCB.phosphorDim}
              strokeWidth="0.75"
              opacity={0.35 + row * 0.12}
            />
          ))}
          <DiagramNode
            x={496}
            y={284}
            width={116}
            height={44}
            label="Processing P3D"
            sub="real-time"
          />
        </DiagramZone>

        <FlowConnector x1={160} y1={120} x2={176} y2={160} markerId={marker} />
        <FlowConnector x1={160} y1={188} x2={176} y2={188} markerId={marker} />
        <FlowConnector x1={160} y1={256} x2={176} y2={216} markerId={marker} />
        <FlowConnector x1={464} y1={188} x2={480} y2={188} markerId={marker} kind="implemented" />

        <LegendItem x={12} y={356} kind="implemented" label="render path" />
        <LegendItem x={120} y={356} kind="experimental" label="live I/O" />
      </DiagramBackdrop>

      <defs>
        <ArrowMarker id={marker} color={PCB.copper} />
      </defs>
    </svg>
  );
}

export function MoodflixDiagram({ className = "" }: DiagramProps) {
  const marker = "moodflix-arrow-phosphor";
  const markerResearch = "moodflix-arrow-silk";

  return (
    <svg
      viewBox="0 0 640 420"
      className={className}
      role="img"
      aria-labelledby={MOODFLIX_TITLE_ID}
    >
      <AccessibleDiagramTitle id={MOODFLIX_TITLE_ID}>
        MoodFlix multimodal movie recommendation research prototype. Face, audio, and context inputs
        feed DeepFace emotion analysis, Librosa audio features, and contextual signals into Ollama
        TinyLlama and a Random Forest model trained from logged data, enriched through TMDB, to produce
        recommendations. Dashed borders mark research-grade or incomplete modules.
      </AccessibleDiagramTitle>

      <DiagramBackdrop width={640} height={420} channelId="SIG-MFX · MULTIMODAL STACK">
        <DiagramZone x={12} y={40} width={128} height={280} label="INPUTS">
          <DiagramNode x={24} y={72} width={104} height={44} label="Face" sub="webcam" />
          <DiagramNode x={24} y={132} width={104} height={44} label="Audio" sub="mic / env" />
          <DiagramNode x={24} y={192} width={104} height={44} label="Context" sub="session" />
        </DiagramZone>

        <DiagramZone x={156} y={40} width={176} height={280} label="PROCESSING">
          <DiagramNode
            x={172}
            y={72}
            width={144}
            height={44}
            label="DeepFace"
            sub="emotion"
            kind="research"
          />
          <DiagramNode
            x={172}
            y={132}
            width={144}
            height={44}
            label="Librosa"
            sub="audio features"
            kind="research"
          />
          <DiagramNode
            x={172}
            y={192}
            width={144}
            height={44}
            label="Context parse"
            sub="HTTP server"
            kind="research"
          />
          <DiagramNode
            x={172}
            y={252}
            width={144}
            height={52}
            label="CSV logging"
            sub="sync paths"
            kind="incomplete"
          />
        </DiagramZone>

        <DiagramZone x={348} y={40} width={140} height={280} label="MODELS">
          <DiagramNode
            x={364}
            y={88}
            width={108}
            height={52}
            label="Ollama"
            sub="TinyLlama"
            kind="research"
          />
          <DiagramNode
            x={364}
            y={168}
            width={108}
            height={52}
            label="Random Forest"
            sub="logged data"
            kind="research"
          />
          <DiagramNode
            x={364}
            y={248}
            width={108}
            height={44}
            label="Merge & rank"
            sub="prototype"
            kind="incomplete"
          />
        </DiagramZone>

        <DiagramZone x={504} y={40} width={124} height={280} label="OUTPUT">
          <DiagramNode
            x={520}
            y={96}
            width={92}
            height={44}
            label="TMDB"
            sub="enrichment"
            kind="implemented"
          />
          <DiagramNode
            x={520}
            y={176}
            width={92}
            height={52}
            label="Recommend"
            sub="React client"
            kind="implemented"
          />
        </DiagramZone>

        <FlowConnector x1={128} y1={94} x2={156} y2={94} markerId={marker} />
        <FlowConnector x1={128} y1={154} x2={156} y2={154} markerId={marker} />
        <FlowConnector x1={128} y1={214} x2={156} y2={214} markerId={marker} />
        <FlowConnector x1={316} y1={116} x2={348} y2={114} markerId={markerResearch} kind="research" />
        <FlowConnector x1={316} y1={196} x2={348} y2={194} markerId={markerResearch} kind="research" />
        <FlowConnector x1={472} y1={194} x2={504} y2={118} markerId={marker} />
        <FlowConnector x1={566} y1={140} x2={566} y2={176} markerId={marker} />

        <LegendItem x={12} y={356} kind="implemented" label="client + TMDB" />
        <LegendItem x={148} y={356} kind="research" label="research modules" />
        <LegendItem x={292} y={356} kind="incomplete" label="fragile paths" />
      </DiagramBackdrop>

      <defs>
        <ArrowMarker id={marker} />
        <ArrowMarker id={markerResearch} color={PCB.silk} />
      </defs>
    </svg>
  );
}

export function NaeonAirDiagram({ className = "" }: DiagramProps) {
  const marker = "naeonair-arrow-phosphor";
  const markerExp = "naeonair-arrow-copper";
  const markerInc = "naeonair-arrow-silk";

  return (
    <svg
      viewBox="0 0 640 420"
      className={className}
      role="img"
      aria-labelledby={NAEONAIR_TITLE_ID}
    >
      <AccessibleDiagramTitle id={NAEONAIR_TITLE_ID}>
        NaeonAir WisDrone topology from ESP32-CAM capture and onboard sensors through WebSocket or
        TCP links to a Python ground gateway, React monitoring interface, periodic AI frame forwarding,
        incomplete on-device inference, and experimental Mobius bridge integration. Solid paths are
        implemented streaming; dashed paths are experimental or incomplete.
      </AccessibleDiagramTitle>

      <DiagramBackdrop width={640} height={420} channelId="SIG-NAV · AIRBORNE TOPOLOGY">
        <DiagramZone x={12} y={40} width={120} height={148} label="AIRBORNE">
          <DiagramNode
            x={24}
            y={72}
            width={96}
            height={48}
            label="ESP32-CAM"
            sub="Wi-Fi stream"
            kind="implemented"
          />
          <DiagramNode
            x={24}
            y={132}
            width={96}
            height={44}
            label="Sensors"
            sub="telemetry"
            kind="implemented"
          />
        </DiagramZone>

        <DiagramZone x={148} y={40} width={132} height={148} label="LINK">
          <DiagramNode
            x={164}
            y={88}
            width={100}
            height={44}
            label="WebSocket"
            sub="binary frames"
            kind="implemented"
          />
          <DiagramNode
            x={164}
            y={144}
            width={100}
            height={36}
            label="TCP"
            sub="Pico path"
            kind="experimental"
          />
        </DiagramZone>

        <DiagramZone x={296} y={40} width={132} height={148} label="GROUND GW">
          <DiagramNode
            x={312}
            y={88}
            width={100}
            height={52}
            label="Python gateway"
            sub="route by device"
            kind="implemented"
          />
        </DiagramZone>

        <DiagramZone x={444} y={40} width={184} height={148} label="MONITORING UI">
          <DiagramNode
            x={460}
            y={72}
            width={152}
            height={36}
            label="React / Vite UI"
            sub="map · streams"
            kind="implemented"
          />
          <DiagramNode
            x={460}
            y={120}
            width={72}
            height={36}
            label="Video"
            sub="panel"
            kind="implemented"
          />
          <DiagramNode
            x={540}
            y={120}
            width={72}
            height={36}
            label="Telemetry"
            sub="data"
            kind="implemented"
          />
        </DiagramZone>

        <DiagramZone x={12} y={208} width={616} height={128} label="AI & EXPERIMENTAL PATHS">
          <DiagramNode
            x={28}
            y={240}
            width={120}
            height={48}
            label="Periodic forward"
            sub="frame batch"
            kind="experimental"
          />
          <DiagramNode
            x={168}
            y={240}
            width={120}
            height={48}
            label="FastAPI upload"
            sub="wisdrone-ai"
            kind="incomplete"
          />
          <DiagramNode
            x={308}
            y={240}
            width={120}
            height={48}
            label="Inference call"
            sub="empty path"
            kind="incomplete"
          />
          <DiagramNode
            x={448}
            y={240}
            width={120}
            height={48}
            label="Mobius bridge"
            sub="experimental"
            kind="experimental"
          />
        </DiagramZone>

        <FlowConnector x1={132} y1={96} x2={148} y2={110} markerId={marker} />
        <FlowConnector x1={132} y1={154} x2={148} y2={162} markerId={markerExp} kind="experimental" />
        <FlowConnector x1={280} y1={114} x2={296} y2={114} markerId={marker} />
        <FlowConnector x1={428} y1={114} x2={444} y2={114} markerId={marker} />
        <FlowConnector x1={362} y1={140} x2={362} y2={208} markerId={markerExp} kind="experimental" />
        <FlowConnector x1={148} y1={264} x2={168} y2={264} markerId={markerExp} kind="experimental" />
        <FlowConnector x1={288} y1={264} x2={308} y2={264} markerId={markerInc} kind="incomplete" />
        <FlowConnector x1={428} y1={264} x2={448} y2={264} markerId={markerExp} kind="experimental" />

        <LegendItem x={12} y={356} kind="implemented" label="streaming stack" />
        <LegendItem x={148} y={356} kind="experimental" label="Mobius / forward" />
        <LegendItem x={292} y={356} kind="incomplete" label="inference gap" />
      </DiagramBackdrop>

      <defs>
        <ArrowMarker id={marker} />
        <ArrowMarker id={markerExp} color={PCB.copper} />
        <ArrowMarker id={markerInc} color={PCB.silk} />
      </defs>
    </svg>
  );
}

export function getFlagshipDiagram(slug: string): ComponentType<DiagramProps> | null {
  switch (slug) {
    case "grip-5":
      return Grip5Diagram;
    case "tolqyn":
      return TolqynDiagram;
    case "moodflix":
      return MoodflixDiagram;
    case "naeonair-wisdrone":
      return NaeonAirDiagram;
    default:
      return null;
  }
}
