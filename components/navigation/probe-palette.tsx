"use client";

import { communityLinks } from "@/lib/content/community";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Compass, FileCode2, Hash, Mail, Search, X } from "lucide-react";

import { ORG_CONTACT_EMAIL } from "@/lib/content/org";
import { projects } from "@/lib/content/projects/data";
import { GITHUB_ORG_URL } from "@/lib/content/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/utils/paths";

export type ProbeCommand = {
  id: string;
  label: string;
  sub: string;
  run: () => void;
};

type ProbePaletteProps = {
  locale: Locale;
  labels: Dictionary["probe"];
};

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Renders a footer hint like "↑↓ navigate" with the key part in a bordered <kbd>. */
function ProbeHint({ hint }: { hint: string }) {
  const spaceIndex = hint.indexOf(" ");
  if (spaceIndex === -1) {
    return <span>{hint}</span>;
  }
  const key = hint.slice(0, spaceIndex);
  const text = hint.slice(spaceIndex + 1);
  return (
    <span>
      <kbd>{key.toUpperCase()}</kbd>
      {text}
    </span>
  );
}

export function ProbePalette({ locale, labels }: ProbePaletteProps) {
  const router = useRouter();
  const pathname = usePathname() ?? localizedPath(locale);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const dialogTitleId = useId();

  const commands = useMemo<ProbeCommand[]>(() => {
    const home = localizedPath(locale);
    const go = (path: string) => router.push(path);
    const scrollTo = (hash: string) => {
      if (pathname === home || pathname === `${home}/`) {
        document.querySelector(hash)?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        });
      } else {
        router.push(`${home}${hash}`);
      }
    };

    const c = labels.commands;
    const base: ProbeCommand[] = [
      ...communityLinks.map((link) => ({ id: link.path, label: link.label[locale], sub: c.subPage, run: () => go(localizedPath(locale, link.path)) })),
      { id: "home", label: c.home, sub: c.subPage, run: () => go(home) },
      { id: "about", label: c.about, sub: c.subPage, run: () => go(localizedPath(locale, "about")) },
      {
        id: "projects",
        label: c.projects,
        sub: c.subPage,
        run: () => go(localizedPath(locale, "projects")),
      },
      { id: "scope", label: c.scope, sub: c.subSection, run: () => scrollTo("#scope") },
      { id: "mission", label: c.mission, sub: c.subSection, run: () => scrollTo("#mission") },
      { id: "featured", label: c.featured, sub: c.subSection, run: () => scrollTo("#projects") },
      { id: "how", label: c.how, sub: c.subSection, run: () => scrollTo("#how") },
      { id: "stack", label: c.stack, sub: c.subSection, run: () => scrollTo("#stack") },
      { id: "join-section", label: c.join, sub: c.subSection, run: () => scrollTo("#join") },
      {
        id: "join-page",
        label: c.joinPage,
        sub: c.subPage,
        run: () => go(localizedPath(locale, "join")),
      },
      { id: "people", label: c.people, sub: c.subPage, run: () => go(localizedPath(locale, "people")) },
      {
        id: "structure",
        label: c.structure,
        sub: c.subPage,
        run: () => go(localizedPath(locale, "people/structure")),
      },
      {
        id: "timeline",
        label: c.timeline,
        sub: c.subPage,
        run: () => go(localizedPath(locale, "timeline")),
      },
      {
        id: "github",
        label: c.github,
        sub: c.subExternal,
        run: () => window.open(GITHUB_ORG_URL, "_blank", "noopener"),
      },
      {
        id: "email",
        label: c.email,
        sub: c.subContact,
        run: () => {
          const link = document.createElement("a");
          link.href = `mailto:${ORG_CONTACT_EMAIL}`;
          link.rel = "noopener";
          document.body.append(link);
          link.click();
          link.remove();
        },
      },
    ];

    projects.forEach((project) => {
      base.push({
        id: `project-${project.slug}`,
        label: c.projectCaseStudy.replace("{name}", project.name),
        sub: c.subProject,
        run: () => go(localizedPath(locale, `projects/${project.slug}`)),
      });
      project.repositories.forEach((repo) => {
        base.push({
          id: `repo-${project.slug}-${repo.name}`,
          label: c.projectRepo.replace("{name}", repo.name),
          sub: c.subRepo,
          run: () => window.open(repo.url, "_blank", "noopener"),
        });
      });
    });

    return base;
  }, [labels.commands, locale, pathname, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (cmd) => cmd.label.toLowerCase().includes(q) || cmd.sub.toLowerCase().includes(q),
    );
  }, [commands, query]);

  const dismissProbe = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const close = dismissProbe;

  const openProbe = useCallback(() => {
    setOpen(true);
    setQuery("");
    setActiveIndex(0);
    window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 10);
  }, []);

  const runActive = useCallback(() => {
    const cmd = filtered[activeIndex];
    if (!cmd) return;
    dismissProbe();
    cmd.run();
  }, [activeIndex, dismissProbe, filtered]);

  const wasOpenRef = useRef(open);

  useEffect(() => {
    if (wasOpenRef.current && !open) {
      triggerRef.current?.focus();
    }
    wasOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const onTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", onTab);
    return () => panel.removeEventListener("keydown", onTab);
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isMeta = event.metaKey || event.ctrlKey;
      if (isMeta && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) close();
        else openProbe();
        return;
      }
      if (!open) return;
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        event.stopPropagation();
        return;
      }
      if (event.target !== inputRef.current || event.isComposing) return;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (event.key === "Enter") {
        event.preventDefault();
        runActive();
      }
    };
    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [close, filtered.length, open, openProbe, runActive]);

  const activeCommand = filtered[activeIndex];
  useEffect(() => {
    const results = resultsRef.current;
    const item = activeCommand && document.getElementById(`probe-item-${activeCommand.id}`);
    if (!open || !results || !item) return;
    const viewport = results.getBoundingClientRect();
    const option = item.getBoundingClientRect();
    if (option.bottom > viewport.bottom) results.scrollTop += option.bottom - viewport.bottom;
    if (option.top < viewport.top) results.scrollTop -= viewport.top - option.top;
  }, [activeCommand, open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="shell-control mono probe-trigger"
        aria-label={labels.openLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={openProbe}
      >
        <Search size={16} aria-hidden />
        <span className="probe-trigger-text">{labels.trigger}</span>
        <kbd>⌘K</kbd>
      </button>

      {open ? createPortal(
        <div
          className="probe-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            ref={panelRef}
            className="probe-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            lang={locale}
          >
            <div className="probe-head mono">
              <span id={dialogTitleId}>{labels.title}</span>
              <button type="button" className="probe-close shell-control shell-control--icon" aria-label={labels.closeLabel} onClick={close}><X size={18} aria-hidden /></button>
            </div>
            <div className="probe-input-row">
              <Search className="probe-prompt" size={17} aria-hidden />
              <input
                ref={inputRef}
                className="probe-input mono"
                type="search"
                role="combobox"
                aria-expanded="true"
                aria-autocomplete="list"
                value={query}
                placeholder={labels.placeholder}
                aria-label={labels.placeholder}
                aria-controls={listId}
                aria-activedescendant={
                  filtered[activeIndex] ? `probe-item-${filtered[activeIndex].id}` : undefined
                }
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
              />
            </div>
            <div ref={resultsRef} className="probe-results" id={listId} role="listbox">
              {filtered.length === 0 ? (
                <div className="probe-empty">{labels.empty}</div>
              ) : (
                filtered.map((cmd, index) => {
                  const Icon = cmd.sub === labels.commands.subSection ? Hash
                    : cmd.sub === labels.commands.subContact ? Mail
                    : cmd.sub === labels.commands.subProject ? FileCode2
                    : cmd.sub === labels.commands.subRepo || cmd.sub === labels.commands.subExternal ? ArrowUpRight
                    : Compass;
                  return (
                  <div
                    key={cmd.id}
                    id={`probe-item-${cmd.id}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    className={`probe-item${index === activeIndex ? " is-active" : ""}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      dismissProbe();
                      cmd.run();
                    }}
                  >
                    <div className="probe-item-main">
                      <Icon className="probe-item-icon" size={16} aria-hidden />
                      <span className="probe-item-label">{cmd.label}</span>
                    </div>
                    <span className="probe-item-sub">{cmd.sub}</span>
                  </div>
                  );
                })
              )}
            </div>
            <div className="probe-foot mono">
              <ProbeHint hint={labels.footNavigate} />
              <ProbeHint hint={labels.footRun} />
              <ProbeHint hint={labels.footClose} />
            </div>
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
