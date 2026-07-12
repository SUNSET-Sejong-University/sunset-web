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

const INTELLICHAIR_TITLE_ID = "intellichair-diagram-title";
const BUILDIN_TITLE_ID = "buildin-diagram-title";
const IKUMPLAY_TITLE_ID = "ikumplay-diagram-title";
const ROASTIVATOR_TITLE_ID = "roastivator-diagram-title";
const DSNSIM_TITLE_ID = "dsnsim-diagram-title";
const AURA_TITLE_ID = "aura-diagram-title";
const LEARNING_TITLE_ID = "learning-structures-diagram-title";

export function IntellichairDiagram({ className = "" }: DiagramProps) {
  const marker = "intellichair-arrow-phosphor";

  return (
    <svg
      viewBox="0 0 640 360"
      className={className}
      role="img"
      aria-labelledby={INTELLICHAIR_TITLE_ID}
    >
      <AccessibleDiagramTitle id={INTELLICHAIR_TITLE_ID}>
        Intellichair smart-chair sensing prototype using four load cells with HX711 interfaces and a
        BMI270 BMM150 inertial unit to compute symmetry index, center of pressure, and accelerometer
        angles, with buzzer feedback and a proposed BLE service path.
      </AccessibleDiagramTitle>

      <DiagramBackdrop width={640} height={360} channelId="SIG-ICH · POSTURE SENSING">
        <DiagramZone x={12} y={40} width={156} height={240} label="SENSORS">
          <DiagramNode x={28} y={72} width={124} height={40} label="Load cells ×4" sub="HX711" />
          <DiagramNode x={28} y={124} width={124} height={40} label="IMU" sub="BMI270 · BMM150" />
          <DiagramNode
            x={28}
            y={176}
            width={124}
            height={40}
            label="Normalization"
            sub="left / right"
            kind="implemented"
          />
        </DiagramZone>

        <DiagramZone x={184} y={40} width={156} height={240} label="METRICS">
          <DiagramNode
            x={200}
            y={88}
            width={124}
            height={44}
            label="Symmetry Index"
            sub="balance ratio"
          />
          <DiagramNode
            x={200}
            y={148}
            width={124}
            height={44}
            label="Center of Pressure"
            sub="seat map"
          />
          <DiagramNode
            x={200}
            y={208}
            width={124}
            height={44}
            label="Accel angles"
            sub="tilt estimate"
          />
        </DiagramZone>

        <DiagramZone x={356} y={40} width={132} height={240} label="FEEDBACK">
          <DiagramNode x={372} y={112} width={100} height={48} label="Buzzer" sub="threshold" />
          <DiagramNode
            x={372}
            y={184}
            width={100}
            height={48}
            label="BLE service"
            sub="proposed GATT"
            kind="incomplete"
          />
        </DiagramZone>

        <DiagramZone x={504} y={40} width={124} height={240} label="OUTPUT">
          <DiagramNode
            x={520}
            y={128}
            width={92}
            height={64}
            label="Posture signals"
            sub="prototype metrics"
          />
        </DiagramZone>

        <FlowConnector x1={168} y1={132} x2={184} y2={132} markerId={marker} />
        <FlowConnector x1={340} y1={170} x2={356} y2={136} markerId={marker} />
        <FlowConnector x1={472} y1={160} x2={504} y2={160} markerId={marker} />
        <FlowConnector x1={422} y1={208} x2={536} y2={192} markerId={marker} kind="incomplete" />

        <LegendItem x={12} y={300} kind="implemented" label="firmware path" />
        <LegendItem x={148} y={300} kind="incomplete" label="BLE incomplete" />
      </DiagramBackdrop>

      <defs>
        <ArrowMarker id={marker} />
      </defs>
    </svg>
  );
}

export function BuildInDiagram({ className = "" }: DiagramProps) {
  const marker = "buildin-arrow-phosphor";

  return (
    <svg
      viewBox="0 0 640 360"
      className={className}
      role="img"
      aria-labelledby={BUILDIN_TITLE_ID}
    >
      <AccessibleDiagramTitle id={BUILDIN_TITLE_ID}>
        BuildIn physical GitHub Actions status indicator on Arduino MKR WiFi 1010 polling the GitHub
        API for latest workflow runs and mapping queued, running, success, and failure states to four
        LED outputs.
      </AccessibleDiagramTitle>

      <DiagramBackdrop width={640} height={360} channelId="SIG-BLD · CI TO LED">
        <DiagramZone x={12} y={40} width={120} height={240} label="CONNECT">
          <DiagramNode x={24} y={88} width={96} height={48} label="Wi-Fi" sub="MKR 1010" />
          <DiagramNode x={24} y={156} width={96} height={48} label="Poll timer" sub="workflow run" />
        </DiagramZone>

        <DiagramZone x={148} y={40} width={160} height={240} label="GITHUB API">
          <DiagramNode
            x={164}
            y={88}
            width={128}
            height={48}
            label="Workflow runs"
            sub="latest status"
          />
          <DiagramNode
            x={164}
            y={156}
            width={128}
            height={48}
            label="JSON extract"
            sub="manual parse"
            kind="experimental"
          />
        </DiagramZone>

        <DiagramZone x={324} y={40} width={140} height={240} label="STATE MAP">
          <DiagramNode x={340} y={72} width={108} height={36} label="Queued" sub="LED 1" />
          <DiagramNode x={340} y={116} width={108} height={36} label="Running" sub="LED 2" />
          <DiagramNode x={340} y={160} width={108} height={36} label="Success" sub="LED 3" />
          <DiagramNode x={340} y={204} width={108} height={36} label="Failure" sub="LED 4" />
        </DiagramZone>

        <DiagramZone x={480} y={40} width={148} height={240} label="HARDWARE">
          <rect
            x={504}
            y={96}
            width={100}
            height={128}
            fill={PCB.void}
            stroke={PCB.copper}
            strokeWidth="1.25"
            rx="4"
          />
          {[0, 1, 2, 3].map((index) => (
            <circle
              key={`buildin-led-${index}`}
              cx={554}
              cy={120 + index * 28}
              r="8"
              fill={index === 2 ? PCB.phosphor : PCB.via}
              stroke={PCB.copper}
              strokeWidth="1"
            />
          ))}
          <text
            x={554}
            y={248}
            fill={PCB.silk}
            fontSize="8"
            textAnchor="middle"
            fontFamily="var(--font-mono, ui-monospace, monospace)"
          >
            4 LEDs
          </text>
        </DiagramZone>

        <FlowConnector x1={132} y1={112} x2={148} y2={112} markerId={marker} />
        <FlowConnector x1={132} y1={180} x2={148} y2={180} markerId={marker} />
        <FlowConnector x1={308} y1={180} x2={324} y2={180} markerId={marker} />
        <FlowConnector x1={464} y1={180} x2={480} y2={180} markerId={marker} />
      </DiagramBackdrop>

      <defs>
        <ArrowMarker id={marker} />
      </defs>
    </svg>
  );
}

export function IkumplayDiagram({ className = "" }: DiagramProps) {
  const marker = "ikumplay-arrow-copper";

  return (
    <svg
      viewBox="0 0 640 360"
      className={className}
      role="img"
      aria-labelledby={IKUMPLAY_TITLE_ID}
    >
      <AccessibleDiagramTitle id={IKUMPLAY_TITLE_ID}>
        IKUMPlay terminal karaoke pipeline searching tracks through Spotipy, acquiring media with
        yt-dlp, separating vocals with Docker Spleeter fallback, parsing synced LRC lyrics, and playing
        back through pygame with Rich terminal visualization and keyboard controls.
      </AccessibleDiagramTitle>

      <DiagramBackdrop width={640} height={360} channelId="SIG-IKP · MEDIA PIPELINE">
        <DiagramNode x={24} y={72} width={88} height={44} label="Search" sub="Spotipy" />
        <DiagramNode x={132} y={72} width={88} height={44} label="Acquire" sub="yt-dlp" />
        <DiagramNode x={240} y={72} width={88} height={44} label="Separate" sub="Spleeter" />
        <DiagramNode x={348} y={72} width={88} height={44} label="Lyrics" sub="LRC sync" />
        <DiagramNode x={456} y={72} width={88} height={44} label="Playback" sub="pygame" />
        <DiagramNode x={548} y={72} width={68} height={44} label="Rich UI" sub="terminal" />

        <FlowConnector x1={112} y1={94} x2={132} y2={94} markerId={marker} />
        <FlowConnector x1={220} y1={94} x2={240} y2={94} markerId={marker} />
        <FlowConnector x1={328} y1={94} x2={348} y2={94} markerId={marker} />
        <FlowConnector x1={436} y1={94} x2={456} y2={94} markerId={marker} />
        <FlowConnector x1={544} y1={94} x2={548} y2={94} markerId={marker} />

        <DiagramZone x={24} y={148} width={592} height={148} label="RUNTIME SURFACE">
          <rect
            x={40}
            y={176}
            width={560}
            height={96}
            fill={PCB.void}
            stroke={PCB.viaBright}
            strokeWidth="1"
            rx="3"
          />
          {[0, 1, 2, 3, 4, 5].map((row) => (
            <rect
              key={`ikumplay-bar-${row}`}
              x={52 + row * 18}
              y={228 - row * 6}
              width={8}
              height={24 + row * 8}
              fill={PCB.copper}
              opacity={0.35 + row * 0.1}
              rx="1"
            />
          ))}
          <text
            x={320}
            y={200}
            fill={PCB.phosphor}
            fontSize="9"
            textAnchor="middle"
            fontFamily="var(--font-mono, ui-monospace, monospace)"
          >
            spectrogram · keyboard controls · cleanup
          </text>
        </DiagramZone>
      </DiagramBackdrop>

      <defs>
        <ArrowMarker id={marker} color={PCB.copper} />
      </defs>
    </svg>
  );
}

export function RoastivatorDiagram({ className = "" }: DiagramProps) {
  const marker = "roastivator-arrow-phosphor";

  return (
    <svg
      viewBox="0 0 640 360"
      className={className}
      role="img"
      aria-labelledby={ROASTIVATOR_TITLE_ID}
    >
      <AccessibleDiagramTitle id={ROASTIVATOR_TITLE_ID}>
        roastivator Next.js web application accepting a GitHub username, fetching public profile and
        repository signals, applying deterministic rules on commits, repository names, activity, stars,
        forks, followers, and emojis, and rendering humorous roasting output through a step-based flow.
      </AccessibleDiagramTitle>

      <DiagramBackdrop width={640} height={360} channelId="SIG-RST · PROFILE ROAST">
        <DiagramZone x={12} y={40} width={120} height={240} label="INPUT">
          <DiagramNode x={24} y={120} width={96} height={48} label="Username" sub="step form" />
        </DiagramZone>

        <DiagramZone x={148} y={40} width={160} height={240} label="GITHUB SIGNALS">
          <DiagramNode x={164} y={72} width={128} height={36} label="Commits" sub="messages" />
          <DiagramNode x={164} y={116} width={128} height={36} label="Repos" sub="names · stars" />
          <DiagramNode x={164} y={160} width={128} height={36} label="Activity" sub="forks · emojis" />
          <DiagramNode x={164} y={204} width={128} height={36} label="Followers" sub="public API" />
        </DiagramZone>

        <DiagramZone x={324} y={40} width={140} height={240} label="RULE ENGINE">
          <DiagramNode
            x={340}
            y={104}
            width={108}
            height={56}
            label="Rule sets"
            sub="deterministic"
          />
          <DiagramNode
            x={340}
            y={176}
            width={108}
            height={44}
            label="Random pick"
            sub="variation"
            kind="experimental"
          />
        </DiagramZone>

        <DiagramZone x={480} y={40} width={148} height={240} label="OUTPUT">
          <DiagramNode
            x={496}
            y={104}
            width={116}
            height={48}
            label="Loading step"
            sub="motion UI"
          />
          <DiagramNode
            x={496}
            y={168}
            width={116}
            height={56}
            label="Roast result"
            sub="playful copy"
          />
        </DiagramZone>

        <FlowConnector x1={132} y1={144} x2={148} y2={144} markerId={marker} />
        <FlowConnector x1={308} y1={144} x2={324} y2={132} markerId={marker} />
        <FlowConnector x1={464} y1={132} x2={480} y2={128} markerId={marker} />
        <FlowConnector x1={394} y1={160} x2={552} y2={196} markerId={marker} kind="experimental" />

        <text
          x={320}
          y={312}
          fill={PCB.silk}
          fontSize="8"
          textAnchor="middle"
          fontFamily="var(--font-mono, ui-monospace, monospace)"
        >
          rules-based · not model-backed AI
        </text>
      </DiagramBackdrop>

      <defs>
        <ArrowMarker id={marker} />
      </defs>
    </svg>
  );
}

export function DsnsimDiagram({ className = "" }: DiagramProps) {
  const marker = "dsnsim-arrow-phosphor";
  const markerRf = "dsnsim-arrow-copper";

  return (
    <svg
      viewBox="0 0 640 360"
      className={className}
      role="img"
      aria-labelledby={DSNSIM_TITLE_ID}
    >
      <AccessibleDiagramTitle id={DSNSIM_TITLE_ID}>
        DSNSim educational Arduino radio demonstration with serial command mode switching between uplink
        transmit and downlink receive paths, fixed-message transmission over four-thirty-three megahertz
        RF, LED feedback, and a servo sweep representing a dish antenna.
      </AccessibleDiagramTitle>

      <DiagramBackdrop width={640} height={360} channelId="SIG-DSN · RF DEMONSTRATION">
        <DiagramZone x={12} y={40} width={140} height={240} label="CONTROL">
          <DiagramNode
            x={24}
            y={88}
            width={116}
            height={44}
            label="Serial commands"
            sub="mode switch"
          />
          <DiagramNode x={24} y={148} width={116} height={44} label="Uplink mode" sub="transmit" />
          <DiagramNode x={24} y={208} width={116} height={44} label="Downlink mode" sub="receive" />
        </DiagramZone>

        <DiagramZone x={168} y={40} width={160} height={240} label="RF LINK">
          <path
            d="M248 120 Q320 80 392 120"
            fill="none"
            stroke={PCB.copper}
            strokeWidth="1.5"
            markerEnd={`url(#${markerRf})`}
          />
          <path
            d="M392 200 Q320 240 248 200"
            fill="none"
            stroke={PCB.phosphorDim}
            strokeWidth="1.5"
            strokeDasharray="4 3"
            markerEnd={`url(#${marker})`}
          />
          <text
            x={320}
            y={108}
            fill={PCB.copper}
            fontSize="8"
            textAnchor="middle"
            fontFamily="var(--font-mono, ui-monospace, monospace)"
          >
            433 MHz uplink
          </text>
          <text
            x={320}
            y={228}
            fill={PCB.silk}
            fontSize="8"
            textAnchor="middle"
            fontFamily="var(--font-mono, ui-monospace, monospace)"
          >
            downlink return
          </text>
          <DiagramNode
            x={200}
            y={156}
            width={96}
            height={44}
            label="Fixed payload"
            sub="demo message"
          />
        </DiagramZone>

        <DiagramZone x={344} y={40} width={140} height={240} label="FEEDBACK">
          <DiagramNode x={360} y={104} width={108} height={44} label="LED states" sub="link status" />
          <DiagramNode x={360} y={168} width={108} height={44} label="Servo sweep" sub="dish arc" />
        </DiagramZone>

        <DiagramZone x={500} y={40} width={128} height={240} label="NOTE">
          <text
            x={520}
            y={120}
            fill={PCB.silk}
            fontSize="9"
            fontFamily="var(--font-sans, system-ui, sans-serif)"
          >
            Educational RF demo inspired by deep-space comms concepts — not a real DSN protocol.
          </text>
        </DiagramZone>

        <FlowConnector x1={152} y1={170} x2={168} y2={178} markerId={marker} />
        <FlowConnector x1={328} y1={126} x2={344} y2={126} markerId={markerRf} kind="experimental" />
        <FlowConnector x1={328} y1={190} x2={344} y2={190} markerId={marker} />
      </DiagramBackdrop>

      <defs>
        <ArrowMarker id={marker} />
        <ArrowMarker id={markerRf} color={PCB.copper} />
      </defs>
    </svg>
  );
}

export function AuraDiagram({ className = "" }: DiagramProps) {
  const marker = "aura-arrow-silk";

  return (
    <svg
      viewBox="0 0 640 360"
      className={className}
      role="img"
      aria-labelledby={AURA_TITLE_ID}
    >
      <AccessibleDiagramTitle id={AURA_TITLE_ID}>
        aura incubator concept for physical-first automation using NFC and weight-sensing pucks to derive
        contextual object state and trigger proposed integrations with Slack, Spotify, Home Assistant,
        and Notion through ESP32-S3 and PN532-class hardware with a progressive web app surface.
      </AccessibleDiagramTitle>

      <DiagramBackdrop width={640} height={360} channelId="SIG-AUR · PUCK CONCEPT">
        <DiagramZone x={12} y={40} width={140} height={240} label="PUCK · PROPOSED">
          <circle cx={82} cy={108} r="28" fill={PCB.via} stroke={PCB.copper} strokeWidth="1.25" />
          <text
            x={82}
            y={104}
            fill={PCB.solder}
            fontSize="9"
            textAnchor="middle"
            fontFamily="var(--font-mono, ui-monospace, monospace)"
          >
            NFC
          </text>
          <text
            x={82}
            y={118}
            fill={PCB.silk}
            fontSize="8"
            textAnchor="middle"
            fontFamily="var(--font-mono, ui-monospace, monospace)"
          >
            tag
          </text>
          <DiagramNode
            x={24}
            y={152}
            width={116}
            height={44}
            label="Weight sense"
            sub="object state"
            kind="research"
          />
          <DiagramNode
            x={24}
            y={212}
            width={116}
            height={44}
            label="ESP32-S3"
            sub="PN532 class"
            kind="research"
          />
        </DiagramZone>

        <DiagramZone x={168} y={40} width={140} height={240} label="CONTEXT">
          <DiagramNode
            x={184}
            y={120}
            width={108}
            height={56}
            label="Context map"
            sub="puck identity"
            kind="research"
          />
          <DiagramNode
            x={184}
            y={196}
            width={108}
            height={44}
            label="PWA shell"
            sub="proposed"
            kind="incomplete"
          />
        </DiagramZone>

        <DiagramZone x={324} y={40} width={188} height={240} label="PROPOSED ACTIONS">
          <DiagramNode
            x={340}
            y={72}
            width={156}
            height={36}
            label="Slack"
            sub="notify"
            kind="incomplete"
          />
          <DiagramNode
            x={340}
            y={116}
            width={156}
            height={36}
            label="Spotify"
            sub="playback"
            kind="incomplete"
          />
          <DiagramNode
            x={340}
            y={160}
            width={156}
            height={36}
            label="Home Assistant"
            sub="automations"
            kind="incomplete"
          />
          <DiagramNode
            x={340}
            y={204}
            width={156}
            height={36}
            label="Notion"
            sub="log / task"
            kind="incomplete"
          />
        </DiagramZone>

        <DiagramZone x={524} y={40} width={104} height={240} label="STATUS">
          <LegendItem x={536} y={96} kind="research" label="concept HW" />
          <LegendItem x={536} y={118} kind="incomplete" label="integrations" />
          <text
            x={536}
            y={168}
            fill={PCB.silk}
            fontSize="8"
            fontFamily="var(--font-mono, ui-monospace, monospace)"
          >
            incubator
          </text>
        </DiagramZone>

        <FlowConnector x1={152} y1={174} x2={168} y2={148} markerId={marker} kind="research" />
        <FlowConnector x1={308} y1={148} x2={324} y2={126} markerId={marker} kind="incomplete" />
        <FlowConnector x1={308} y1={218} x2={324} y2={222} markerId={marker} kind="incomplete" />
      </DiagramBackdrop>

      <defs>
        <ArrowMarker id={marker} color={PCB.silk} />
      </defs>
    </svg>
  );
}

export function LearningStructuresDiagram({ className = "" }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 640 360"
      className={className}
      role="img"
      aria-labelledby={LEARNING_TITLE_ID}
    >
      <AccessibleDiagramTitle id={LEARNING_TITLE_ID}>
        Learning archive grouping Queues, Trees, and Linked-Lists repositories as small data-structure
        practice exercises with minimal documentation, presented as study material rather than production
        software projects.
      </AccessibleDiagramTitle>

      <DiagramBackdrop width={640} height={360} channelId="SIG-LRN · DATA STRUCTURES">
        <DiagramZone x={12} y={40} width={196} height={240} label="QUEUES">
          <rect x={36} y={88} width={24} height={120} fill={PCB.via} stroke={PCB.phosphor} rx="2" />
          {[0, 1, 2, 3].map((slot) => (
            <rect
              key={`queue-slot-${slot}`}
              x={40}
              y={168 - slot * 24}
              width={16}
              height={18}
              fill={PCB.copper}
              opacity={0.5 + slot * 0.12}
              rx="1"
            />
          ))}
          <text
            x={104}
            y={148}
            fill={PCB.solder}
            fontSize="10"
            fontFamily="var(--font-sans, system-ui, sans-serif)"
          >
            FIFO practice
          </text>
          <text
            x={104}
            y={164}
            fill={PCB.silk}
            fontSize="8"
            fontFamily="var(--font-mono, ui-monospace, monospace)"
          >
            enqueue · dequeue
          </text>
        </DiagramZone>

        <DiagramZone x={220} y={40} width={196} height={240} label="TREES">
          <circle cx={318} cy={108} r="10" fill={PCB.copper} />
          <line x1={318} y1={118} x2={278} y2={148} stroke={PCB.phosphorDim} strokeWidth="1.25" />
          <line x1={318} y1={118} x2={358} y2={148} stroke={PCB.phosphorDim} strokeWidth="1.25" />
          <circle cx={278} cy={156} r="8" fill={PCB.via} stroke={PCB.phosphor} />
          <circle cx={358} cy={156} r="8" fill={PCB.via} stroke={PCB.phosphor} />
          <line x1={278} y1={164} x2={258} y2={196} stroke={PCB.phosphorDim} strokeWidth="1" />
          <line x1={278} y1={164} x2={298} y2={196} stroke={PCB.phosphorDim} strokeWidth="1" />
          <circle cx={258} cy={204} r="6" fill={PCB.copper} opacity="0.8" />
          <circle cx={298} cy={204} r="6" fill={PCB.copper} opacity="0.8" />
          <text
            x={318}
            y={232}
            fill={PCB.silk}
            fontSize="8"
            textAnchor="middle"
            fontFamily="var(--font-mono, ui-monospace, monospace)"
          >
            traversal exercises
          </text>
        </DiagramZone>

        <DiagramZone x={428} y={40} width={200} height={240} label="LINKED-LISTS">
          <g>
            {[0, 1, 2].map((node) => (
              <g key={`list-node-${node}`}>
                <rect
                  x={452 + node * 56}
                  y={128}
                  width={40}
                  height={32}
                  fill={PCB.via}
                  stroke={PCB.phosphor}
                  rx="2"
                />
                <text
                  x={472 + node * 56}
                  y={148}
                  fill={PCB.solder}
                  fontSize="9"
                  textAnchor="middle"
                  fontFamily="var(--font-mono, ui-monospace, monospace)"
                >
                  {node + 1}
                </text>
                {node < 2 ? (
                  <line
                    x1={492 + node * 56}
                    y1={144}
                    x2={508 + node * 56}
                    y2={144}
                    stroke={PCB.copper}
                    strokeWidth="1.5"
                    markerEnd="url(#learning-list-arrow)"
                  />
                ) : null}
              </g>
            ))}
          </g>
          <text
            x={528}
            y={188}
            fill={PCB.silk}
            fontSize="8"
            textAnchor="middle"
            fontFamily="var(--font-mono, ui-monospace, monospace)"
          >
            pointer practice
          </text>
        </DiagramZone>

        <text
          x={320}
          y={312}
          fill={PCB.silk}
          fontSize="8"
          textAnchor="middle"
          fontFamily="var(--font-mono, ui-monospace, monospace)"
        >
          grouped learning archive · not featured as flagship software
        </text>
      </DiagramBackdrop>

      <defs>
        <ArrowMarker id="learning-list-arrow" color={PCB.copper} />
      </defs>
    </svg>
  );
}

export function getSupportingDiagram(slug: string): ComponentType<DiagramProps> | null {
  switch (slug) {
    case "intellichair":
      return IntellichairDiagram;
    case "buildin":
      return BuildInDiagram;
    case "ikumplay":
      return IkumplayDiagram;
    case "roastivator":
      return RoastivatorDiagram;
    case "dsnsim":
      return DsnsimDiagram;
    case "aura":
      return AuraDiagram;
    case "learning-structures":
      return LearningStructuresDiagram;
    default:
      return null;
  }
}
