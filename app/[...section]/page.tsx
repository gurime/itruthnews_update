import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import {
articles as dashboardArticles,
} from "../ArticleData/DashboardArticleData";
import { articles as politicsArticles } from "../ArticleData/PoliticsArticleData";
import {
articles as businessArticles,
type ArticleCategory,
} from "../ArticleData/BusinessArticleData";
import ArticleArtwork from "../components/ArticleArtwork";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { navMenuItems } from "../components/NavigationData";
import { specialCoverage } from "../admin/category_tables";

interface PageProps {
params: Promise<{ section: string[] }>;
}

const normalizePath = (href: string) =>
(href.startsWith("./") ? href.slice(1) : href).toLowerCase();

const menuRoutes = navMenuItems.flatMap((item) =>
item.sections.flatMap((section) =>
section.links.map((link) => ({ path: normalizePath(link.href), label: link.label })),
),
);

const specialRoutes = Object.values(specialCoverage).flatMap((links) =>
links.map((link) => ({ path: normalizePath(link.href), label: link.label })),
);

const categoryRoutes: Array<[string, ArticleCategory]> = [
["/politics", "Politics"],
["/economy", "Economy"],
["/world", "World"],
["/asia", "World"],
["/europe", "World"],
["/africa", "World"],
["/middle-east", "World"],
["/americas", "World"],
["/south-america", "World"],
["/technology", "Technology"],
["/opinion", "Opinion"],
["/arts", "Culture"],
["/culture", "Culture"],
["/climate", "Environment"],
["/environment", "Environment"],
["/business", "Business"],
["/markets", "Business"],
];

function getCategory(path: string) {
return categoryRoutes.find(
([prefix]) => path === prefix || path.startsWith(`${prefix}/`),
)?.[1];
}

function formatLabel(value: string) {
return value
.split("-")
.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
.join(" ");
}

export default async function SectionPage({ params }: PageProps) {
const { section } = await params;
const path = `/${section.join("/")}`.toLowerCase();
const route = [...menuRoutes, ...specialRoutes].find(
(item) => item.path === path,
);
const category = getCategory(path);
const categoryAlias = categoryRoutes.some(([alias]) => alias === path);

if (!route && !categoryAlias) notFound();

const title = route?.label ?? formatLabel(section.at(-1) ?? "Section");
const allArticles = [...dashboardArticles, ...politicsArticles, ...businessArticles];
const businessSection = path === "/markets" || path.startsWith("/markets/")
? "markets"
: path.startsWith("/business/")
? section.at(-1)
: undefined;
const articles = allArticles
.filter((article) => category && article.category === category)
.filter((article) => {
if (category !== "Business" || path === "/business" || !businessSection) return true;
return "section" in article && article.section === businessSection;
})
.sort(
(first, second) =>
new Date(second.publishedAt).getTime() -
new Date(first.publishedAt).getTime(),
);
const featuredArticle =
category === "Business"
? businessArticles.find((article) =>
article.category === category &&
article.featured &&
(path === "/business" || !businessSection || article.section === businessSection),
)
: category === "Politics"
? politicsArticles.find((article) => article.category === category && article.featured) ??
dashboardArticles.find((article) => article.category === category && article.featured)
: dashboardArticles.find((article) => category && article.category === category && article.featured);
const otherArticles = featuredArticle
? articles.filter((article) => article.slug !== featuredArticle.slug)
: articles;

return (
<>
<Navbar />
<main className="min-h-[60vh] bg-[#f6f5f0] px-5 py-10 text-[#182d35] sm:px-8 sm:py-14">
<div className="mx-auto max-w-7xl">
<nav
aria-label="Breadcrumb"
className="mb-8 flex items-center gap-2 text-sm text-[#596a6d]"
>
<Link
href="/"
aria-label="Home"
className="inline-flex items-center gap-1.5 transition hover:text-[#b24936]"
>
<Home aria-hidden="true" size={15} />
<span>Home</span>
</Link>
<ChevronRight aria-hidden="true" className="shrink-0" size={14} />
<span aria-current="page" className="font-medium text-[#182d35]">
{title}
</span>
</nav>

<div className="mb-5 flex items-end justify-between gap-5">
<div>
<p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[#b24936]">
The iTruth News Briefing
</p>
<h1 id="daily-briefing" className="max-w-3xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
What the headlines don&apos;t tell you.
</h1>
</div>
<p className="hidden max-w-xs pb-1 text-sm leading-6 text-[#596a6d] md:block">
Clear-eyed reporting on the decisions and people shaping what comes next.
</p>
</div>

{articles.length > 0 ? (
<>
{featuredArticle && (
<Link
href={`/articles/${featuredArticle.slug}`}
className="group mt-8 grid overflow-hidden rounded-sm bg-[#0b0f98] text-white md:grid-cols-[1.03fr_0.97fr]"
>
<div className="flex flex-col justify-between px-6 py-7">
<div>
<p className="mb-5 bg-[#b24936] font-mono text-[11px] uppercase tracking-[0.17em] text-white w-fit px-2.5 py-1">
Editor&apos;s pick · {featuredArticle.category}
</p>
<h2 className="max-w-2xl font-serif text-3xl leading-tight transition-colors group-hover:text-[#f0c882] sm:text-4xl">
{featuredArticle.title}
</h2>
<p className="mt-5 max-w-xl text-sm leading-6 text-white/75">
{featuredArticle.excerpt}
</p>
</div>
<p className="mt-8 border-t border-white/20 pt-4 text-xs text-white/70">
{featuredArticle.author} · {featuredArticle.readTime}
</p>
</div>
<ArticleArtwork
category={featuredArticle.category}
title={featuredArticle.title}
image={featuredArticle.image}
className="aspect-[1.55] h-full w-full md:aspect-auto"
/>
</Link>
)}
{otherArticles.length > 0 && (
<div className="mt-8 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
{otherArticles.map((article) => (
<Link
key={article.slug}
href={`/articles/${article.slug}`}
className="group min-w-0"
>
<ArticleArtwork
category={article.category}
title={article.title}
image={article.image}
className="aspect-[1.55]"
/>
<p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-[#b24936]">
{article.category} <span aria-hidden="true">·</span> {article.readTime}
</p>
<h2 className="mt-2 font-serif text-2xl leading-snug transition-colors group-hover:text-[#b24936]">
{article.title}
</h2>
<p className="mt-2 text-sm leading-6 text-[#596a6d]">{article.excerpt}</p>
</Link>
))}
</div>
)}
</>
) : (
<p className="mt-8 border-l-2 border-[#b24936] pl-4 text-sm leading-6 text-[#596a6d]">
There are no stories in this section yet.
</p>
)}
</div>
</main>
<Footer />
</>
);
}