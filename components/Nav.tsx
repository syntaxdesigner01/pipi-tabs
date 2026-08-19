import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const STORE_URL = "https://chromewebstore.google.com/detail/Pipi/fpenkllimfengpmkkcmpkmcplkboboak";

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="bg-yellow-300 text-black text-center py-2 font-medium">
        <div className="flex justify-center items-center gap-2 text-sm md:text-base">
          <span>🚀 We are LIVE on the Chrome Web Store!</span>
          <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="font-bold underline">
            Install Now!
          </a>
        </div>
      </div>

      <nav className="w-full backdrop-blur-xl z-50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
          <Link href="/" className="font-great-vibes text-3xl dark:text-white font-bold text-primary">
            Pipi Tabs
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline dark:text-white hidden md:block"
            >
              Install Now
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
