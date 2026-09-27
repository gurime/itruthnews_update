import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
variable: "--font-geist-sans",
subsets: ["latin"],
});

const geistMono = Geist_Mono({
variable: "--font-geist-mono",
subsets: ["latin"],
});

export const metadata: Metadata = {
title: "iTruth News - Your Source for Unbiased News",
description: "iTruth News is your trusted source for unbiased news, in-depth analysis, and comprehensive coverage of current events. Stay informed with our expert reporting and insightful commentary.",
viewport: {
width: "device-width",
initialScale: 1,
},
icons: {
icon: "/favicon.ico",
},
manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
return (
<html
lang="en"
className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
>
<body className="min-h-full flex flex-col">{children}</body>
</html>
);
}
