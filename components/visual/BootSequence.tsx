"use client";

import { useEffect, useState } from "react";

type BootSequenceProps = {
  lines: readonly string[];
};

export function BootSequence({ lines }: BootSequenceProps) {
  const [display, setDisplay] = useState("");
  const [showCaret, setShowCaret] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const frame = window.requestAnimationFrame(() => {
        setDisplay(lines.join("\n"));
        setShowCaret(false);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    let cancelled = false;
    let lineIndex = 0;
    let charIndex = 0;
    let buffer = "";

    const tick = () => {
      if (cancelled) return;
      const line = lines[lineIndex];
      if (!line) {
        setShowCaret(true);
        return;
      }
      if (charIndex < line.length) {
        buffer += line[charIndex];
        charIndex += 1;
        setDisplay(buffer);
        window.setTimeout(tick, 18 + Math.floor(Math.random() * 22));
        return;
      }
      if (lineIndex < lines.length - 1) {
        buffer += "\n";
        setDisplay(buffer);
        lineIndex += 1;
        charIndex = 0;
        window.setTimeout(tick, 420);
        return;
      }
      setShowCaret(true);
    };

    tick();
    return () => {
      cancelled = true;
    };
  }, [lines]);

  return (
    <div className="boot-line mono" aria-live="polite">
      {display.split("\n").map((line, index, parts) => (
        <span key={`${index}-${line}`}>
          {line}
          {index < parts.length - 1 ? <br /> : null}
        </span>
      ))}
      {showCaret ? <span className="caret" aria-hidden /> : null}
    </div>
  );
}
