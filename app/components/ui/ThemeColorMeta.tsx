"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

const lightColor = "#FAF9F7";
const darkColor = "#1C1917";

export function ThemeColorMeta() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute(
        "content",
        resolvedTheme === "dark" ? darkColor : lightColor
      );
    }
  }, [resolvedTheme]);

  return null;
}
