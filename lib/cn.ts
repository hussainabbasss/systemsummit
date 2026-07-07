/**
 * Minimal className joiner — filters falsy values and joins with spaces.
 * No dependency; sufficient for this project's conditional-class needs.
 */
export type ClassValue = string | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
