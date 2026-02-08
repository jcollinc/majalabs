export default function Footer() {
  return (
    <footer className="px-6 pb-12 pt-8">
      {/* Divider */}
      <div className="divider mx-auto max-w-xl" />

      <div className="mx-auto mt-8 max-w-5xl">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo */}
          <p className="text-embossed text-sm font-semibold uppercase tracking-[0.25em] text-warm-500 select-none">
            Maja Labs
          </p>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-warm-400">
            <a
              href="https://app.paytogether.io"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-soft hover:text-warm-600"
            >
              PayTogether
            </a>
            <a
              href="https://myfpl.app"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-soft hover:text-warm-600"
            >
              myFPL
            </a>
            <a
              href="https://github.com/jcollinc"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-soft hover:text-warm-600"
            >
              GitHub
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-warm-400/60">
            &copy; {new Date().getFullYear()} Maja Labs LLC. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
