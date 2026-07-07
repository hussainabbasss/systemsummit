/**
 * Placeholder partner MUNs for the marquee. Fabricated names - no real
 * trademarks. Rendered as monochrome SVG wordmark/crests via <MunLogo>.
 * `kind` picks the crest glyph; `abbr` is the short mark shown alongside.
 */
export type Mun = {
  name: string;
  abbr: string;
  kind: "globe" | "gavel" | "torch" | "column" | "star" | "shield";
};

export const muns: Mun[] = [
  { name: "Geneva International MUN", abbr: "GIMUN", kind: "globe" },
  { name: "Meridian MUN", abbr: "MMUN", kind: "star" },
  { name: "Cambridge Delegates' Council", abbr: "CDC", kind: "column" },
  { name: "Aurora MUN", abbr: "AMUN", kind: "torch" },
  { name: "Summit Diplomacy Forum", abbr: "SDF", kind: "shield" },
  { name: "Pacific Rim MUN", abbr: "PRMUN", kind: "globe" },
  { name: "Athena Model UN", abbr: "AthMUN", kind: "gavel" },
  { name: "Northgate MUN", abbr: "NGMUN", kind: "shield" },
  { name: "Solstice Diplomatic Conference", abbr: "SDC", kind: "torch" },
  { name: "Vanguard MUN", abbr: "VMUN", kind: "star" },
];
