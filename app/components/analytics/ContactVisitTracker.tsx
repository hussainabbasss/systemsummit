"use client";

import { useEffect } from "react";

type NavigatorExtras = Navigator & {
  connection?: { effectiveType?: string; downlink?: number; saveData?: boolean };
  deviceMemory?: number;
  userAgentData?: { platform?: string; mobile?: boolean; brands?: unknown };
};

function safeGet(storage: () => Storage, key: string): string | null {
  try {
    return storage().getItem(key);
  } catch {
    return null;
  }
}

/**
 * Records one row in `contact_visits` each time the contact page is opened.
 * Reuses PageViewTracker's visitor/session ids so visits can be joined.
 */
export function ContactVisitTracker() {
  useEffect(() => {
    const nav = navigator as NavigatorExtras;
    const params = new URLSearchParams(location.search);
    const utm = Object.fromEntries(
      [...params].filter(([key]) => key.startsWith("utm_")),
    );

    void fetch("/api/track/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        path: location.pathname,
        query: location.search || null,
        referrer: document.referrer || null,
        utm: Object.keys(utm).length ? utm : null,
        visitorId: safeGet(() => localStorage, "ss_vid"),
        sessionId: safeGet(() => sessionStorage, "ss_sid"),
        client: {
          language: nav.language,
          languages: nav.languages,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          tzOffsetMin: new Date().getTimezoneOffset(),
          screen: { w: screen.width, h: screen.height, dpr: devicePixelRatio },
          viewport: { w: innerWidth, h: innerHeight },
          colorScheme: matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light",
          touch: nav.maxTouchPoints,
          cpuCores: nav.hardwareConcurrency,
          deviceMemoryGb: nav.deviceMemory,
          platform: nav.userAgentData?.platform ?? nav.platform,
          mobile: nav.userAgentData?.mobile,
          connection: nav.connection
            ? {
                type: nav.connection.effectiveType,
                downlinkMbps: nav.connection.downlink,
                saveData: nav.connection.saveData,
              }
            : undefined,
          cookiesEnabled: nav.cookieEnabled,
          doNotTrack: nav.doNotTrack,
        },
      }),
    }).catch(() => {
      // Analytics must never break the page.
    });
  }, []);

  return null;
}
