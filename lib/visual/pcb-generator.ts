export type BoardSymbolType = "resistor" | "capacitor" | "ic";

export type BoardComponent = {
  x: number;
  y: number;
  type: BoardSymbolType;
};

export type BoardTrace = {
  id: string;
  d: string;
  lit: boolean;
  junctions: readonly [number, number][];
  midX: number;
  midY: number;
};

export type BoardModel = {
  width: number;
  height: number;
  traces: readonly BoardTrace[];
  components: readonly BoardComponent[];
};

export type GenerateBoardOptions = {
  width?: number;
  height?: number;
  seed?: number;
  traceCount?: number;
  columns?: number;
  rows?: number;
  litCount?: number;
};

function createRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateBoard(options: GenerateBoardOptions = {}): BoardModel {
  const w = options.width ?? 1440;
  const h = options.height ?? 900;
  const seed = options.seed ?? 1;
  const numTraces = options.traceCount ?? 26;
  const cols = options.columns ?? 9;
  const rows = options.rows ?? 6;
  const litCount = options.litCount ?? 4;
  const rand = createRng(seed);

  const cellW = w / cols;
  const cellH = h / rows;
  const traces: BoardTrace[] = [];
  const symbolTypes: BoardSymbolType[] = ["resistor", "capacitor", "ic"];
  const components: BoardComponent[] = [];

  for (let i = 0; i < numTraces; i++) {
    const gx = i % cols;
    const gy = Math.floor(i / cols) % rows;
    let x = gx * cellW + rand() * cellW;
    let y = gy * cellH + rand() * cellH;

    const segs = 2 + Math.floor(rand() * 3);
    let d = `M ${x.toFixed(0)} ${y.toFixed(0)}`;
    const junctions: [number, number][] = [];
    let midX = x;
    let midY = y;

    for (let j = 0; j < segs; j++) {
      const horizontal = rand() > 0.5;
      if (horizontal) {
        const nx = Math.max(20, Math.min(w - 20, x + (rand() - 0.5) * 620));
        d += ` H ${nx.toFixed(0)}`;
        x = nx;
      } else {
        const ny = Math.max(20, Math.min(h - 20, y + (rand() - 0.5) * 420));
        d += ` V ${ny.toFixed(0)}`;
        y = ny;
      }
      junctions.push([x, y]);
      if (j === Math.floor(segs / 2)) {
        midX = x;
        midY = y;
      }
    }

    traces.push({
      id: `tr${i}`,
      d,
      lit: i % Math.ceil(numTraces / litCount) === 0,
      junctions,
      midX,
      midY,
    });
  }

  traces.forEach((t, idx) => {
    if (rand() > 0.58 && t.junctions.length > 0) {
      const junctionIndex = Math.floor(rand() * t.junctions.length);
      const junction = t.junctions[junctionIndex];
      if (junction) {
        const [jx, jy] = junction;
        components.push({
          x: jx,
          y: jy,
          type: symbolTypes[idx % symbolTypes.length] ?? "resistor",
        });
      }
    }
  });

  return { width: w, height: h, traces, components };
}
