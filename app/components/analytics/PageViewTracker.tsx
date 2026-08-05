"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const VISITOR_KEY = "ss_vid";
const SESSION_KEY = "ss_sid";
const SESSION_TS_KEY = "ss_sid_ts";
const SESSION_TTL_MS = 30 * 60 * 1000;

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function readOrCreate(key: string, storage: Storage): string {
  const existing = storage.getItem(key);
  if (existing) return existing;
  const id = uuid();
  storage.setItem(key, id);
  return id;
}

function getSessionId(): string {
  const now = Date.now();
  const tsRaw = sessionStorage.getItem(SESSION_TS_KEY);
  const ts = tsRaw ? Number(tsRaw) : 0;
  if (!ts || now - ts > SESSION_TTL_MS) {
    const id = uuid();
    sessionStorage.setItem(SESSION_KEY, id);
    sessionStorage.setItem(SESSION_TS_KEY, String(now));
    return id;
  }
  sessionStorage.setItem(SESSION_TS_KEY, String(now));
  return readOrCreate(SESSION_KEY, sessionStorage);
}

/**
 * Fires one page-view beacon per pathname change on marketing pages.
 * Skips /admin. Soft-fails silently.
 */
export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;

    try {
      const visitorId = readOrCreate(VISITOR_KEY, localStorage);
      const sessionId = getSessionId();
      void fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          referrer: document.referrer || null,
          visitorId,
          sessionId,
        }),
        keepalive: true,
      }).catch(() => {
        // ignore
      });
    } catch {
      // Private mode / blocked storage — skip tracking.
    }
  }, [pathname]);

  return null;
}
