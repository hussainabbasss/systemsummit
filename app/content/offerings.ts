export type OfferingIcon = "globe" | "clipboard" | "dashboard" | "engine";

export type Offering = {
  id: string;
  title: string;
  blurb: string;
  icon: OfferingIcon;
  /** The Allotment Engine gets the hero treatment in the layout. */
  featured?: boolean;
  points?: string[];
};

export const offerings: Offering[] = [
  {
    id: "conference-site",
    title: "Custom conference website",
    blurb:
      "A real, branded home for your conference: committees, agendas, and announcements in one polished place. Not a link tree, not a PDF.",
    icon: "globe",
  },
  {
    id: "registration",
    title: "Registration & payments",
    blurb:
      "One clean flow from delegate sign-up to paid. Automatic confirmations, live headcounts, and no more reconciling a spreadsheet at midnight.",
    icon: "clipboard",
  },
  {
    id: "eb-dashboard",
    title: "Executive Board dashboard",
    blurb:
      "The control room for your organising team: delegates, committees, and status at a glance, with the numbers that actually matter surfaced first.",
    icon: "dashboard",
  },
  {
    id: "allotment-engine",
    title: "Merit-Logic Allotment Engine",
    blurb:
      "Our standout product. An AI-assisted engine weighs delegate experience, committee level, and agenda weight to suggest country allotments. Your Executive Board reviews every suggestion and issues the final call. The engine advises, humans decide.",
    icon: "engine",
    featured: true,
    points: [
      "Weighs experience, committee level & agenda weight",
      "Suggests, never assigns; the EB stays in control",
      "Turns days of allotment debate into an afternoon",
    ],
  },
];
