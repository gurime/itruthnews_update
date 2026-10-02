"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { articles, articleCategories, type Article } from "./ArticleData/DashboardArticleData";
import ArticleArtwork from "./components/ArticleArtwork";
import { PaywallModal } from "./components/PaywallModal";
import { createClient } from './utils/supabase/client';


const formatDate = (date: string) =>
new Date(date).toLocaleDateString("en-US", {
month: "short",
day: "numeric",
year: "numeric",
});

export default function Dashboard() {
const [selectedCategory, setSelectedCategory] = useState<string>("All");
const [showPaywall, setShowPaywall] = useState(false);
const [isPremiumMember, setIsPremiumMember] = useState(false);
const [premiumProfileId, setPremiumProfileId] = useState<string | null>(null);
const featuredArticle = articles.find((article) => article.featured) ?? articles[0];
const latestArticles = articles.filter((article) => article.id !== featuredArticle.id);
const visibleArticles = latestArticles.filter(
(article) => selectedCategory === "All" || article.category === selectedCategory,
);

function handleArticleClick(event: MouseEvent<HTMLAnchorElement>, article: Article) {
if (!article.premium || isPremiumMember) return;
event.preventDefault();
setShowPaywall(true);
}


useEffect(() => {
const supabase = createClient();
let mounted = true;

const loadProfile = async (userId: string) => {
const { data: profile, error } = await supabase
.from('profiles')
.select('subscription_status, role')
.eq('id', userId)
.maybeSingle();

if (!mounted) return;
const isPremium = !error && !!profile &&
(profile.subscription_status !== 'free' || profile.role === 'admin');
setIsPremiumMember(isPremium);
setPremiumProfileId(isPremium ? userId : null);
};

const loadSession = async () => {
const { data: { session } } = await supabase.auth.getSession();
if (!mounted) return;

if (session?.user) {
await loadProfile(session.user.id);
} else {
setIsPremiumMember(false);
setPremiumProfileId(null);
}
};

void loadSession();

const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
if (!mounted) return;

if (event === 'SIGNED_OUT' || !session?.user) {
setIsPremiumMember(false);
setPremiumProfileId(null);
} else {
void loadProfile(session.user.id);
}
});

return () => {
mounted = false;
subscription.unsubscribe();
};
}, []);

return (
<>

<main className="bg-[#f6f5f0] text-[#182d35]">
<div className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 lg:px-12">
<div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[#d7d7cf] pb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-[#596a6d]">
<span>Independent journalism · Since 2012</span>
<time
dateTime={new Date().toISOString()}
suppressHydrationWarning
>
{new Date().toLocaleDateString("en-US", {
weekday: "long",
month: "long",
day: "numeric",
year: "numeric",
})}
</time>
</div>

<section aria-labelledby="daily-briefing" className="mb-12">
<div className="mb-5 flex items-end justify-between gap-5">
<div>
<p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[#b24936]">
The iTruth News Briefing
</p>
<h1 id="daily-briefing" className="max-w-3xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
What the headlines don't tell you.
</h1>
</div>
<p className="hidden max-w-xs pb-1 text-sm leading-6 text-[#596a6d] md:block">
Clear-eyed reporting on the decisions and people shaping what comes next.
</p>
</div>

<Link
className="group grid overflow-hidden rounded-sm bg-[#0b0f98] text-white md:grid-cols-[1.03fr_0.97fr]"
href={`/articles/${featuredArticle.slug}`}
onClick={(event) => handleArticleClick(event, featuredArticle)}
>
<div className="order-last flex flex-col justify-between px-6 py-7 md:order-0">
<div>
<div className="mb-7 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.17em]">
<span className="bg-[#b24936] px-2.5 py-1 text-white">Editor&apos;s pick</span>
<span className="text-white">{featuredArticle.category}</span>
{featuredArticle.premium && <Lock aria-label="Premium article" size={14} />}
</div>
<h2 className="max-w-2xl font-serif text-3xl leading-tight transition-colors group-hover:text-[#f0c882] sm:text-4xl lg:text-5xl">
{featuredArticle.title}
</h2>
<p className="mt-5 max-w-xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
{featuredArticle.excerpt}
</p>
</div>
<div className="mt-9 flex items-center justify-between gap-4 border-t border-white/20 pt-4 text-xs text-white/70">
<span>{featuredArticle.author} · {featuredArticle.readTime}</span>
<span className="flex items-center gap-2 text-white transition group-hover:text-[#f0c882]">
Read story <ArrowRight aria-hidden="true" size={16} />
</span>
</div>
</div>

{/* Wrapped artwork container with zoom effect on hover */}
<div className="relative order-first aspect-4/3 w-full overflow-hidden sm:aspect-16/10 md:order-0 md:aspect-auto md:min-h-120">
<ArticleArtwork
category={featuredArticle.category}
title={featuredArticle.title}
image={featuredArticle.image}
className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
/>
</div>
</Link>
</section>

<section aria-labelledby="latest-heading">
<div className="flex flex-col gap-5 border-t border-[#c8cbc4] pt-7 sm:flex-row sm:items-end sm:justify-between">
<div>
<p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[#b24936]">More to know</p>
<h2 id="latest-heading" className="font-serif text-3xl sm:text-4xl">Latest reporting</h2>
</div>
<div aria-label="Filter stories by section" className="flex max-w-full gap-2 overflow-x-auto pb-1" role="group">
{articleCategories.map((category) => (
<button
aria-pressed={selectedCategory === category}
className={`shrink-0 border px-3 py-2 text-xs transition cursor-pointer ${
selectedCategory === category
? "border-[#183946] bg-[#183946] text-white"
: "border-[#c8cbc4] text-[#43555a] hover:border-[#183946]"
}`}
key={category}
onClick={() => setSelectedCategory(category)}
type="button"
>
{category}
</button>
))}
</div>
</div>

{visibleArticles.length > 0 ? (
<div className="mt-7 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
{visibleArticles.map((article) => (
<Link
className="group min-w-0"
href={`/articles/${article.slug}`}
key={article.id}
onClick={(event) => handleArticleClick(event, article)}
>
<div className="relative">
<ArticleArtwork
category={article.category}
title={article.title}
image={article.image}
className="aspect-[1.55]"
/>
{article.premium && !isPremiumMember && (
<span className="absolute right-3 top-3 flex items-center gap-1.5 bg-[#0b0f98]  px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white transition group-hover:text-[#f0c882]">
<Lock aria-hidden="true" size={12} /> 
iTruth Premium 
</span>
)}
</div>
<div className="border-b border-[#d7d7cf] pb-4 pt-4">
<div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[#b24936]">
<span>{article.category}</span>
<span aria-hidden="true">·</span>
<time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
</div>
<h3 className="font-serif text-2xl leading-snug text-[#182d35] transition-colors group-hover:text-[#b24936]">
{article.title}
</h3>
<p className="mt-2 text-sm leading-6 text-[#596a6d]">{article.excerpt}</p>
<p className="mt-4 text-xs text-[#596a6d]">{article.author} · {article.readTime}</p>
</div>
</Link>
))}
</div>
) : (
<p className="py-12 text-center text-sm text-[#596a6d]">No stories in this section yet.</p>
)}
</section>
</div>
</main>
<PaywallModal
isOpen={showPaywall}
onClose={() => setShowPaywall(false)}
variant="premium-content"
/>
</>
);
}