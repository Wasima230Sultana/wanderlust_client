import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Destination } from "@/lib/api";
import Link from "next/link";

function DestinationCard({ destination }: { destination: Destination }) {
  const rating =
    typeof destination.rating === "number" ? destination.rating : null;

  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-sm ring-border/60">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {destination.imageUrl ? (
          <Image
            src={destination.imageUrl}
            alt={destination.destinationName}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}
        {rating !== null ? (
          <span className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-xs font-medium text-zinc-900 shadow-sm">
            {rating.toFixed(1)}
            <Star className="size-3 fill-zinc-900 text-zinc-900" aria-hidden="true" />
          </span>
        ) : null}
      </div>

      <CardContent className="flex flex-col gap-1.5 p-3.5">
        <p className="text-xs text-muted-foreground">{destination.country}</p>
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="truncate text-sm font-semibold">
            {destination.destinationName}
          </h2>
          <p className="shrink-0 text-sm font-semibold">
            ${destination.priceUsd}
            <span className="text-xs font-normal text-muted-foreground">
              /Person
            </span>
          </p>
        </div>
        <p className="text-xs text-muted-foreground">{destination.duration}</p>
        <Link href={`/destinations/${destination._id}`}>
         <Button
          type="button"
          size="sm"
          className="mt-2 w-fit rounded-md bg-brand text-xs font-semibold tracking-wider text-white uppercase hover:bg-brand/90"
        >
          Book Now
          <ArrowRight aria-hidden="true" />
        </Button>
        </Link>
       
      </CardContent>
    </Card>
  );
}

export default DestinationCard;