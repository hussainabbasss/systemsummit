/** Live conferences we've built. Screenshots live in /public/projects. */

export type Project = {
  id: string;
  name: string;
  /** Short line under the name, e.g. edition + city. */
  context: string;
  url: string;
  screenshot: string;
  /** Headline stat shown on the card, when we have one worth stating. */
  stat?: { value: string; label: string };
  summary: string;
  points: string[];
};

export const projects: Project[] = [
  {
    id: "munique",
    name: "Munique 2026",
    context: "Edition I · AMHSS, Karachi",
    url: "https://munique.systemsummit.online",
    screenshot: "/projects/munique.png",
    stat: { value: "300+", label: "delegates managed" },
    summary:
      "A first-edition conference run end to end on System Summit. Beyond the public site, the organising team ran every delegate through one system: from allotment to the moment they sat down in committee.",
    points: [
      "Country allotments for 300+ delegates",
      "Printable roll call sheets per committee",
      "Digital waivers collected and tracked",
      "Committees, study guides and schedule in one place",
    ],
  },
  {
    id: "meritmun",
    name: "MERITMUN III",
    context: "Third iteration · Karachi",
    url: "https://meritmun.systemsummit.online",
    screenshot: "/projects/meritmun.png",
    summary:
      "The third edition of an established Karachi conference. Delegates register, rank their committee preferences, and come back to check their application status, all without a single form link in a bio.",
    points: [
      "Delegate and delegation registration flows",
      "Ranked committee preferences for allocation",
      "Self-serve application status checks",
      "Committees, Executive Board and schedule pages",
    ],
  },
];
