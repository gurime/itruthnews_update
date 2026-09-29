export type  ArticleCategory  =
| "Politics";

export interface Article {
id: string;
slug: string;
title: string;
excerpt: string;
category: ArticleCategory;
publishedAt: string;
readTime: string;
author: string;
image?: string;
featured?: boolean;
premium?: boolean;
body: string[];
}

export const articleCategories = [
"Politics",
] as const;

export const articles: Article[] = [
{
id: "1",
slug: "Gavin-Newsom-2028-Presidential-Bid",
title: "Gavin Newsom Announces 2028 Presidential Bid",
excerpt:
"California Governor Gavin Newsom is gearing up for the 2028 election with a focus on economic growth, environmental sustainability, and social equity.",
category: "Politics",
publishedAt: "2026-09-27T08:15:00-04:00",
readTime: "5 min read",
author: "Mara Ellison",
featured: true,
image: "/images/articles/Newsom.jpeg",
body: [
"As the 2028 California gubernatorial race approaches, Governor Gavin Newsom is emphasizing a platform that prioritizes economic development, environmental stewardship, and social justice.",
"Drawing from his previous terms in office, Newsom is advocating for policies that support small businesses, invest in renewable energy, and enhance public education across the state.",
"Supporters highlight his track record of progressive leadership and his ability to navigate complex political landscapes, positioning him as a strong contender for re-election."
]
},
];