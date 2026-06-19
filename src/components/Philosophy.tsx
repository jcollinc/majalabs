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
    title: "Build for ourselves",
    body: "Every product starts with a genuine personal frustration. We build the fix we want, then share it.",
  },
  {
    title: "Sweat the details",
    body: "Maja has exacting standards and a long memory. We sweat the little things to keep her happy.",
  },
  {
    title: "Keep it fun",
    body: "We only build things we genuinely enjoy using, and we try to enjoy building them just as much.",
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
  // Re-armed only by a full exit, so hovering near the visibility
  // threshold can't retrigger the hint
  const wiggleArmedRef = useRef(true);

  // Tap hint whenever the portrait scrolls into view; the wiggle
  // class only activates on coarse-pointer (touch) devices
  useEffect(() => {
    const el = portraitRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          wiggleArmedRef.current = true;
          setWiggling(false);
        } else if (entry.intersectionRatio >= 0.6 && wiggleArmedRef.current) {
          wiggleArmedRef.current = false;
          setWiggling(true);
        }
      },
      { threshold: [0, 0.6] }
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
