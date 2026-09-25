"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function Navbar() {
const router = useRouter();

return (
<>
<Toaster position="top-center" />
<nav className="w-full dark:bg-blue-900 text-white shadow-md">
{/* Top Support Bar */}
<div className="w-full bg-blue-600 text-white border-b-2 border-red-600 p-4 rounded-md">
<div className="container mx-auto">
<div className="flex flex-col lg:flex-row items-center justify-between gap-4">

{/* Left side - Main message */}
<div className="text-center lg:text-left flex-1">
<h2 className="text-lg font-bold mb-1">
Support independent journalism
</h2>
<p className="text-sm">
We&apos;re reader-funded. Join thousands who power iTruth News.
</p>
</div>

{/* Right side - Actions */}
<div className="flex flex-col sm:flex-row items-center gap-3">

{/* Support CTA */}
<Link
href="/membership"
className="px-6 py-2 bg-blue-900 text-white rounded-full font-bold text-lg hover:bg-blue-800 transition-colors shadow-md whitespace-nowrap border-2 border-blue-900 hover:border-blue-700"
>
Support us
</Link>

{/* Sign in / Sign up */}
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
</nav>
</>
);
}