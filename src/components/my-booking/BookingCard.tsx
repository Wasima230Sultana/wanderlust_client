'use client'
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type Booking = {
    _id:string,
  username: string;
  email: string;
  image?: string | null;
  destinationName: string;
  country: string;
  category: string;
  priceUsd: number;
  departureDate: string;
  bookingDate: string | Date;
  imageUrl?: string;
};

type BookingCardProps = {
  booking: Booking;
};

export default function BookingCard({ booking }: BookingCardProps) {

const router = useRouter()
  const formatDate = (date: string | Date) => {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };


  const handleBookingCancel=async()=>{
    const token = await getTokenFromClient()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${booking._id}`,{
        method:'DELETE',
         headers:{
          authorization: `Bearer ${token}`
        }
       

    })
    const data = await res.json();
    console.log(data)
  if (res.ok) {
  router.push("/my-bookings");
  router.refresh();
}
  }
  return (
    <article className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="grid sm:grid-cols-[220px_1fr]">
        <div className="relative min-h-48 bg-muted">
          {booking.imageUrl && (
            <Image
              src={booking.imageUrl}
              alt={booking.destinationName}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 220px"
            />
          )}
        </div>

        <div className="space-y-4 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">
                {booking.destinationName}
              </h2>
              <p className="text-sm text-muted-foreground">
                {booking.country} · {booking.category}
              </p>
            </div>

            <p className="text-lg font-bold text-primary">
              ${booking.priceUsd.toLocaleString("en-US")}
            </p>
          </div>

          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground">Departure date</p>
              <p className="font-medium">
                {formatDate(booking.departureDate)}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Booking date</p>
              <p className="font-medium">
                {formatDate(booking.bookingDate)}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="mb-3 font-semibold">Booked by</h3>

            <div className="flex items-center gap-3">
              {booking.image ? (
                <img
                  src={booking.image}
                  alt={booking.username}
                  className="size-11 rounded-full object-cover"
                />
              ) : (
                <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                  {booking.username?.charAt(0).toUpperCase() || "U"}
                </div>
              )}

              <div className="min-w-0">
                <p className="font-medium">{booking.username}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {booking.email}
                </p>
              </div>
            </div>
          </div>
                    <div className="flex flex-wrap gap-3 border-t pt-4">
            <Link
              href={`/destinations/${booking._id}`}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              View
            </Link>
 <Button onClick={handleBookingCancel}
           type="submit"
           variant={'destructive'}
             
              className="inline-flex items-center justify-center rounded-md border border-destructive px-4 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel Booking
            </Button>
          </div>

        </div>
      </div>
    </article>
  );
}
