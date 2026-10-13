/** Join conditional class names (tiny stand-in for clsx, zero extra dependencies). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
