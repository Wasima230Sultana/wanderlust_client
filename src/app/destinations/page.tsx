
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchDestinations, type Destination } from "@/lib/api";
import DestinationCard from "@/components/DestinationCard";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Wildlife",
];

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "u1000", label: "Under $1,000" },
  { value: "mid", label: "$1,000 - $2,999" },
  { value: "high", label: "$3,000 - $4,999" },
  { value: "premium", label: "$5,000 & above" },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name: A to Z" },
];

function matchesPrice(price: number, range: string): boolean {
  switch (range) {
    case "u1000":
      return price < 1000;
    case "mid":
      return price >= 1000 && price < 3000;
    case "high":
      return price >= 3000 && price < 5000;
    case "premium":
      return price >= 5000;
    default:
      return true;
  }
}

function FilterSelect({
  placeholder,
  value,
  onChange,
  options,
}: {
  placeholder: string;
  value: string | null;
  onChange: (value: string | null) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <Select
      value={value}
      items={options}
      onValueChange={onChange}
    >
      <SelectTrigger className="h-10 w-full justify-between rounded-none border-0 bg-transparent px-4 text-xs font-medium tracking-wider text-muted-foreground uppercase hover:bg-transparent focus-visible:border-0 focus-visible:ring-0">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function DestinationsPage() {
  const [items, setItems] = React.useState<Destination[]>([]);

  const [status, setStatus] = React.useState<
    "loading" | "error" | "ready"
  >("loading");

  const [errorMessage, setErrorMessage] = React.useState("");
  const [reloadKey, setReloadKey] = React.useState(0);

  const [category, setCategory] = React.useState<string | null>(null);
  const [priceRange, setPriceRange] = React.useState<string | null>(null);
  const [sortBy, setSortBy] = React.useState<string | null>(null);

  // Fetch destinations from the backend
  React.useEffect(() => {
    let cancelled = false;

    async function loadDestinations() {
      try {
        setStatus("loading");
        setErrorMessage("");

        const data = await fetchDestinations();

        if (!cancelled) {
          setItems(data);
          setStatus("ready");
        }
      } catch (error: unknown) {
        if (!cancelled) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Something went wrong while loading destinations."
          );

          setStatus("error");
        }
      }
    }

    loadDestinations();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  // Retry loading destinations
  function handleRetry() {
    setReloadKey((key) => key + 1);
  }

  // Apply category and price filters
  const visible = items.filter(
    (destination) =>
      (!category ||
        category === "all" ||
        destination.category === category) &&
      matchesPrice(destination.priceUsd, priceRange ?? "all")
  );

  // Sort filtered destinations without mutating the original state
  const sortedDestinations = [...visible];

  switch (sortBy) {
    case "price-asc":
      sortedDestinations.sort(
        (a, b) => a.priceUsd - b.priceUsd
      );
      break;

    case "price-desc":
      sortedDestinations.sort(
        (a, b) => b.priceUsd - a.priceUsd
      );
      break;

    case "rating":
      sortedDestinations.sort(
        (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
      );
      break;

    case "name":
      sortedDestinations.sort(
        (a, b) =>
          a.destinationName.localeCompare(b.destinationName)
      );
      break;

    default:
      // Featured: preserve the order returned by the backend
      break;
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Page heading */}
      <header>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Explore All Destinations
        </h1>

        <p className="mt-1.5 text-sm text-muted-foreground">
          Find your perfect travel experience from our curated collection
        </p>
      </header>

      {/* Filters */}
      <div className="mt-5 overflow-hidden rounded-lg border border-border">
        <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <FilterSelect
            placeholder="Category"
            value={category}
            onChange={setCategory}
            options={[
              { value: "all", label: "All Categories" },
              ...categories.map((option) => ({
                value: option,
                label: option,
              })),
            ]}
          />

          <FilterSelect
            placeholder="Price Range"
            value={priceRange}
            onChange={setPriceRange}
            options={priceRanges}
          />

          <FilterSelect
            placeholder="Sort By"
            value={sortBy}
            onChange={setSortBy}
            options={sortOptions}
          />
        </div>
      </div>

      {/* Destination count */}
      {status === "ready" && (
        <p className="mt-3 text-sm text-muted-foreground">
          Showing {sortedDestinations.length}{" "}
          {sortedDestinations.length === 1
            ? "destination"
            : "destinations"}
        </p>
      )}

      {/* Loading skeletons */}
      {status === "loading" && (
        <div
          className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Loading destinations"
          aria-busy="true"
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden rounded-lg border border-border bg-card"
            >
              <div className="aspect-[16/10] w-full bg-muted" />

              <div className="flex flex-col gap-2.5 p-3.5">
                <div className="h-3 w-16 rounded bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-3 w-24 rounded bg-muted" />
                <div className="mt-1 h-8 w-28 rounded-md bg-muted" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {status === "error" && (
        <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-8 text-center">
          <p className="text-sm font-medium text-destructive" role="alert">
            {errorMessage}
          </p>

          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={handleRetry}
          >
            Try again
          </Button>
        </div>
      )}

      {/* Empty state */}
      {status === "ready" && sortedDestinations.length === 0 && (
        <div className="mt-4 rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          {items.length === 0 ? (
            <>
              No destinations yet —{" "}
              <Link
                href="/add-destination"
                className="font-medium text-brand underline-offset-4 hover:underline"
              >
                add your first travel package
              </Link>
              .
            </>
          ) : (
            "No destinations match your filters."
          )}
        </div>
      )}

      {/* Destination cards */}
      {status === "ready" && sortedDestinations.length > 0 && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedDestinations.map((destination) => (
            <DestinationCard
              key={destination._id}
              destination={destination}
            />
          ))}
        </div>
      )}
    </main>
  );
}
