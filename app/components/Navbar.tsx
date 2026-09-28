"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

// NOTE: matches the createClient() pattern your Login page now uses.
// Adjust this relative path if Navbar.tsx doesn't sit at the same folder
// depth as Login.tsx in your project.
import { createClient } from "../utils/supabase/client";

// NOTE: these two imports were previously "./Navdropdown" and
// "./NavigationData" (wrong casing vs the actual files NavDropdown.tsx and
// navigationData.ts). Case-insensitive filesystems (Mac/Windows) hide this;
// a case-sensitive Linux build (e.g. Vercel) would fail on it. Fixed here.
import NavDropdown from "./Navdropdown";
import { navMenuItems } from "./NavigationData";
import { specialCoverage } from "../admin/category_tables";

export default function Navbar() {
const router = useRouter();
const [menuOpen, setMenuOpen] = useState(false);
const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

// Real auth state, restored — Navbar now determines this itself instead
// of requiring a parent to pass isSubscribed/isEliteMember as props.
const [user, setUser] = useState<User | null>(null);
const [firstName, setFirstName] = useState("");
const [subscriptionStatus, setSubscriptionStatus] = useState("free");
const [isSubscribed, setIsSubscribed] = useState(false);
const [isEliteMember, setIsEliteMember] = useState(false);

useEffect(() => {
const supabase = createClient();
let mounted = true;

const loadProfile = async (userId: string) => {
const { data: profileData, error } = await supabase
.from("profiles")
.select("full_name, subscription_status, role")
.eq("id", userId)
.maybeSingle();

if (error || !mounted || !profileData) return;

setFirstName(profileData.full_name || "");
setSubscriptionStatus(profileData.subscription_status || "free");

const isElite =
profileData.subscription_status === "elite" ||
profileData.subscription_status === "elite_monthly" ||
profileData.subscription_status === "elite_yearly" ||
profileData.role === "admin";
setIsEliteMember(isElite);

const hasPaidSubscription =
!!profileData.subscription_status &&
profileData.subscription_status !== "free";
setIsSubscribed(isElite || hasPaidSubscription);
};

const init = async () => {
const {
data: { session },
} = await supabase.auth.getSession();
if (!mounted) return;

if (session?.user) {
setUser(session.user);
await loadProfile(session.user.id);
}
};
init();

const {
data: { subscription },
} = supabase.auth.onAuthStateChange((event, session) => {
if (!mounted) return;

if (event === "SIGNED_IN" && session?.user) {
setUser(session.user);
loadProfile(session.user.id);
} else if (event === "SIGNED_OUT") {
setUser(null);
setFirstName("");
setSubscriptionStatus("free");
setIsEliteMember(false);
setIsSubscribed(false);
}
});

return () => {
mounted = false;
subscription?.unsubscribe();
};
}, []);

const handleLogout = async () => {
try {
const supabase = createClient();
const { error } = await supabase.auth.signOut();
if (error) throw error;

setUser(null);
setFirstName("");
setSubscriptionStatus("free");
setIsEliteMember(false);
setIsSubscribed(false);

// replace, not push — signing out shouldn't leave a page you can
// "back" into that assumed you were still logged in.
router.replace("/");
} catch (err) {
console.error(err);
toast.error("Failed to log out. Please try again.");
}
};

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
const subscriptionLabel = subscriptionStatus
	.split("_")
	.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
	.join(" ");

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
{user && (
<Link
href={`/profile/${user.id}?tab=account`}
className="relative flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-800 to-blue-700 hover:from-blue-700 hover:to-blue-600 rounded-full transition-all duration-200 shadow-md hover:shadow-lg group"
>
<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
<span className="font-semibold text-white group-hover:scale-105 transition-transform">
{firstName || user.email?.split("@")[0] || "Account"}
<span className="ml-1 text-xs font-normal text-blue-100">
· {subscriptionLabel}
</span>
</span>
</Link>
)}

<Link
href="/membership"
className="px-6 py-2 bg-blue-900 text-white rounded-full font-bold text-lg hover:bg-blue-800 transition-colors shadow-md whitespace-nowrap border-2 border-blue-900 hover:border-blue-700"
>
Support us
</Link>

{/* Login/Logout */}
{user ? (
<button
className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-full hover:bg-red-900 transition-colors whitespace-nowrap cursor-pointer"
type="button"
onClick={handleLogout}
>
Log out
</button>
) : (
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
)}
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