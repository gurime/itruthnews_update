"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";

interface PaywallProps {
isOpen: boolean;
onClose: () => void;
variant: "limit-reached" | "premium-content";
}

const premiumFeatures = [
"Unlimited articles across all sections",
"Ad-free reading on all devices",
"Subscriber-only newsletters and briefings",
"Complete archive access",
];

export function PaywallModal({ isOpen, onClose, variant }: PaywallProps) {
if (!isOpen) return null;

const isLimitReached = variant === "limit-reached";

return (
<div
className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
onMouseDown={(event) => {
if (event.target === event.currentTarget) onClose();
}}
>
<section
aria-labelledby="paywall-title"
aria-modal="true"
className="relative w-full max-w-lg border border-white/50 bg-[#f6f4ee] p-7 shadow-2xl sm:p-10"
role="dialog"
>
<button
aria-label="Close paywall"
className="absolute right-4 top-4 rounded-full p-2 text-gray-500 transition hover:bg-black/5 hover:text-gray-900"
onClick={onClose}
type="button"
>
<X aria-hidden="true" size={20} />
</button>
<p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#b24936]">
iTruth Premium
</p>
<h2 id="paywall-title" className="max-w-sm font-serif text-3xl leading-tight text-[#152e39] sm:text-4xl">
{isLimitReached ? "Keep reading without limits." : "This story is for members."}
</h2>
<p className="mt-4 text-sm leading-6 text-gray-600">
{isLimitReached
? "Get unlimited access to independent reporting across every section."
: "Become a member to read this investigation and support independent journalism."}
</p>
<ul className="mt-7 space-y-3 border-y border-[#d7d4ca] py-6">
{premiumFeatures.map((feature) => (
<li key={feature} className="flex items-center gap-3 text-sm text-[#263c45]">
<Check aria-hidden="true" className="shrink-0 text-[#31715d]" size={17} />
{feature}
</li>
))}
</ul>
<Link
className="mt-7 flex items-center justify-center bg-[#b24936] px-5 py-3.5 font-semibold text-white transition hover:bg-[#943b2c]"
href="/membership?plan=premium"
onClick={onClose}
>
Explore membership
</Link>
<button
className="mt-4 w-full py-2 text-sm text-gray-500 transition hover:text-gray-900"
onClick={onClose}
type="button"
>
Continue browsing
</button>
</section>
</div>
);
}