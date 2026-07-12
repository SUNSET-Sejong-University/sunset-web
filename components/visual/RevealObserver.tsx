"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function revealNode(node: Element) {
  node.classList.add("is-visible");
}

function revealAll(nodes: NodeListOf<Element>) {
  nodes.forEach(revealNode);
}

function isInViewport(node: Element) {
  const rect = node.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    root.classList.add("reveal-ready");

    let intersectionObserver: IntersectionObserver | null = null;

    const syncReduced = () => {
      if (motionQuery.matches) {
        root.classList.add("reveal-reduced");
        intersectionObserver?.disconnect();
        intersectionObserver = null;
        revealAll(document.querySelectorAll(".reveal"));
        return true;
      }
      root.classList.remove("reveal-reduced");
      return false;
    };

    const registerTargets = () => {
      if (syncReduced()) return;

      intersectionObserver?.disconnect();
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealNode(entry.target);
              intersectionObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
      );

      document.querySelectorAll(".reveal:not(.is-visible)").forEach((node) => {
        if (isInViewport(node)) {
          revealNode(node);
          return;
        }
        intersectionObserver?.observe(node);
      });
    };

    const onMotionChange = () => {
      registerTargets();
    };

    const mutationObserver = new MutationObserver((mutations) => {
      const hasNewReveal = mutations.some((mutation) =>
        Array.from(mutation.addedNodes).some(
          (node) =>
            node instanceof Element &&
            (node.classList.contains("reveal") || node.querySelector(".reveal") !== null),
        ),
      );
      if (hasNewReveal) registerTargets();
    });

    registerTargets();
    motionQuery.addEventListener("change", onMotionChange);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      mutationObserver.disconnect();
      intersectionObserver?.disconnect();
      revealAll(document.querySelectorAll(".reveal"));
    };
  }, [pathname]);

  return null;
}
