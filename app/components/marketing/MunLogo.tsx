import type { Mun } from "@/app/content/muns";

/** Small monochrome crest glyphs - abstract, brand-neutral partner marks. */
function Crest({ kind }: { kind: Mun["kind"] }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (kind) {
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17M12 3.5c2.4 2.4 2.4 14.6 0 17M12 3.5c-2.4 2.4-2.4 14.6 0 17" />
        </svg>
      );
    case "gavel":
      return (
        <svg {...common}>
          <path d="M9 8l4-4 3 3-4 4zM6 20h8M8 14l4 4" />
          <path d="M13.5 5.5l3 3" />
        </svg>
      );
    case "torch":
      return (
        <svg {...common}>
          <path d="M12 3c2 2 3 3.5 3 5.5A3 3 0 0 1 9 8.5C9 6.5 10 5 12 3zM10 14h4l-1 6h-2z" />
        </svg>
      );
    case "column":
      return (
        <svg {...common}>
          <path d="M4 8l8-4 8 4M5 8v9M12 8v9M19 8v9M4 20h16M4 8h16" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="M12 3.5l2.4 5 5.5.6-4.1 3.7 1.2 5.4L12 20.4 6.9 18l1.2-5.4L4 8.9l5.6-.6z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 2.5v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10v-5z" />
          <path d="M9 11.5l2 2 4-4" />
        </svg>
      );
  }
}

/** A single partner MUN mark: crest + abbreviation, unified muted tint. */
export function MunLogo({ mun }: { mun: Mun }) {
  return (
    <div
      className="flex select-none items-center gap-2.5 text-text-muted opacity-80 transition-opacity duration-[var(--dur-base)] hover:opacity-100"
      title={mun.name}
    >
      <Crest kind={mun.kind} />
      <span className="font-display text-base font-semibold tracking-[var(--tracking-heading)]">
        {mun.abbr}
      </span>
    </div>
  );
}
