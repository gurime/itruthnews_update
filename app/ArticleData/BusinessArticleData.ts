export type ArticleCategory =
| "Politics"
| "Economy"
| "Business"
| "World"
| "Technology"
| "Opinion"
| "Environment"
| "Culture";

export interface Article {
id: string;
slug: string;
section: BusinessSection;
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

export type BusinessSection =
| "markets"
| "companies"
| "earnings"
| "economy"
| "industries"
| "startups"
| "technology"
| "mergers"
| "personal-finance"
| "banking"
| "investing"
| "retirement"
| "taxes"
| "real-estate"
| "briefing"
| "interviews"
| "analysis"
| "economic-calendar";

export const articleCategories = [
"All",
"Politics",
"Economy",
"Business",
"World",
"Technology",
"Opinion",
"Culture",
] as const;

export const articles: Article[] = [
{
id: "1",
slug: "markets-open-higher-investors-weigh-economic-data",
section: "markets",
title: "Markets open higher as investors weigh new economic data",
excerpt:
"Stocks moved higher in early trading as investors assessed fresh economic indicators and the outlook for interest rates.",
category: "Business",
publishedAt: "2026-10-02T09:15:00-04:00",
readTime: "5 min read",
author: "Daniel Mercer",
featured: true,
premium: true,
image: "/images/articles/bull_run.jpeg",
body: [
"U.S. markets opened higher Friday as investors worked through a fresh round of economic data and reassessed expectations for monetary policy.",

"Financial markets have remained sensitive to incoming data as traders balance evidence of continued economic activity against signs that growth is beginning to moderate.",

"Analysts are also watching corporate earnings and guidance for clues about how companies are navigating changes in consumer demand, borrowing costs and operating expenses.",
],
},

{
id: "2",
slug: "companies-rethink-hiring-as-growth-cools",
section: "companies",
title: "Companies rethink hiring as growth cools",
excerpt:
"Businesses are taking a more measured approach to hiring as executives balance growth plans with rising operating costs.",
category: "Business",
publishedAt: "2026-10-02T08:10:00-04:00",
readTime: "4 min read",
author: "Maya Chen",
premium: true,
body: [
"Companies across several industries are taking a more cautious approach to hiring as executives reassess expansion plans.",

"Some businesses are prioritizing productivity investments and internal training over rapid headcount growth.",

"The shift could have broader implications for workers and regional economies if employers maintain a more conservative approach through the end of the year.",
],
},

{
id: "3",
slug: "what-investors-are-watching-this-week",
section: "markets",
title: "What investors are watching this week",
excerpt:
"From economic data to corporate earnings, several developments could shape the direction of financial markets.",
category: "Business",
publishedAt: "2026-10-01T17:30:00-04:00",
readTime: "6 min read",
author: "Evan Brooks",
premium: true,
body: [
"Investors enter the week focused on a combination of economic releases, corporate developments and shifting expectations around interest rates.",

"Market participants are also watching earnings announcements for evidence of how companies are responding to changes in demand and financing conditions.",

"Taken together, the developments could provide a clearer picture of where investors see opportunities and risks heading into the next quarter.",
],
},
];
