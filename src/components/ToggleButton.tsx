"use client";

import { useDarkMode } from "@/context/ThemeContext";

export default function ToggleButton() {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="cursor-pointer ml-auto flex items-center gap-2 px-4 py-2 text-sm rounded border border-gray-800 bg-gray-800 text-gray-100 dark:bg-gray-200 dark:text-gray-900 dark:border-gray-200"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
