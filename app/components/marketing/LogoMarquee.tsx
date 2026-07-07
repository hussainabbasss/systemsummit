import { muns } from "@/app/content/muns";
import { MunLogo } from "@/app/components/marketing/MunLogo";

/**
 * Auto-scrolling partner row. Pure CSS loop (duplicated track for a seamless
 * wrap), pauses on hover, edge-masked to the canvas. Under reduced motion the
 * track stops and wraps into a static centered grid (see globals.css).
 */
export function LogoMarquee() {
  return (
    <div
      className="group ss-marquee-mask relative overflow-hidden"
      role="region"
      aria-label="A selection of Model UN conferences that trust System Summit"
    >
      <div className="ss-marquee-track flex w-max items-center gap-12 pr-12 group-hover:[animation-play-state:paused] sm:gap-16 sm:pr-16">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center gap-12 sm:gap-16"
            aria-hidden={copy === 1}
          >
            {muns.map((mun) => (
              <li key={`${copy}-${mun.abbr}`}>
                <MunLogo mun={mun} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
