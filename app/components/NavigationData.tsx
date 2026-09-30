import { NavMenuItem } from "../utils/Types";

// NOTE: the original desktop markup used "/technology/*" routes while the
// mobile markup used "/tech/*" for the same links (a pre-existing
// inconsistency). This file standardizes on "/technology/*" for both.
// Also fixed: Sports > Other Sports had two links both labeled "Boxing"
// (one pointing to /sports/boxing, one to /sports/wrestling) — the second
// is now labeled "Wrestling" to match its href.

export const navMenuItems: NavMenuItem[] = [
{
id: "news",
label: "Latest News",
panelWidth: "w-96",
sections: [
{
id: "us-news",
label: "U.S. News",
links: [
{ label: "Politics", href: "./politics" },
{ label: "Economy", href: "./economy" },
{ label: "Crime", href: "./crime" },
{ label: "Climate", href: "./climate" },


],
},
{
id: "world",
label: "World",
links: [
{ label: "Asia", href: "./asia" },
{ label: "Europe", href: "./europe" },
{ label: "Africa", href: "./africa" },
{ label: "Middle East", href: "./middle-east" },
{ label: "Americas", href: "./americas" },
{ label: "South America", href: "./south-america" },
],
},
],
},
{
id: "business",
label: "iTruth Business",
isSubscribed: true,
panelWidth: "w-96",
sections: [
{
id: "markets",
label: "Markets",
links: [
{ label: "Stocks", href: "./markets/stocks" },
{ label: "U.S. Markets", href: "./markets/us" },
{ label: "Pre-Markets", href: "./markets/pre" },
{ label: "Cryptocurrency", href: "./markets/crypto" },
{ label: "Futures & Commodities", href: "./markets/futures" },
{ label: "Bonds", href: "./markets/bonds" },
{ label: "ETFs", href: "./markets/etfs" },
{ label: "Mutual Funds", href: "./markets/mutual-funds" },
],
},
],
},
{
id: "opinion",
label: "Opinion",
panelWidth: "w-64",
sections: [
{
id: "editorials",
label: "Editorials",
links: [
{ label: "Columnists", href: "/opinion/columnist" },
{ label: "Guest Voices", href: "./opinion/guest-voices" },
{ label: "Editorials", href: "./opinion/editorials" },
{ label: "Letters to the Editor", href: "./opinion/letters" },
{ label: "The Editorial Board", href: "./opinion/editorial-board" },
],
},
{
id: "sections",
label: "Sections",
links: [
{ label: "Politics", href: "./opinion/sections/politics" },
{ label: "World", href: "./opinion/sections/world" },
{ label: "Culture", href: "./opinion/sections/culture" },
{ label: "Economy", href: "./opinion/sections/economy" },
{ label: "Technology", href: "./opinion/sections/technology" },
{ label: "Climate", href: "./opinion/sections/climate" },
],
},
{
id: "editors-picks",
label: "Editor's Picks",
links: [
{ label: "Trending Voices", href: "./opinion/editors-picks" },
{ label: "Weekend Reads", href: "./opinion/weekend-reads" },
],
},
],
},
{
id: "lifestyle",
label: "Lifestyle",
panelWidth: "w-80",
sections: [
{
id: "wellness",
label: "Health & Wellness",
links: [
{ label: "Fitness", href: "./fitness" },
{ label: "Nutrition", href: "./nutrition" },
{ label: "Mental Health", href: "./mental-health" },
{ label: "Yoga & Meditation", href: "./yoga-Meditation" },
{ label: "Sleep", href: "./sleep" },
],
},
{
id: "fashion",
label: "Fashion",
links: [
{ label: "Beauty", href: "./beauty" },
{ label: "Style", href: "./style" },
{ label: "Models", href: "./models" },
{ label: "Runway", href: "./runway" },
{ label: "Designers", href: "./designers" },
{ label: "Makeup", href: "./makeup" },
{ label: "Accessories", href: "./accessories" },
{ label: "Skincare", href: "./skincare" },
{ label: "Hair", href: "./hair" },
],
},
{
id: "food",
label: "Food",
links: [
{ label: "Recipes", href: "./recipes" },
{ label: "Restaurants", href: "./restaurants" },
{ label: "Cooking Tips", href: "./cooking-tips" },
{ label: "Wine & Spirits", href: "./wine-spirits" },
{ label: "Food News", href: "./food-news" },
{ label: "Chefs", href: "./chefs" },
],
},
{
id: "family",
label: "Family & Relationships",
links: [
{ label: "Family", href: "./family" },
{ label: "Parenting", href: "./parenting" },
{ label: "Relationships", href: "./relationships" },
{ label: "Weddings", href: "./weddings" },
{ label: "Pregnancy & Baby", href: "./pregnancy" },
{ label: "Pets", href: "./pets" },
],
},
{
id: "home",
label: "Home & Garden",
links: [
{ label: "Real Estate", href: "./real-estate" },
{ label: "Home Design", href: "./home-design" },
{ label: "Interior Design", href: "./interior-design" },
{ label: "Gardening", href: "./gardening" },
{ label: "DIY & Home Improvement", href: "./diy" },
{ label: "Architecture", href: "./architecture" },
],
},
{
id: "travel",
label: "Travel",
links: [
{ label: "Destinations", href: "./destinations" },
{ label: "Travel Tips", href: "./travel-tips" },
{ label: "Luxury Travel", href: "./luxury-travel" },
{ label: "Budget Travel", href: "./budget-travel" },
{ label: "Hotels & Resorts", href: "/hotels" },
],
},
{
id: "other",
label: "Other",
links: [
{ label: "Cars", href: "./cars" },
{ label: "Luxury Living", href: "./luxury" },
{ label: "Shopping", href: "./shopping" },
{ label: "Hobbies", href: "./hobbies" },
],
},
// "Special Coverage" is appended at render time in Navbar.tsx,
// since it depends on the current month.
],
},
{
id: "technology",
label: "Technology",
panelWidth: "w-80",
align: "right",
sections: [
{
id: "personal-tech",
label: "Personal Tech",
links: [
{ label: "Smartphones", href: "./technology/smartphones" },
{ label: "Laptops & Computers", href: "./technology/laptops" },
{ label: "Wearables", href: "./technology/wearables" },
{ label: "Smart Home", href: "./technology/smart-home" },
{ label: "Audio & Headphones", href: "./technology/audio" },
],
},
{
id: "business-innovation",
label: "Business & Innovation",
links: [
{ label: "Artificial Intelligence", href: "./technology/artificial-intelligence" },
{ label: "Startups", href: "./technology/startups" },
{ label: "Cybersecurity", href: "./technology/cybersecurity" },
{ label: "Internet & Social Media", href: "./technology/internet" },
{ label: "Silicon Valley", href: "/technology/silicon-valley" },
],
},
{
id: "reviews-guides",
label: "Reviews & Guides",
links: [
{ label: "Product Reviews", href: "./technology/reviews" },
{ label: "Buying Guides", href: "./technology/buying-guides" },
{ label: "How-To & Tips", href: "./technology/how-to" },
],
},
{
id: "gaming",
label: "Gaming",
links: [
{ label: "Video Games", href: "./technology/gaming" },
{ label: "PC Gaming", href: "./technology/gaming/pc" },
{ label: "Consoles", href: "./technology/gaming/consoles" },
{ label: "Esports", href: "./technology/gaming/esports" },
],
},
],
},
{
id: "sports",
label: "Sports",
panelWidth: "w-80",
align: "right",
sections: [
{
id: "professional",
label: "Professional",
links: [
{ label: "Pro Football", href: "./sports/football" },
{ label: "Pro Basketball", href: "./sports/basketball" },
{ label: "Baseball", href: "./sports/baseball" },
{ label: "Hockey", href: "./sports/hockey" },
{ label: "Soccer", href: "./sports/soccer" },
{ label: "Golf", href: "./sports/golf" },
{ label: "Tennis", href: "/sports/tennis" },
],
},
{
id: "college",
label: "College Sports",
links: [
{ label: "College Football", href: "./sports/college-football" },
{ label: "College Basketball", href: "./sports/college-basketball" },
],
},
{
id: "international",
label: "International",
links: [
{ label: "World Cup", href: "./sports/world-cup" },
{ label: "Olympics", href: "./sports/olympics" },
{ label: "Premier League", href: "./sports/premier-league" },
],
},
{
id: "other-sports",
label: "Other Sports",
links: [
{ label: "Boxing & MMA", href: "./sports/boxing" },
{ label: "Auto Racing", href: "./sports/auto-racing" },
{ label: "Track & Field", href: "./sports/track-and-field" },
{ label: "UFC", href: "./sports/ufc" },
{ label: "Wrestling", href: "./sports/wrestling" },
{ label: "WWE", href: "./sports/wwe" },
],
},
{
id: "features",
label: "Features",
links: [
{ label: "Columns", href: "./sports/columns" },
{ label: "Podcasts", href: "./sports/podcasts" },
{ label: "Photos", href: "/sports/photos" },
],
},
],
},
{
id: "arts",
label: "Arts",
panelWidth: "w-80",
align: "right",
sections: [
{
id: "arts-culture",
label: "Arts & Culture",
links: [
{ label: "Theater", href: "./arts/theater" },
{ label: "Art & Design", href: "./arts/art-design" },
{ label: "Dance", href: "./arts/dance" },
{ label: "Books", href: "./arts/books" },
{ label: "Music", href: "./arts/music" },
],
},
{
id: "screen",
label: "Screen",
links: [
{ label: "Movies", href: "./arts/movies" },
{ label: "Television", href: "./arts/television" },
{ label: "Streaming", href: "./arts/streaming" },
],
},
{
id: "pop-culture",
label: "Pop Culture",
links: [
{ label: "Pop Music", href: "./arts/pop-music" },
{ label: "Comedy", href: "./arts/comedy" },
{ label: "Podcasts", href: "./arts/podcasts" },
{ label: "Best of Culture", href: "./arts/best-of" },
],
},
{
id: "arts-features",
label: "Features",
links: [
{ label: "Critics' Picks", href: "./arts/critics-picks" },
{ label: "Reviews", href: "./arts/reviews" },
{ label: "What to Watch", href: "./arts/what-to-watch" },
{ label: "What to Read", href: "./arts/what-to-read" },
],
},
],
},
];