import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home, Lock } from "lucide-react";
import { articles as dashboardArticles } from "../../ArticleData/DashboardArticleData";
import { articles as politicsArticles } from "../../ArticleData/PoliticsArticleData";
import ArticleArtwork from "../../components/ArticleArtwork";
import ArticleEngagement from "../../components/ArticleEngagement";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Goback from "@/app/components/GoBack";

interface PageProps {
params: Promise<{ slug: string }>;
}

const allArticles = [...dashboardArticles, ...politicsArticles];

// 1. Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
const { slug } = await params;
const article = allArticles.find((item) => item.slug === slug);

if (!article) return {};

return {
title: `${article.title} | iTruth`,
description: article.excerpt,
openGraph: {
title: article.title,
description: article.excerpt,
type: "article",
publishedTime: article.publishedAt,
authors: [article.author],
images: article.image ? [{ url: article.image }] : [],
},
};
}

// 2. Safe Helper to Format ISO Dates consistently
function formatDate(isoString: string) {
const date = new Date(isoString);
return date.toLocaleDateString("en-US", {
month: "long",
day: "numeric",
year: "numeric",
timeZone: "UTC", // Prevents timezone hydration shifts
});
}

function getRelatedArticles(articleSlug: string, category: string) {
const candidates = allArticles
.filter((item) => item.slug !== articleSlug)
.sort(
(first, second) =>
new Date(second.publishedAt).getTime() -
new Date(first.publishedAt).getTime(),
);

return [
...candidates.filter((item) => item.category === category),
...candidates.filter((item) => item.category !== category),
].slice(0, 3);
}

const categoryMap: Record<string, string> = {
Politics: "politics",
Economy: "economy",
World: "world",
Technology: "technology",
Opinion: "opinion",
Environment: "environment",
Culture: "culture",
};

const getCategoryPath = (cat: string) => {
const normalized = cat.toLowerCase().trim();
return categoryMap[normalized] || normalized.replace(/\s+/g, "-");
};

function Breadcrumb({ category, title }: { category: string; title: string }) {
return (
<div className="mb-6 flex min-w-0 items-center justify-between gap-4">
<nav
aria-label="Breadcrumb"
className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-sm text-[#596a6d]"
>
<Link
href="/"
aria-label="Home"
className="inline-flex shrink-0 items-center gap-1.5 transition hover:text-[#b24936]"
>
<Home aria-hidden="true" size={15} />
<span>Home</span>
</Link>
<ChevronRight aria-hidden="true" className="shrink-0" size={14} />
<Link
href={`/${getCategoryPath(category)}`}
className="shrink-0 hover:text-[#b24936]"
>
{category}
</Link>
<ChevronRight aria-hidden="true" className="shrink-0" size={14} />
<span aria-current="page" className="truncate font-medium text-[#182d35]">
{title}
</span>
</nav>
<Goback />
</div>
);
}

export default async function ArticlePage({ params }: PageProps) {
const { slug } = await params;
const article = allArticles.find((item) => item.slug === slug);

if (!article) notFound();

const relatedArticles = getRelatedArticles(article.slug, article.category);

return (
<>
<Navbar />
<main className="flex-1 bg-[#f6f5f0] px-5 py-10 text-[#182d35] sm:px-8 sm:py-14">
<article className="mx-auto max-w-4xl">
<Breadcrumb category={article.category} title={article.title} />
<div className="mt-7">
<ArticleArtwork
category={article.category}
title={article.title}
image={article.image}
className="aspect-2/1"
/>
</div>
<header className="mx-auto max-w-3xl py-8 sm:py-11">
<p className="font-mono text-xs uppercase tracking-[0.18em] text-[#b24936]">
{article.category} · {article.readTime}
</p>
<h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
{article.title}
</h1>
<p className="mt-5 text-lg leading-7 text-[#596a6d]">
{article.excerpt}
</p>
<p className="mt-6 border-t border-[#d7d7cf] pt-4 text-sm text-[#596a6d]">
By {article.author} · {formatDate(article.publishedAt)}
</p>
</header>
{article.premium ? (
<section className="mx-auto max-w-3xl border-y border-[#d7d7cf] py-9">
<Lock aria-hidden="true" className="text-[#b24936]" size={22} />
<h2 className="mt-4 font-serif text-2xl">A member-only story</h2>
<p className="mt-2 max-w-xl text-sm leading-6 text-[#596a6d]">
This reporting is part of iTruth Premium. Join to support
independent journalism and read the full story.
</p>
<Link
className="mt-5 inline-flex bg-[#b24936] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#943b2c]"
href="/membership?plan=premium"
>
Explore membership
</Link>
</section>
) : (
<div className="mx-auto max-w-3xl pb-12">
{article.body.map((paragraph, index) => (
<p
className="mb-6 font-serif text-lg leading-8 text-[#283c42]"
key={index}
>
{paragraph}
</p>
))}
</div>
)}
<ArticleEngagement
slug={article.slug}
title={article.title}
excerpt={article.excerpt}
/>
</article>
<section
aria-labelledby="related-articles-heading"
className="mx-auto mt-6 max-w-4xl border-t border-[#d7d7cf] pt-8 sm:mt-10 sm:pt-10"
>
<div className="mb-5">
<p className="font-mono text-xs uppercase tracking-[0.18em] text-[#b24936]">
Keep reading
</p>
<h2
id="related-articles-heading"
className="mt-2 font-serif text-2xl sm:text-3xl"
>
Related stories
</h2>
</div>
<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
{relatedArticles.map((relatedArticle) => (
<Link
key={relatedArticle.slug}
href={`/articles/${relatedArticle.slug}`}
className="group min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b24936]"
>
<ArticleArtwork
category={relatedArticle.category}
title={relatedArticle.title}
image={relatedArticle.image}
className="aspect-video transition-transform duration-300 group-hover:brightness-105"
/>
<p className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-[#b24936]">
{relatedArticle.category} <span aria-hidden="true">·</span> {relatedArticle.readTime}
</p>
<h3 className="mt-1 font-serif text-lg leading-snug transition-colors group-hover:text-[#b24936]">
{relatedArticle.title}
</h3>
</Link>
))}
</div>
</section>
</main>
<Footer />
</>
);
}