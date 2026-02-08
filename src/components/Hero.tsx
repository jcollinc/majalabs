"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Hero() {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const threshold = window.innerHeight;
    setProgress(Math.min(Math.max(scrollY / threshold, 0), 1));
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleEnter = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  const eased = easeInOutCubic(progress);
  const isFullyOpen = progress >= 0.99;

  return (
    <>
      {/* Fixed hero overlay with door effect */}
      <div
        className="fixed inset-0 z-50"
        style={{
          visibility: isFullyOpen ? "hidden" : "visible",
          pointerEvents: isFullyOpen ? "none" : "auto",
        }}
      >
        {/* Left door panel */}
        <div
          className="absolute top-0 left-0 h-full w-[51%] bg-cream-50 will-change-transform"
          style={{ transform: `translateX(${-eased * 100}%)` }}
        />
        {/* Right door panel */}
        <div
          className="absolute top-0 right-0 h-full w-[51%] bg-cream-50 will-change-transform"
          style={{ transform: `translateX(${eased * 100}%)` }}
        />

        {/* Radial glow behind logo */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 45%, var(--color-cream-100) 0%, transparent 70%)",
            opacity: 1 - eased,
          }}
        />

        {/* Centered hero content */}
        <div
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 cursor-pointer"
          onClick={handleEnter}
          onKeyDown={(e) => e.key === "Enter" && handleEnter()}
          role="button"
          tabIndex={0}
          aria-label="Click to enter site"
        >
          {/* Split logo: MAJA ← → LABS */}
          <div className="flex items-baseline gap-[0.35em]">
            <span
              className="text-embossed text-5xl font-semibold tracking-[0.25em] uppercase text-warm-600 sm:text-6xl md:text-7xl lg:text-8xl select-none will-change-transform"
              style={{ transform: `translateX(${-eased * 50}vw)` }}
            >
              Maja
            </span>
            <span
              className="text-embossed text-5xl font-semibold tracking-[0.25em] uppercase text-warm-600 sm:text-6xl md:text-7xl lg:text-8xl select-none will-change-transform"
              style={{ transform: `translateX(${eased * 50}vw)` }}
            >
              Labs
            </span>
          </div>

          {/* Ornamental flourish underline */}
          <div
            className="mt-4 w-[260px] sm:w-[320px] opacity-40"
            style={{ opacity: Math.max(0, 0.4 - eased * 1.0) }}
          >
            <Image
              src="/images/misc/underline.svg"
              alt=""
              width={375}
              height={375}
              className="w-full h-auto"
              aria-hidden="true"
              priority
            />
          </div>

          {/* Tagline */}
          <p
            className="mt-6 max-w-md text-lg font-light tracking-wide text-warm-400 sm:text-xl"
            style={{ opacity: Math.max(0, 1 - eased * 2) }}
          >
            Thoughtfully crafted software
          </p>

          {/* Subtle scroll hint — pinned to bottom */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce"
            style={{ opacity: Math.max(0, (1 - eased * 3) * 0.5) }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              className="text-warm-400/40"
            >
              <path
                d="M10 4v12m0 0l-4-4m4 4l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* In-flow spacer — scrolling through this drives the door animation */}
      <div className="h-screen" aria-hidden="true" />
    </>
  );
}
