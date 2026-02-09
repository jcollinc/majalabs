import Image from "next/image";

interface AppInfo {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  href: string;
  learnMoreHref?: string;
  playStoreHref?: string;
  stack: string[];
  gradient: string;
  imageSrc: string;
}

export default function AppCard({
  app,
  reversed,
}: {
  app: AppInfo;
  reversed: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-10 lg:gap-16 ${
        reversed ? "lg:flex-row-reverse" : "lg:flex-row"
      } lg:items-center`}
    >
      {/* Visual card / preview area */}
      <div className="flex-[1.4]">
        <a
          href={app.learnMoreHref}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div
            className={`relative overflow-hidden rounded-3xl bg-linear-to-br ${app.gradient} p-3 shadow-sm cursor-pointer transition-transform hover:scale-[1.01]`}
          >
            <Image
              src={app.imageSrc}
              alt={`${app.name} app screenshot`}
              width={1200}
              height={900}
              className="w-full h-auto rounded-2xl"
              priority
            />
          </div>
        </a>
      </div>

      {/* Text content */}
      <div className="flex-1">
        <h3 className="text-2xl font-semibold tracking-tight text-warm-800 sm:text-3xl">
          {app.name}
        </h3>

        <p className="mt-4 text-base leading-relaxed text-warm-500">
          {app.description}
        </p>

        {/* Feature list */}
        <ul className="mt-6 space-y-2">
          {app.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-warm-600"
            >
              <span className="mt-1 block h-1 w-1 shrink-0 rounded-full bg-accent" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Tech stack pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {app.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-cream-100 px-3 py-1 text-xs font-medium text-warm-500"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={app.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-soft inline-flex items-center gap-2 rounded-full bg-warm-800 px-6 py-2.5 text-sm font-medium text-cream-50 hover:bg-warm-700"
          >
            Open app
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="opacity-60"
            >
              <path
                d="M3 11L11 3M11 3H5M11 3v6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          {app.learnMoreHref && (
            <a
              href={app.learnMoreHref}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-soft inline-flex items-center rounded-full border border-cream-300 px-6 py-2.5 text-sm font-medium text-warm-600 hover:border-warm-400 hover:text-warm-700"
            >
              Learn more
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
