"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type { NavSection } from "../utils/Types";

interface AccordionSectionProps {
section: NavSection;
isOpen: boolean;
onToggle: () => void;
showDivider?: boolean;
}

export default function AccordionSection({
section,
isOpen,
onToggle,
showDivider = true,
}: AccordionSectionProps) {
return (
<div className={showDivider ? "border-b border-blue-700" : ""}>
<button
type="button"
className="w-full px-4 py-3 text-sm font-semibold uppercase tracking-wide flex items-center justify-between hover:bg-blue-800 transition-colors"
onClick={onToggle}
aria-expanded={isOpen}
>
<span>{section.label}</span>
<ChevronDown
height={18}
className={`transition-transform duration-300 ${
isOpen ? "rotate-180" : ""
}`}
/>
</button>

<div
className={`overflow-hidden transition-all duration-300 ease-in-out ${
isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
}`}
>
<div className="px-2 pb-3 space-y-1">
{section.links.map((link) => (
<Link
key={link.href}
href={link.href}
className="block py-2 px-2 hover:bg-blue-600 rounded"
>
{link.label}
</Link>
))}
</div>
</div>
</div>
);
}