"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import AccordionSection from "./AccordionSection";
import type { NavMenuItem } from "../utils/Types";

interface NavDropdownProps {
item: NavMenuItem;
isOpen: boolean;
onOpen: () => void;
onClose: () => void;
/** Render as a locked upsell link instead of a dropdown (e.g. elite-only items) */
locked?: boolean;
lockedHref?: string;
panelAlign?: "left" | "right";
}

// Each NavDropdown owns its own refs, so the outside-click check below only
// ever looks at *this* dropdown's button/panel — fixing the original bug
// where a single shared ref pair got overwritten by whichever dropdown
// rendered last, so outside-click only ever worked for one of them.
export default function NavDropdown({
item,
isOpen,
onOpen,
onClose,
locked = false,
lockedHref = "/membership",
panelAlign = "right",
}: NavDropdownProps) {
const [activeSection, setActiveSection] = useState<string | null>(null);
const buttonRef = useRef<HTMLButtonElement | null>(null);
const panelRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
if (!isOpen) return;

const handleClickOutside = (event: MouseEvent) => {
const target = event.target as Node;
if (
panelRef.current?.contains(target) ||
buttonRef.current?.contains(target)
) {
return;
}
onClose();
};

document.addEventListener("mousedown", handleClickOutside);
return () => document.removeEventListener("mousedown", handleClickOutside);
}, [isOpen, onClose]);

if (locked) {
return (
<Link
href={lockedHref}
className="text-white/60 font-bold whitespace-nowrap flex items-center transition-colors group"
title={`Upgrade to access ${item.label}`}
>
<span>{item.label}</span>
<svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
<path
fillRule="evenodd"
d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
clipRule="evenodd"
/>
</svg>
</Link>
);
}

return (
<div className="relative inline-block">
<button
ref={buttonRef}
type="button"
className="text-white hover:underline decoration-2 font-bold cursor-pointer whitespace-nowrap flex items-center"
onClick={() => (isOpen ? onClose() : onOpen())}
aria-expanded={isOpen}
>
{item.label}
<ChevronDown
height={20}
className={`ml-1 transition-transform duration-300 ${
isOpen ? "rotate-180" : ""
}`}
/>
</button>

{isOpen && (
<div
ref={panelRef}
className={`absolute z-50 mt-2 bg-blue-900 border border-gray-400 rounded-md shadow-lg p-2 ${panelAlign === "right" ? "right-0" : "left-0"} ${
item.panelWidth || "w-64"
}`}
>
{item.sections.map((section, i) => (
<AccordionSection
key={section.id}
section={section}
isOpen={activeSection === section.id}
onToggle={() =>
setActiveSection((curr) => (curr === section.id ? null : section.id))
}
showDivider={i < item.sections.length - 1}
/>
))}
</div>
)}
</div>
);
}