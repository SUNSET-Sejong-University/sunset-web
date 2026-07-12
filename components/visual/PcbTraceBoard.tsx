"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { generateBoard, type BoardComponent } from "@/lib/visual/pcb-generator";

type PcbTraceBoardProps = {
  seed?: number;
  height?: number;
  litCount?: number;
  interactive?: boolean;
  className?: string;
};

function BoardSymbol({ component }: { component: BoardComponent }) {
  const { x: cx, y: cy, type } = component;
  if (type === "resistor") {
    const x0 = cx - 26;
    const yc = cy;
    return (
      <g className="board-component">
        <path
          d={`M ${x0} ${yc} h 6 l 4 -8 l 6 16 l 6 -16 l 6 16 l 6 -16 l 4 8 h 6`}
          fill="none"
        />
      </g>
    );
  }
  if (type === "capacitor") {
    return (
      <g className="board-component">
        <line x1={cx - 18} y1={cy} x2={cx - 4} y2={cy} />
        <line x1={cx - 4} y1={cy - 11} x2={cx - 4} y2={cy + 11} />
        <line x1={cx + 4} y1={cy - 11} x2={cx + 4} y2={cy + 11} />
        <line x1={cx + 4} y1={cy} x2={cx + 18} y2={cy} />
      </g>
    );
  }
  return (
    <g className="board-component">
      <rect x={cx - 22} y={cy - 14} width={44} height={28} rx={2} />
      <line x1={cx - 22} y1={cy - 6} x2={cx - 30} y2={cy - 6} />
      <line x1={cx - 22} y1={cy + 6} x2={cx - 30} y2={cy + 6} />
      <line x1={cx + 22} y1={cy - 6} x2={cx + 30} y2={cy - 6} />
      <line x1={cx + 22} y1={cy + 6} x2={cx + 30} y2={cy + 6} />
    </g>
  );
}

export function PcbTraceBoard({
  seed = 7,
  height = 900,
  litCount = 4,
  interactive = true,
  className = "hero-board",
}: PcbTraceBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<SVGGElement>(null);
  const frontRef = useRef<SVGGElement>(null);
  const [nearIds, setNearIds] = useState<ReadonlySet<string>>(new Set());
  const model = useMemo(
    () => generateBoard({ seed, height, litCount }),
    [seed, height, litCount],
  );

  useEffect(() => {
    if (!interactive) return;
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reducedMotion || coarsePointer) return;

    const traceEls = Array.from(container.querySelectorAll<SVGPathElement>(".board-trace"));
    let raf: number | null = null;
    let pointer: { x: number; y: number } | null = null;

    const onMove = (event: MouseEvent) => {
      const svg = container.querySelector("svg");
      if (!svg) return;
      const rect = container.getBoundingClientRect();
      const vbH = model.height;
      pointer = {
        x: ((event.clientX - rect.left) / rect.width) * model.width,
        y: ((event.clientY - rect.top) / rect.height) * vbH,
      };
      if (raf === null) {
        raf = requestAnimationFrame(update);
      }
    };

    const onLeave = () => {
      pointer = null;
      setNearIds(new Set());
      traceEls.forEach((el) => el.classList.remove("board-trace-near"));
    };

    const update = () => {
      raf = null;
      if (!pointer) return;
      const next = new Set<string>();
      traceEls.forEach((el) => {
        const mx = parseFloat(el.getAttribute("data-mx") ?? "0");
        const my = parseFloat(el.getAttribute("data-my") ?? "0");
        const dx = pointer!.x - mx;
        const dy = pointer!.y - my;
        const near = dx * dx + dy * dy < 220 * 220;
        el.classList.toggle("board-trace-near", near);
        const id = el.id;
        if (near && id) next.add(id);
      });
      setNearIds(next);
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    let parallaxRaf: number | null = null;
    const onScroll = () => {
      if (parallaxRaf !== null) return;
      parallaxRaf = requestAnimationFrame(() => {
        parallaxRaf = null;
        const rect = container.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / (rect.height || 1)));
        if (backRef.current) {
          backRef.current.style.transform = `translateY(${progress * 22}px)`;
        }
        if (frontRef.current) {
          frontRef.current.style.transform = `translateY(${progress * 8}px)`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
      if (parallaxRaf !== null) cancelAnimationFrame(parallaxRaf);
    };
  }, [interactive, model.height, model.width]);

  return (
    <div ref={containerRef} className={className} aria-hidden>
      <svg
        viewBox={`0 0 ${model.width} ${model.height}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <g ref={backRef} className="board-layer-back">
          {model.traces.map((trace) => (
            <path
              key={trace.id}
              id={trace.id}
              className={`board-trace${nearIds.has(trace.id) ? " board-trace-near" : ""}`}
              data-mx={trace.midX.toFixed(0)}
              data-my={trace.midY.toFixed(0)}
              d={trace.d}
            />
          ))}
        </g>
        <g ref={frontRef} className="board-layer-front">
          {model.traces
            .filter((trace) => trace.lit)
            .map((trace) => (
              <path key={`${trace.id}-lit`} className="board-trace-lit" d={trace.d} />
            ))}
          {model.traces.flatMap((trace) =>
            trace.junctions.map(([jx, jy], idx) => {
              const isLast = idx === trace.junctions.length - 1;
              const cls = trace.lit && isLast ? "board-via-lit" : "board-via";
              const r = trace.lit && isLast ? 5 : 3.5;
              return (
                <circle
                  key={`${trace.id}-via-${idx}`}
                  className={cls}
                  cx={jx.toFixed(0)}
                  cy={jy.toFixed(0)}
                  r={r}
                />
              );
            }),
          )}
          {model.components.map((component, index) => (
            <BoardSymbol key={`${component.type}-${component.x}-${component.y}-${index}`} component={component} />
          ))}
        </g>
      </svg>
    </div>
  );
}
