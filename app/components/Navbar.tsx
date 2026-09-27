"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

import NavDropdown from "./Navdropdown";
import { navMenuItems } from "./NavigationData";
import { specialCoverage } from "../admin/category_tables";
import { Lock } from "lucide-react";

interface NavbarProps {
/** Wire these to your real auth/subscription source when ready */
isSubscribed?: boolean;
isEliteMember?: boolean;
}

export default function Navbar({
isSubscribed = false,
isEliteMember = false,
}: NavbarProps) {
const router = useRouter();
const [menuOpen, setMenuOpen] = useState(false);
// Single shared "which dropdown is open" id — keeps the original
// behavior of only one menu open at a time, without sharing DOM refs.
const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

const currentMonth = new Date().getMonth();
const currentSpecialCoverage =
specialCoverage[currentMonth as keyof typeof specialCoverage] || [];

// Append this month's Special Coverage links onto the Lifestyle menu.
const menuItems = navMenuItems.map((item) => {
if (item.id !== "lifestyle" || currentSpecialCoverage.length === 0) {
return item;
}
return {
...item,
sections: [
...item.sections,
{
id: "special",
label: "Special Coverage",
links: currentSpecialCoverage.map(
(c: { label: string; href: string }) => ({
label: c.label,
href: c.href,
})
),
},
],
};
});

const logoSrc = isEliteMember
? "/images/itruthnews_elite.png"
: isSubscribed
? "/images/itruthnews_premium.png"
: "/images/itruthnews.png";
const logoAlt = isEliteMember
? "iTruth News Elite Logo"
: isSubscribed
? "iTruth News Premium Logo"
: "iTruth News Logo";

const renderDropdown = (item: (typeof menuItems)[number]) => (
<NavDropdown
key={item.id}
item={item}
isOpen={openDropdownId === item.id}
onOpen={() => setOpenDropdownId(item.id)}
onClose={() =>
setOpenDropdownId((curr) => (curr === item.id ? null : curr))
}
disabled={item.disabled || (item.eliteOnly && !isEliteMember)}
panelAlign={item.align ?? "left"}
/>


);

return (
<>
<Toaster position="top-center" />
<nav className="w-full dark:bg-blue-900 text-white shadow-md">
<div className="container mx-auto">
{/* Top Support Bar */}
<div className="w-full bg-blue-600 text-white border-b-2 border-red-600 p-4 rounded-md">
<div className="container mx-auto">
<div className="flex flex-col lg:flex-row items-center justify-between gap-4">
<div className="text-center lg:text-left flex-1">
<h2 className="text-lg font-bold mb-1">
Support independent journalism
</h2>
<p className="text-sm">
We&apos;re reader-funded. Join thousands who power iTruth
News.
</p>
</div>

<div className="flex flex-col sm:flex-row items-center gap-3">
<Link
href="/membership"
className="px-6 py-2 bg-blue-900 text-white rounded-full font-bold text-lg hover:bg-blue-800 transition-colors shadow-md whitespace-nowrap border-2 border-blue-900 hover:border-blue-700"
>
Support us
</Link>

<div className="flex gap-2 border-2 border-white rounded-full p-3">
<button
className="px-4 py-2 text-sm font-semibold text-white bg-blue-900 border-2 border-blue-900 rounded-full hover:bg-blue-800 transition-colors whitespace-nowrap cursor-pointer"
onClick={() => router.push("/login?tab=signin")}
>
Sign in
</button>
<button
className="px-4 py-2 text-sm font-semibold text-white bg-green-600 border-2 border-green-600 rounded-full hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer"
onClick={() => router.push("/login?tab=signup")}
>
Sign up
</button>
</div>
</div>
</div>
</div>
</div>

<div className="pb-8 border-b border-gray-400 mb-4" />

{/* Desktop Layout */}
<div className="hidden md:block">
<div className="flex items-center justify-center mb-10">
<Link href="/">
<Image
src={logoSrc}
loading="eager"
priority
alt={logoAlt}
width={200}
height={200}
style={{ width: "auto", height: "auto" }}
/>
</Link>
</div>

<div className="flex items-center justify-between space-x-8 text-sm font-medium p-6">
{menuItems.map((item) => renderDropdown(item))}
</div>
</div>

{/* Mobile Layout */}
<div className="md:hidden">
<div className="flex items-center justify-between p-6">
<div className="shrink-0">
<Link href="/">
<Image
src={logoSrc}
loading="eager"
priority
alt={logoAlt}
width={200}
height={200}
className="mx-auto"
/>
</Link>
</div>
<button
className="text-white focus:outline-none text-2xl cursor-pointer"
onClick={() => setMenuOpen((open) => !open)}
aria-label="Toggle menu"
>
☰
</button>
</div>

{menuOpen && (
<div className="mt-4 space-y-4 pb-6 px-4">
{menuItems.map((item) => (
<div
key={item.id}
className="bg-blue-800 pt-4 pb-4 rounded-lg px-4"
>
{renderDropdown(item)}
</div>
))}
</div>
)}
</div>
</div>
</nav>
</>
);
}