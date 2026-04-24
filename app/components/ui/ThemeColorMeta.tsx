"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

const lightColor = "#FAF9F7";
const darkColor = "#1C1917";

export function ThemeColorMeta() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const color = resolvedTheme === "dark" ? darkColor : lightColor;

    // Safari only updates theme-color when the meta tag is removed and re-added
    let meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.remove();
    }

    meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    meta.setAttribute("content", color);
    document.head.appendChild(meta);
  }, [resolvedTheme]);

  return null;
}
