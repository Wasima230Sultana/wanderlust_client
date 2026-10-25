
"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock,
  Heart,
  MapPin,
  ShieldCheck,
  Tag,
  Wallet,
} from "lucide-react";
import type { Destination } from "@/lib/api";

type Props = {
  destination: Destination;
};

export default function DestinationDetailsClient({
  destination,
}: Props) {
  const [saved, setSaved] = React.useState(false);
  const [bookingOpen, setBookingOpen] = React.useState(false);

  // Support imageUrl as either a string or an array of strings.
  const image = Array.isArray(destination.imageUrl)
    ? destination.imageUrl[0]
    : destination.imageUrl;

  const departureDate = destination.departureDate
    ? new Date(
        `${destination.departureDate.slice(0, 10)}T12:00:00`
      ).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : "Not specified";

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Back navigation */}
        <Link
          href="/destinations"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to destinations
        </Link>

        {/* Main destination card */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
          {/* Destination image */}
          <div className="relative">
            {image ? (
              <img
                src={image}
                alt={destination.destinationName}
                className="h-64 w-full object-cover sm:h-80 lg:h-[440px]"
              />
            ) : (
              <div className="flex h-64 items-center justify-center bg-muted text-muted-foreground sm:h-80 lg:h-[440px]">
                No destination image available
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

            <div className="absolute left-5 top-5">
              <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-900 shadow">
                {destination.category}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSaved((previous) => !previous)}
              aria-label={
                saved ? "Remove from saved destinations" : "Save destination"
              }
              aria-pressed={saved}
              className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
            >
              <Heart
                className={`size-5 ${
                  saved
                    ? "fill-rose-500 text-rose-500"
                    : "text-zinc-700"
                }`}
              />
            </button>

            <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-8 sm:left-8">
              <p className="mb-2 flex items-center gap-2 text-sm font-medium text-white/90">
                <MapPin className="size-4" />
                {destination.country}
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                {destination.destinationName}
              </h1>

              <p className="mt-2 text-sm text-white/85 sm:text-base">
                Discover your next unforgettable travel experience.
              </p>
            </div>
          </div>

          {/* Details and booking panel */}
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_320px] lg:p-10">
            <section>
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  About this destination
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  Your next adventure starts here
                </h2>

                <p className="mt-4 whitespace-pre-line leading-7 text-muted-foreground">
                  {destination.description ||
                    "Get ready to explore this amazing destination and create unforgettable memories."}
                </p>
              </div>

              {/* Travel information cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-muted/30 p-5 transition hover:border-primary/40">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Clock className="size-5" />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Trip duration
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {destination.duration}
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-muted/30 p-5 transition hover:border-primary/40">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CalendarDays className="size-5" />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Departure date
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {departureDate}
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-muted/30 p-5 transition hover:border-primary/40">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Tag className="size-5" />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Travel category
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {destination.category}
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-muted/30 p-5 transition hover:border-primary/40">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Wallet className="size-5" />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Package price
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    ${destination.priceUsd.toLocaleString("en-US")}
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-8 rounded-2xl border border-border p-5 sm:p-6">
                <h3 className="text-lg font-semibold">
                  Why choose this package?
                </h3>

                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <Check className="size-5 shrink-0 text-primary" />
                    Explore a destination in the {destination.category.toLowerCase()} category
                  </li>

                  <li className="flex items-center gap-3">
                    <Check className="size-5 shrink-0 text-primary" />
                    Plan your trip with a listed departure date
                  </li>

                  <li className="flex items-center gap-3">
                    <Check className="size-5 shrink-0 text-primary" />
                    Know your package price before making plans
                  </li>
                </ul>
              </div>
            </section>

            {/* Price and booking card */}
            <aside>
              <div className="sticky top-6 rounded-2xl border border-border bg-background p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">
                  Package price
                </p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tight">
                    ${destination.priceUsd.toLocaleString("en-US")}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    / package
                  </span>
                </div>

                <div className="my-6 border-t border-border" />

                <div className="space-y-4 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="size-4" />
                      Destination
                    </span>
                    <span className="text-right font-medium">
                      {destination.destinationName}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="size-4" />
                      Duration
                    </span>
                    <span className="text-right font-medium">
                      {destination.duration}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="size-4" />
                      Departure
                    </span>
                    <span className="text-right font-medium">
                      {departureDate}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setBookingOpen((previous) => !previous)}
                  className="mt-7 w-full rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  {bookingOpen ? "Close booking details" : "Book this package"}
                </button>

                {bookingOpen && (
                  <div
                    className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4"
                    role="status"
                  >
                    <h3 className="font-semibold">
                      Booking inquiry
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      You selected the {destination.destinationName} package
                      for ${destination.priceUsd.toLocaleString("en-US")}.
                      Contact your travel provider to confirm availability
                      and complete your booking.
                    </p>

                    <p className="mt-3 text-xs text-muted-foreground">
                      This demo does not create a reservation or process payments.
                    </p>
                  </div>
                )}

                <div className="mt-5 flex items-start gap-3 rounded-xl bg-muted/40 p-4">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />

                  <p className="text-xs leading-5 text-muted-foreground">
                    Review the departure date, package details, and final
                    terms with your travel provider before booking.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSaved((previous) => !previous)}
                  className="mt-4 w-full rounded-xl border border-border px-5 py-3 text-sm font-medium transition hover:bg-muted"
                >
                  {saved ? "♥ Saved to favorites" : "♡ Save this destination"}
                </button>
              </div>
            </aside>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Ready to explore somewhere new?
          </p>

          <Link
            href="/destinations"
            className="rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-muted"
          >
            Explore more destinations
          </Link>
        </div>
      </div>
    </main>
  );
}
