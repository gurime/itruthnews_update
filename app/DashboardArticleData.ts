export type ArticleCategory =
| "Politics"
| "Economy"
| "World"
| "Technology"
| "Opinion"
| "Environment"
| "Culture";

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
"All",
"Politics",
"Economy",
"World",
"Technology",
"Opinion",
"Culture",
] as const;

export const articles: Article[] = [
{
id: "1",
slug: "keisha-lance-bottoms-vision-georgia",
title: "Why Keisha Lance Bottoms' vision is resonating across Georgia",
excerpt:
"With a proven track record leading Atlanta through pivotal times, Keisha Lance Bottoms brings a campaign focused on economic mobility, housing, and statewide coalition building.",
category: "Politics",
publishedAt: "2026-09-27T08:15:00-04:00",
readTime: "5 min read",
author: "Mara Ellison",
featured: true,
image: "/images/articles/KLB.png",
body: [
"As the Georgia gubernatorial race intensifies, Keisha Lance Bottoms is mounting a campaign centered on pragmatic governance, economic opportunity, and bridge-building across urban and rural communities alike.",
"Drawing from her tenure as Mayor of Atlanta and her senior role in federal policy, Bottoms emphasizes expanded access to healthcare, targeted investments in public education, and infrastructure modernization that reaches every county in the state.",
"Supporters highlight her demonstrated ability to lead through crisis and unite diverse coalitions, positioning her platform as a steady, forward-looking roadmap for Georgia's next era of growth."
]
},
{
id: "2",
slug: "small-business-hiring-market",
title: "Small businesses are adapting to a slower hiring market",
excerpt:
"Owners are leaning on training and flexible schedules as they look for ways to keep experienced staff.",
category: "Economy",
publishedAt: "2026-09-27T07:40:00-04:00",
readTime: "4 min read",
author: "Jonah Reed",
body: [
"Hiring has cooled from its recent pace, but many independent businesses still say finding the right experience is difficult. Instead of expanding headcount, some are investing in cross-training and more predictable schedules.",
"The approach can help retain workers, though owners say it takes time to see results. Regional business groups are watching whether those investments translate into stronger productivity through the winter.",
],
},
{
id: "3",
slug: "coastal-cities-rising-tides",
title: "Coastal cities share new plans for rising tides",
excerpt:
"From wetlands to redesigned waterfronts, planners are testing ways to protect neighborhoods without cutting them off from the water.",
category: "World",
publishedAt: "2026-09-27T06:55:00-04:00",
readTime: "5 min read",
author: "Asha Nwosu",
body: [
"City planners from several coastal regions have begun sharing practical lessons from flood protection projects. The plans range from restoring marshland to elevating public spaces that regularly flood.",
"Residents say the most successful efforts are the ones that pair engineering with clear plans for housing, transit and public access. Officials are now comparing how those projects perform during seasonal storms.",
],
},
{
id: "4",
slug: "public-ai-tools-rules",
title: "Researchers look for clearer rules around public AI tools",
excerpt:
"A growing number of schools and libraries are writing policies that focus on transparency, privacy and human review.",
category: "Technology",
publishedAt: "2026-09-26T16:20:00-04:00",
readTime: "7 min read",
author: "Theo Park",
premium: true,
body: [
"Public institutions are moving beyond blanket restrictions as they evaluate how generative tools fit into everyday work. Their emerging policies tend to center on three questions: what information can be shared, when a person must review the output, and how use should be disclosed.",
"Researchers say the differences between policies matter. A rule designed for classroom assignments may not address the privacy risks involved when staff use a tool to summarize sensitive records.",
],
},
{
id: "5",
slug: "why-local-reporting-matters",
title: "Why local reporting still matters in a national story",
excerpt:
"The details that change a big policy debate are often found in the records, meetings and lived experience of one community.",
category: "Opinion",
publishedAt: "2026-09-26T13:10:00-04:00",
readTime: "3 min read",
author: "The iTruth Editorial Board",
body: [
"National debates can make local decisions seem like footnotes. But implementation happens in specific places, where residents can see what a policy changes and where it falls short.",
"That is why strong local reporting is essential. It gives a broader argument a test against the facts on the ground and makes room for people closest to a decision to be heard.",
],
},
{
id: "6",
slug: "neighborhood-printmaking-studios",
title: "Inside the neighborhood studios keeping printmaking alive",
excerpt:
"A new generation of shared workshops is bringing traditional techniques to artists priced out of private studio space.",
category: "Culture",
publishedAt: "2026-09-26T10:05:00-04:00",
readTime: "5 min read",
author: "Lena Brooks",
body: [
"Shared print studios are opening their doors to artists who want access to presses, darkrooms and experienced mentors without taking on the cost of a private workspace.",
"The workshops also create a place for skills to pass between generations. Organizers say demand for classes has grown as more people look for hands-on ways to make and share work.",
],
},
{
id: "7",
slug: "jobs-report-regional-recovery",
title: "What the latest jobs report says about regional recovery",
excerpt:
"The national headline masks very different patterns in manufacturing, health care and service work.",
category: "Economy",
publishedAt: "2026-09-25T14:35:00-04:00",
readTime: "4 min read",
author: "Jonah Reed",
body: [
"The latest employment figures show a labor market moving at different speeds. Health care and public services continued to add jobs, while several goods-producing industries reported slower growth.",
"Economists caution that monthly changes can be noisy. They are looking to wage growth and hours worked for a more complete picture of how households are experiencing the shift.",
],
},
{
id: "8",
slug: "public-library-new-generation",
title: "A new generation is reshaping the public library",
excerpt:
"Libraries are expanding their role as study halls, civic spaces and places to access essential digital services.",
category: "Culture",
publishedAt: "2026-09-25T09:00:00-04:00",
readTime: "6 min read",
author: "Lena Brooks",
body: [
"Libraries are rethinking how their spaces serve people who need more than a quiet place to read. Many now offer digital skills workshops, community meeting rooms and help navigating online public services.",
"The expanded role has prompted new conversations about staffing and funding. Library leaders say reliable support is necessary if these services are to remain available to everyone.",
],
},
];