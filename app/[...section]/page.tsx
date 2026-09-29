import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import {
articles as dashboardArticles,
type ArticleCategory,
} from "../DashboardArticleData";
import { articles as politicsArticles } from "../politics/PoliticsArticleData";
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
["/markets", "Economy"],
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
const articles = [...dashboardArticles, ...politicsArticles]
.filter((article) => category && article.category === category)
.sort(
(first, second) =>
new Date(second.publishedAt).getTime() -
new Date(first.publishedAt).getTime(),
);

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

<header className="border-b border-[#c8cbc4] pb-6">
<p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-[#b24936]">
iTruth News
</p>
<h1 className="font-serif text-4xl sm:text-5xl">{title}</h1>
</header>

{articles.length > 0 ? (
<div className="mt-8 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
{articles.map((article) => (
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