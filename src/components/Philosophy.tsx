import Image from "next/image";

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

        <div className="mt-10 mb-4 flex justify-center opacity-90 mix-blend-multiply">
          <Image
            src="/images/MAJA.png"
            alt=""
            width={400}
            height={400}
            className="w-32 sm:w-48 h-auto grayscale-20 contrast-105"
          />
        </div>
      </div>
    </section>
  );
}
