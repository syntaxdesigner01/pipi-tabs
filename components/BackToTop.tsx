"use client";

export default function BackToTop() {
  return (
    <button
      id="backToTop"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to Top"
      className="fixed bottom-[10em] flex items-center justify-center right-6 z-50 p-4 h-12 w-12 rounded-full bg-black text-white shadow-[0_0_15px_#4c763b] transition-all duration-300 opacity-0 translate-y-10 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 focus:outline-none border-4 border-secondary animate-ripple-glow"
    >
      <i className="fa-solid fa-arrow-up" />
    </button>
  );
}
