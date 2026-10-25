import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";

const searchFilters = [
  { label: "Location", value: "Address: City Or Zip" },
  { label: "Date/Duration", value: "Anytime / 3 Days" },
  { label: "Budget", value: "$0 - $3000" },
  { label: "People", value: "5 - 10" },
];

export default function Banner() {
  return (
    <section className="relative flex min-h-[600px] flex-1 flex-col overflow-hidden">
      <Image
        src="/images/Banner.png"
        alt="Aerial view of a turquoise bay surrounded by green hills"
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />

      {/* Headline */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-5 px-6 pt-16 pb-32 text-center drop-shadow-sm">
        <h1 className="text-4xl leading-tight font-normal text-white sm:text-5xl">
          Discover Your
          <br className="hidden sm:block" /> Next Adventure
        </h1>
        <p className="max-w-lg text-sm leading-6 text-white/85 sm:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/destinations"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-brand px-6 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-brand/90"
          >
            Explore Now
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex h-10 items-center rounded-md border border-white/30 bg-white/15 px-6 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            View Destination
          </Link>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative z-10 px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-lg bg-black/45 backdrop-blur-md sm:flex-row">
          {searchFilters.map(({ label, value }, index) => (
            <div
              key={label}
              className={cn(
                "flex-1 px-5 py-3 text-left",
                index > 0 &&
                  "border-t border-white/15 sm:border-t-0 sm:border-l",
              )}
            >
              <p className="text-xs font-semibold text-white">{label}</p>
              <p className="mt-0.5 text-xs text-white/65">{value}</p>
            </div>
          ))}
          <button
            type="button"
            className="bg-brand px-10 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90 sm:w-36"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
