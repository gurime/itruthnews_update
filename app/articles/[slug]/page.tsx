import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock } from "lucide-react";
import { articles } from "../../ArticleData";
import ArticleArtwork from "../../components/ArticleArtwork";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

interface PageProps {
params: Promise<{ slug: string }>;
}

// 1. Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
const { slug } = await params;
const article = articles.find((item) => item.slug === slug);

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

export default async function ArticlePage({ params }: PageProps) {
const { slug } = await params;
const article = articles.find((item) => item.slug === slug);

if (!article) notFound();

return (
<>
<Navbar />
<main className="flex-1 bg-[#f6f5f0] px-5 py-10 text-[#182d35] sm:px-8 sm:py-14">
<article className="mx-auto max-w-4xl">
<Link
className="text-sm text-[#596a6d] transition hover:text-[#b24936]"
href="/"
>
← Back to headlines
</Link>
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
</article>
</main>
<Footer />
</>
);
}