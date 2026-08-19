"use client";

import { useEffect } from "react";

/** Fade-up-on-scroll observer, features parallax, and back-to-top visibility — client-only DOM effects. */
export default function ScrollEffects() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

    function onScroll() {
      const features = document.getElementById("features");
      if (features) {
        features.style.setProperty("--bg-y", `${window.scrollY * 0.2}px`);
      }
      const backToTopBtn = document.getElementById("backToTop");
      if (backToTopBtn) {
        if (window.scrollY > 500) {
          backToTopBtn.classList.remove("opacity-0", "translate-y-10");
        } else {
          backToTopBtn.classList.add("opacity-0", "translate-y-10");
        }
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
