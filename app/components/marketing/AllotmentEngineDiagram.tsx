import { EngineIcon, CheckIcon, ArrowRightIcon } from "@/app/components/ui/icons";

const inputs = [
  { label: "Delegate experience", detail: "Prior councils, awards, tenure" },
  { label: "Committee level", detail: "Beginner · intermediate · advanced" },
  { label: "Agenda weight", detail: "Complexity & stakes of the topic" },
];

/**
 * Explains the Merit-Logic Allotment Engine: inputs feed the engine, which
 * *suggests*; the Executive Board reviews and issues. Emphasizes human-in-loop.
 * HTML/CSS (not one big SVG) so labels are real text and it reflows on mobile.
 */
export function AllotmentEngineDiagram() {
  return (
    <div className="rounded-2xl border border-border bg-bg-elevated p-6 shadow-[var(--shadow-sm)] sm:p-8">
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_auto_auto_1fr]">
        {/* Inputs */}
        <ul className="flex flex-col gap-3" aria-label="Engine inputs">
          {inputs.map((input) => (
            <li
              key={input.label}
              className="flex items-start gap-3 rounded-lg border border-border bg-surface-muted px-4 py-3"
            >
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-text">{input.label}</p>
                <p className="mt-0.5 text-xs text-text-muted">{input.detail}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* connector 1 */}
        <Connector />

        {/* Engine core */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
            {/* living pulse - motion-safe (paused under reduced motion) */}
            <span
              className="absolute inset-0 rounded-full border border-accent/40 motion-safe:[animation:ss-pulse-ring_3s_var(--ease-out)_infinite] motion-reduce:hidden"
              aria-hidden="true"
            />
            <span
              className="absolute inset-0 rounded-full border border-accent/30 motion-safe:[animation:ss-pulse-ring_3s_var(--ease-out)_infinite_1.5s] motion-reduce:hidden"
              aria-hidden="true"
            />
            <EngineIcon className="h-10 w-10" />
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-text">
              Merit-Logic Engine
            </p>
            <p className="text-xs text-text-muted">Suggests allotments</p>
          </div>
        </div>

        {/* connector 2 */}
        <Connector />

        {/* Human decision */}
        <div className="rounded-xl border border-border-strong bg-bg p-5">
          <div className="flex items-center gap-2 text-success">
            <CheckIcon className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[var(--tracking-wide)]">
              Human decision
            </span>
          </div>
          <p className="mt-2 font-display text-base font-semibold text-text">
            EB reviews &amp; issues
          </p>
          <p className="mt-1 text-sm text-text-muted">
            Your Executive Board approves every allotment. The engine advises,
            the board decides.
          </p>
        </div>
      </div>
    </div>
  );
}

/** Directional connector: rightward on desktop, downward on mobile. */
function Connector() {
  return (
    <div
      className="flex items-center justify-center text-text-muted"
      aria-hidden="true"
    >
      <ArrowRightIcon className="h-6 w-6 rotate-90 lg:rotate-0" />
    </div>
  );
}
