"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import AccordionSection from "./AccordionSection";
import type { NavMenuItem } from "../utils/Types";

interface NavDropdownProps {
item: NavMenuItem;
isOpen: boolean;
isSubscribed?: boolean;
disabled?: boolean;
onOpen: () => void;
onClose: () => void;
/** Render as a locked upsell link instead of a dropdown (e.g. elite-only items) */
locked?: boolean;
lockedHref?: string;
panelAlign?: "left" | "right";
}

export default function NavDropdown({
item,
isOpen,
isSubscribed = false,
disabled = false,
onOpen,
onClose,
locked = false,
lockedHref = "/membership",
panelAlign = "left",
}: NavDropdownProps) {
const [activeSection, setActiveSection] = useState<string | null>(null);
const buttonRef = useRef<HTMLButtonElement | null>(null);
const panelRef = useRef<HTMLDivElement | null>(null);

// Combine parent component `disabled` prop with item `disabled` property if present
const isDisabled = Boolean(disabled || item.disabled);

useEffect(() => {
if (!isOpen) return;

const handleClickOutside = (event: MouseEvent) => {
const target = event.target;
if (!(target instanceof Element)) return;
if (
panelRef.current?.contains(target) ||
buttonRef.current?.contains(target) ||
target.closest("[data-nav-dropdown]")?.getAttribute("data-nav-dropdown") === item.id
) {
return;
}
onClose();
};

document.addEventListener("mousedown", handleClickOutside);
return () => document.removeEventListener("mousedown", handleClickOutside);
}, [isOpen, onClose, item.id]);

// Handle locked items (upsell link)
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
<div className="relative inline-block" data-nav-dropdown={item.id}>
<button
ref={buttonRef}
type="button"
disabled={isDisabled}
onClick={isDisabled ? undefined : () => (isOpen ? onClose() : onOpen())}
aria-expanded={isOpen}
aria-disabled={isDisabled}
title={isDisabled ? `Upgrade to access ${item.label}` : undefined}
className={`font-bold whitespace-nowrap flex items-center transition-opacity ${
isDisabled
? "text-white/40 cursor-not-allowed pointer-events-none"
: item.id === "business" && isSubscribed
? "text-emerald-300 hover:text-emerald-200 hover:underline decoration-2 cursor-pointer"
: "text-white hover:underline decoration-2 cursor-pointer"
}`}
>
{item.label}
{isDisabled ? (
<svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
<path
fillRule="evenodd"
d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
clipRule="evenodd"
/>
</svg>
) : (
<ChevronDown
height={20}
className={`ml-1 transition-transform duration-300 ${
isOpen ? "rotate-180" : ""
}`}
/>
)}
</button>

{isOpen && !isDisabled && (
<div
ref={panelRef}
className={`absolute left-0 ${
panelAlign === "right" ? "md:left-auto md:right-0" : ""
} bg-blue-900 text-white mt-2 py-4 ${
item.panelWidth ?? "w-80"
} max-w-[92vw] rounded shadow-lg z-50 max-h-87.5 overflow-y-auto`}
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