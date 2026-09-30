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
image: "/images/articles/Newsom.png",
body: [
"As the 2028 California gubernatorial race approaches, Governor Gavin Newsom is emphasizing a platform that prioritizes economic development, environmental stewardship, and social justice.",
"Drawing from his previous terms in office, Newsom is advocating for policies that support small businesses, invest in renewable energy, and enhance public education across the state.",
"Supporters highlight his track record of progressive leadership and his ability to navigate complex political landscapes, positioning him as a strong contender for re-election."
]
},
{
id: "2",
slug: "local-zoning-state-housing-policy-debate",
title: "Why local zoning decisions are becoming a state-level debate",
excerpt:
"Housing rules are usually set close to home, but disagreements over growth and affordability are drawing state lawmakers into local decisions.",
category: "Politics",
publishedAt: "2026-09-28T08:15:00-04:00",
readTime: "4 min read",
author: "Mara Ellison",
image: "/images/articles/zoning.jpeg",
body: [
"Decisions about where homes can be built are often made locally, but their effects reach beyond city borders. That tension has put zoning and housing supply at the center of debate among local officials, state lawmakers and residents.",
"Supporters of broader state standards argue that housing needs cross municipal boundaries. Local leaders, meanwhile, say planning rules must account for infrastructure, neighborhood conditions and community input.",
"The debate is not only about which rules to adopt, but who should set them. As communities weigh state goals against local authority, choices about transit, utilities, affordability and public participation will shape how new policies work on the ground."
]
},
];