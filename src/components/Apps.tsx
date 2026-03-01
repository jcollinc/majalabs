import AppCard from "./AppCard";

const apps = [
  {
    name: "PayTogether",
    tagline: "Split expenses, not friendships",
    description:
      "A collaborative expense-splitting app for roommates, travel companions, and households who share costs. Smart bill splitting with penny-precision, settlement optimization, receipt scanning, and spending analytics.",
    features: [
      "Equal, custom, or percentage-based splits",
      "Settlement optimization — fewest payments possible",
      "AI-powered receipt scanning",
      "Spending trends and category breakdowns",
    ],
    href: "https://app.paytogether.io",
    learnMoreHref: "https://paytogether.io",
    playStoreHref: "https://play.google.com/store/apps/details?id=app.paytogether",
    stack: ["Next.js", "React", "Firebase", "Stripe", "OpenAI"],
    gradient: "from-[#E8D5CC] to-[#F5E1D8]",
    imageSrc: "/images/paytogether.png",
  },
  {
    name: "myFPL",
    tagline: "Your Fantasy Premier League edge",
    description:
      "A mobile-first assistant for FPL managers. Algorithm-driven transfer recommendations, optimal lineup suggestions, live gameweek tracking, fixture analysis calibrated with real betting odds, and AI-generated weekly reports.",
    features: [
      "Score-optimized lineup & captain picks",
      "Algorithm-driven transfer suggestions with chip prep modes",
      "Live points with auto-sub prediction",
      "AI weekly reports & odds-enhanced fixture ratings",
    ],
    href: "https://myfpl.co",
    learnMoreHref: "https://myfpl.co/about",
    playStoreHref: "https://play.google.com/store/apps/details?id=com.myfpl.app",
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "OpenAI"],
    gradient: "from-[#E8D5CC] to-[#F5E1D8]",
    imageSrc: "/images/myfpl.png",
  },
];

export default function Apps() {
  return (
    <section id="apps" className="px-6 pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-20 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-warm-600">
            Products
          </p>
          <h2 className="text-embossed text-3xl font-semibold tracking-tight text-warm-600 sm:text-4xl">
            What we&rsquo;re building
          </h2>
        </div>

        {/* App cards */}
        <div className="flex flex-col gap-20 lg:gap-28">
          {apps.map((app, i) => (
            <AppCard key={app.name} app={app} reversed={i % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
