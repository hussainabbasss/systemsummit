/** Keyboard skip-to-content link - visually hidden until focused. */
export function SkipLink() {
  return (
    <a
      href="#content"
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[var(--z-toast)] focus-visible:rounded-md focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-primary-text focus-visible:shadow-[var(--shadow-md)]"
    >
      Skip to content
    </a>
  );
}
