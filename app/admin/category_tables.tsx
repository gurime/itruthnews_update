export interface SpecialCoverageLink {
  label: string;
  href: string;
}

// Keyed by month index: 0 = January ... 11 = December
// (matches `new Date().getMonth()`, which Navbar.tsx uses to look this up)
export const specialCoverage: Record<number, SpecialCoverageLink[]> = {
  0: [], // January
  1: [], // February
  2: [], // March
  3: [], // April
  4: [], // May
  5: [
  { label: "Pride Month Coverage", href: "/special/pride-month" },
  { label: "Summer Reading List", href: "/special/summer-reads" },
], // June
  6: [], // July
  7: [], // August
  8: [], // September
  9: [], // October
  10: [], // November
  11: [], // December
};