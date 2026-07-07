"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll hook. Content is ALWAYS rendered/visible — this only adds a
 * subtle enter transition when the element scrolls into view. Under reduced
 * motion (or without IntersectionObserver) it resolves to "revealed" instantly,
 * so visibility is never gated on scroll.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || typeof IntersectionObserver === "undefined" || !el) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed };
}
