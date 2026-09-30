// app/components/ScrollToTop.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  // Stop the browser from restoring the old scroll position on back/forward
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Scroll to the top of the actual content on every route change,
  // so a sticky Navbar doesn't leave the page looking half-scrolled
  useEffect(() => {
    const main = document.getElementById("main-content");
    if (main) {
      main.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [pathname]);

  return null;
}