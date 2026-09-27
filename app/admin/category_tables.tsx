export interface SpecialCoverageLink {
label: string;
href: string;
}

// Keyed by month index: 0 = January ... 11 = December
// (matches `new Date().getMonth()`, which Navbar.tsx uses to look this up)
export const specialCoverage: Record<number, SpecialCoverageLink[]> = {
0: [ // January
{ label: "New Year, New Habits", href: "/special/new-year" },
{ label: "Martin Luther King Jr. Day", href: "/special/mlk-day" },
{ label: "Winter Deals & Guides", href: "/special/winter-guides" },
],
1: [ // February
{ label: "Black History Month", href: "/special/black-history-month" },
{ label: "Valentine's Day Gift Guide", href: "/special/valentines-day" },
{ label: "Super Bowl Coverage", href: "/special/super-bowl" },
],
2: [ // March
{ label: "Women's History Month", href: "/special/womens-history-month" },
{ label: "Spring Equinox / Spring Prep", href: "/special/spring-prep" },
{ label: "St. Patrick's Day", href: "/special/st-patricks-day" },
],
3: [ // April
{ label: "Earth Month & Sustainability", href: "/special/earth-day" },
{ label: "Spring Cleaning Guide", href: "/special/spring-cleaning" },
{ label: "Tax Season Tips", href: "/special/tax-season" },
],
4: [ // May
{ label: "AAPI Heritage Month", href: "/special/aapi-heritage-month" },
{ label: "Mother's Day Gift Guide", href: "/special/mothers-day" },
{ label: "Memorial Day Sales & Travel", href: "/special/memorial-day" },
],
5: [ // June
{ label: "Pride Month Coverage", href: "/special/pride-month" },
{ label: "Summer Reading List", href: "/special/summer-reads" },
{ label: "Father's Day Gift Guide", href: "/special/fathers-day" },
],
6: [ // July
{ label: "4th of July / Summer Travel", href: "/special/july-4th" },
{ label: "Mid-Year Review & Goals", href: "/special/mid-year-review" },
{ label: "Summer Sale", href: "/special/summer-sale" },
],
7: [ // August
{ label: "Back to School Guide", href: "/special/back-to-school" },
{ label: "End of Summer Travel", href: "/special/summer-travel" },
],
8: [ // September
{ label: "Hispanic Heritage Month", href: "/special/hispanic-heritage-month" },
{ label: "Labor Day Weekend", href: "/special/labor-day" },
{ label: "Fall Fashion & Trends", href: "/special/fall-preview" },
],
9: [ // October
{ label: "Halloween & Fall Festivities", href: "/special/halloween" },
{ label: "Breast Cancer Awareness", href: "/special/awareness" },
],
10: [ // November
{ label: "Native American Heritage Month", href: "/special/native-american-heritage" },
{ label: "Thanksgiving & Gratitude", href: "/special/thanksgiving" },
{ label: "Black Friday & Cyber Monday Deals", href: "/special/black-friday" },
],
11: [ // December
{ label: "Holiday Gift Guide", href: "/special/holiday-gift-guide" },
{ label: "Year-in-Review & Best Of", href: "/special/year-in-review" },
{ label: "New Year's Eve Prep", href: "/special/nye-prep" },
],
};