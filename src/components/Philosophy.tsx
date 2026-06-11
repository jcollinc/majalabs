"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const titles = [
  "Co-Founder",
  "CEO",
  "CTO",
  "CFO",
  "COO",
  "CMO",
  "CIO",
  "CPO",
  "CAT",
  "Actor",
  "Producer",
  "Rapper",
  "Musician",
  "Thought Leader",
  "Intern",
  "Visionary",
  "Disruptor",
  "Serial Entrepreneur",
  "Keynote Speaker",
  "Growth Hacker",
  "Middle Manager",
  "Individual Contributor",
  "Stakeholder",
  "Scrum Master",
];

function shuffled(list: string[]): string[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const values = [
  {
    title: "Solve real problems",
    body: "Every product starts with a genuine personal frustration. If it doesn't make our own lives better, it's not ready for anyone else's.",
  },
  {
    title: "Sweat the details",
    body: "Every edge case considered, thrice. The best software feels invisible because someone cared about everything.",
  },
  {
    title: "Keep it simple",
    body: "Complexity is easy. Simplicity is earned. We strip away everything that doesn't serve the person using the product.",
  },
];

export default function Philosophy() {
  const [spinning, setSpinning] = useState(false);
  const [title, setTitle] = useState("Co-Founder");
  // Titles are dealt from a shuffled deck: every title appears once
  // per cycle, in random order, before any can come around again
  const deckRef = useRef<string[]>([]);

  const [wiggling, setWiggling] = useState(false);
  const portraitRef = useRef<HTMLImageElement>(null);

  // One-time tap hint when the portrait first scrolls into view; the
  // wiggle class only activates on coarse-pointer (touch) devices
  useEffect(() => {
    const el = portraitRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWiggling(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function spin() {
    if (spinning) return;
    setSpinning(true);
    // Swap the title halfway through the spin, while she faces away
    setTimeout(() => {
      if (deckRef.current.length === 0) {
        deckRef.current = shuffled(titles);
        // a fresh deck must not deal the on-screen title twice in a row
        if (deckRef.current[deckRef.current.length - 1] === title) {
          deckRef.current.unshift(deckRef.current.pop()!);
        }
      }
      setTitle(deckRef.current.pop()!);
    }, 350);
  }

  return (
    <section className="px-6 pt-10 pb-6 sm:pt-10 sm:pb-6">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-warm-600">
            Philosophy
          </p>
          <h2 className="text-embossed text-3xl font-semibold tracking-tight text-warm-600 sm:text-4xl">
            How we think about building
          </h2>
        </div>

        {/* Values grid */}
        <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
          {values.map((value, i) => (
            <div key={i} className="text-center sm:text-left">
              {/* Index number */}
              <p className="mb-4 text-4xl font-extralight text-cream-300">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-lg font-semibold tracking-tight text-warm-600">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-warm-600/70">
                {value.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 mb-4 flex flex-col items-center opacity-90 mix-blend-multiply">
          <Image
            ref={portraitRef}
            src="/images/MAJA.png"
            alt=""
            width={400}
            height={400}
            onClick={spin}
            onAnimationEnd={() => {
              setSpinning(false);
              setWiggling(false);
            }}
            className={`w-32 sm:w-48 h-auto grayscale-20 contrast-105 transition-transform hover:scale-[1.02] cursor-pointer select-none ${
              spinning
                ? "animate-spin-once"
                : wiggling
                  ? "pointer-coarse:animate-wiggle"
                  : ""
            }`}
          />
          <p className="mt-5 text-xs tracking-[0.15em] uppercase text-warm-600/50">
            {title}
          </p>
        </div>
      </div>
    </section>
  );
}
