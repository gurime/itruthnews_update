import Image from "next/image";
import {
type LucideIcon,
BarChart3,
Cpu,
Globe2,
Landmark,
Mic2,
Palette,
} from "lucide-react";
import type { ArticleCategory } from "../ArticleData/DashboardArticleData";

const categoryArtwork: Record<
ArticleCategory,
{ icon: LucideIcon; background: string; accent: string }
> = {
Politics: {
icon: Landmark,
background: "from-[#092d3f] via-[#17627a] to-[#e5a65b]",
accent: "bg-[#edc37e]",
},
Economy: {
icon: BarChart3,
background: "from-[#183c33] via-[#39745e] to-[#d3b46e]",
accent: "bg-[#e3c47d]",
},
Business: {
icon: BarChart3,
background: "from-[#263c45] via-[#54706b] to-[#c9a96e]",
accent: "bg-[#e3c47d]",
},
World: {
icon: Globe2,
background: "from-[#143a50] via-[#357a86] to-[#e2a276]",
accent: "bg-[#f1bd91]",
},
Technology: {
icon: Cpu,
background: "from-[#293248] via-[#526d84] to-[#89a598]",
accent: "bg-[#d9a77e]",
},
Opinion: {
icon: Mic2,
background: "from-[#573c35] via-[#a4664c] to-[#dec28b]",
accent: "bg-[#e9ce96]",
},
Culture: {
icon: Palette,
background: "from-[#4a3150] via-[#9d5e70] to-[#dfb478]",
accent: "bg-[#f0cd8b]",
},
Environment: {
icon: Globe2,
background: "from-[#1a4a3d] via-[#3b8c6d] to-[#a8d9b8]",
accent: "bg-[#c0e0c8]",
},
};

// Fallback in case categoryArtwork[category] is undefined
const defaultArtwork = {
icon: Landmark,
background: "from-[#092d3f] via-[#17627a] to-[#e5a65b]",
accent: "bg-[#edc37e]",
};

export default function ArticleArtwork({
category,
title,
image,
className = "",
}: {
category: ArticleCategory;
title: string;
image?: string;
className?: string;
}) {
const artwork = categoryArtwork[category] ?? defaultArtwork;
const Icon = artwork.icon;

return (
<div
className={`relative isolate bg-linear-to-br ${artwork.background} ${className}`}
role="img"
aria-label={`${category} illustration for ${title}`}
>
{image ? (
<Image
src={image}
alt={title}
width={1000}
height={100}
loading="eager"
className=" h-full w-full object-fill object-center"
/>
) : (
<>
<div className="absolute -right-10 -top-14  rounded-full border border-white/25" />
<div className="absolute -right-2 -top-6 h-48 w-48 rounded-full border border-white/20" />
<div
className={`absolute bottom-0 right-[18%] h-[68%] w-[24%] -skew-x-12 ${artwork.accent} opacity-75`}
/>
<div className="absolute bottom-0 right-[42%] h-[44%] w-[17%] -skew-x-12 bg-black/15" />
<Icon
aria-hidden="true"
className="absolute bottom-7 left-7 h-20 w-20 text-white/90 md:h-28 md:w-28"
strokeWidth={1.1}
/>
<span className="absolute left-7 top-7 font-mono text-xs uppercase tracking-[0.2em] text-white/85">
{category}
</span>
</>
)}
</div>
);
}