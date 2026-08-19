"use client";

export default function ThemeToggle() {
  function toggle() {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  return (
    <button
      id="themeToggle"
      onClick={toggle}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
    >
      <i className="fa-solid fa-moon dark:hidden text-2xl" />
      <i className="fa-solid fa-sun hidden text-yellow-300 dark:block text-2xl" />
    </button>
  );
}
