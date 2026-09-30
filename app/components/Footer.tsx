'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Footer() {
const [openSection, setOpenSection] = useState<string | null>(null);
const [newsletterEmail, setNewsletterEmail] = useState('');
const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
const [newsletterError, setNewsletterError] = useState('');
const toggleSection = (section: string) => {
setOpenSection((current) => current === section ? null : section);
};

const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
event.preventDefault();
setNewsletterStatus('submitting');

try {
const response = await fetch('/api/newsletter', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
email: newsletterEmail,
website: new FormData(event.currentTarget).get('website'),
}),
});

if (!response.ok) {
const result = await response.json().catch(() => null);
throw new Error(result?.error ?? 'Newsletter signup failed. Please try again.');
}

setNewsletterEmail('');
setNewsletterError('');
setNewsletterStatus('success');
} catch (error) {
setNewsletterError(error instanceof Error ? error.message : 'Please try again later.');
setNewsletterStatus('error');
}
};

return (
<footer className="bg-[#122d39] py-12 text-white">
<div className="container mx-auto px-5 sm:px-8">
<div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
<div>
<Link href="/" aria-label="iTruth News home" className="inline-block">
<Image
src="/images/itruthnews.png"
alt="iTruth News"
loading="eager"
priority
width={150}
height={50}
className="mb-5 h-auto w-auto"
/>
</Link>
<h2 className="font-serif text-xl">The free iTruth briefing</h2>
<p className="mt-2 max-w-sm text-sm leading-6 text-white/70">
Independent reporting and the stories worth your time. No membership required.
</p>
<form className="mt-5 max-w-md" onSubmit={handleNewsletterSubmit}>
<label className="mb-2 block text-sm font-medium" htmlFor="footer-newsletter-email">
Email address
</label>
<div className="flex min-w-0">
<input
autoComplete="email"
className="min-w-0 flex-1 border border-white/30 bg-white/10 px-3 py-3 text-sm text-white outline-none placeholder:text-white/50 focus:border-[#f0c882] focus:ring-2 focus:ring-[#f0c882]/50"
id="footer-newsletter-email"
name="email"
onChange={(event) => {
setNewsletterEmail(event.target.value);
if (newsletterStatus !== 'submitting') setNewsletterStatus('idle');
}}
placeholder="you@example.com"
required
type="email"
value={newsletterEmail}
/>
<button
aria-label="Subscribe to the free newsletter"
className="flex shrink-0 items-center gap-2 bg-[#b24936] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#943b2c] disabled:cursor-not-allowed disabled:opacity-60"
disabled={newsletterStatus === 'submitting'}
type="submit"
>
{newsletterStatus === 'submitting' ? 'Joining…' : 'Subscribe'}
<ArrowRight aria-hidden="true" size={16} />
</button>
</div>
<input
aria-hidden="true"
autoComplete="off"
className="absolute left-[-9999px] h-px w-px"
name="website"
tabIndex={-1}
type="text"
/>
<p aria-live="polite" className="mt-2 min-h-5 text-sm text-white/80" role={newsletterStatus === 'error' ? 'alert' : 'status'}>
{newsletterStatus === 'success' && "You're on the list. Thanks for subscribing."}
{newsletterStatus === 'error' && newsletterError}
</p>
</form>
</div>

{/* Company */}
<FooterCollapse
title="Company"
section="company"
openSection={openSection}
toggleSection={toggleSection}
>
<FooterLink href="../about" label="About Us" />
<FooterLink href="../advertise" label="Advertise" />
<FooterLink href="../careers" label="Careers" />
<FooterLink href="../press" label="Press & Media" />
<FooterLink href="../editorial" label="Editorial Guidelines" />
</FooterCollapse>

{/* Support */}
<FooterCollapse
title="Support"
section="support"
openSection={openSection}
toggleSection={toggleSection}
>
<FooterLink href="../contact" label="Contact" />
<FooterLink href="../feedback" label="Send Feedback" />
<FooterLink href="../corrections" label="Report a Correction" />
<FooterLink href="../faq" label="FAQ" />
</FooterCollapse>

{/* Legal */}
<FooterCollapse
title="Legal"
section="legal"
openSection={openSection}
toggleSection={toggleSection}
>
<FooterLink href="../privacy" label="Privacy Policy" />
<FooterLink href="../terms" label="Terms of Service" />
<FooterLink href="../cookies" label="Cookie Policy" />
<FooterLink href="../accessibility" label="Accessibility" />
</FooterCollapse>
</div>

{/* COPYRIGHT */}
<div className="border-t border-white/20 pt-6 text-center">
<p className="text-sm text-white/70">
&copy; {new Date().getFullYear()} iTruth News. All rights reserved.
</p>
</div>

</div>
</footer>
);
}

/* Collapse wrapper for mobile */
function FooterCollapse({
title,
section,
openSection,
toggleSection,
children,
}: {
title: string;
section: string;
openSection: string | null;
toggleSection: (s: string) => void;
children: React.ReactNode;
}) {

const isOpen = openSection === section;

return (
<div>
<button
aria-controls={`footer-${section}-links`}
aria-expanded={isOpen}
onClick={() => toggleSection(section)}
className="w-full flex justify-between items-center md:cursor-default md:pointer-events-none md:mb-4">

<h4 className="text-lg font-semibold">{title}</h4>
<ChevronDown
className={`h-5 w-5 md:hidden transition-transform duration-300 cursor-pointer ${isOpen ? 'rotate-180' : ''}`}/>
</button>

<div
id={`footer-${section}-links`}
className={`overflow-hidden cursor-pointer transition-all duration-300 md:block ${isOpen ? 'max-h-40 mt-2' : 'max-h-0 md:max-h-none'}`}>
<ul className="space-y-2 text-sm">{children}</ul>
</div>
</div>
);
}

/* Simple link component */
function FooterLink({ href, label }: { href: string; label: string }) {
return (
<li>
<a
href={href} className="text-blue-100  hover:text-white transition-colors duration-200">{label}
</a>
</li>
);
}