
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
import Image from "next/image";
import EditDestinationDialog from "./EditDestinationDialog";
import DeleteDestinationDialog from "./DeleteDestinationDialog";
import MyBookingCard from "../my-booking/MyBookingCard";

type Props = {
  destination: Destination;
};

export default function DestinationDetailsClient({
  destination,
}: Props) {
      const [bookingOpen, setBookingOpen] = React.useState(false);
        const [saved, setSaved] = React.useState(false);

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
        
<div className="mb-6 flex items-center justify-between gap-4">
  <Link
    href="/destinations"
    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
  >
    <ArrowLeft className="size-4" />
    Back to destinations
  </Link>

  <div className="flex items-center gap-2">

<EditDestinationDialog
  destination={{
    ...destination,
    departureDate: destination.departureDate ?? "",
  }}
/>
   <DeleteDestinationDialog destination={{
    ...destination,
    departureDate: destination.departureDate ?? "",
  }}></DeleteDestinationDialog>
  </div>
</div>


        {/* Main destination card */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
          {/* Destination image */}
          <div className="relative">
            {image ? (
              <Image
              width={400}
              height={400}
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
          <MyBookingCard destination={destination}></MyBookingCard>
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
