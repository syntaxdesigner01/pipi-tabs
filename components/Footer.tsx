import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-10 border-t border-gray-100 dark:border-gray-800 text-center text-gray-400 text-sm transition-colors duration-300 md:relative top-40">
      <p>
        © 2026 Pipi Tabs – Built by Akpan Joseph |{" "}
        <Link href="/privacy" className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          Privacy Policy
        </Link>
      </p>
    </footer>
  );
}
