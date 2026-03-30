"use client";

import { useEffect, useId, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";

const THEME_STORAGE_KEY = "certsecure:theme";

function readInitialIsDark(): boolean {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark") return true;
    if (stored === "light") return false;

    if (window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  } catch {
    // ignore
  }
  return false;
}

function applyTheme(isDark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
}

const SwitchToggleThemeDemo = () => {
  const id = useId();
  const [isDark, setIsDark] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initial = readInitialIsDark();
    setIsDark(initial);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
    } catch {
      // ignore
    }

    applyTheme(isDark);
  }, [isDark, isReady]);

  return (
    <div className="group inline-flex items-center gap-2">
      <span
        id={`${id}-light`}
        className={cn(
          "cursor-pointer text-left text-sm font-medium",
          isDark && "text-foreground/50"
        )}
        aria-controls={id}
        onClick={() => setIsDark(false)}
      >
        <SunIcon className="size-4" aria-hidden="true" />
      </span>

      <Switch
        id={id}
        checked={isDark}
        onCheckedChange={setIsDark}
        aria-labelledby={`${id}-light ${id}-dark`}
        aria-label="Toggle between dark and light mode"
      />

      <span
        id={`${id}-dark`}
        className={cn(
          "cursor-pointer text-right text-sm font-medium",
          isDark || "text-foreground/50"
        )}
        aria-controls={id}
        onClick={() => setIsDark(true)}
      >
        <MoonIcon className="size-4" aria-hidden="true" />
      </span>
    </div>
  );
};

export default SwitchToggleThemeDemo;
