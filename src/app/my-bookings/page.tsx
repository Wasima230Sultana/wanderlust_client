
"use client";

import { useEffect, useState } from "react";
import BookingCard from "@/components/my-booking/BookingCard";
import { authClient } from "@/lib/auth-client";

type IBooking = {
  _id: string;
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

export default function MyBookingPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending) return;

    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `http://localhost:8000/my-bookings/${user.email}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch bookings.");
        }

        const data = await res.json();
        setBookings(Array.isArray(data) ? data : data.bookings ?? []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.email, isPending]);

  if (isPending || loading) {
    return <p className="p-8 text-center">Loading bookings...</p>;
  }

  if (!user) {
    return <p className="p-8 text-center">Please log in to view your bookings.</p>;
  }

  if (error) {
    return <p className="p-8 text-center text-red-500">{error}</p>;
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            My Bookings
          </h1>
          <p className="mt-2 text-muted-foreground">
            View your booked destinations and travel details.
          </p>
        </div>

        <div className="mb-6 rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Total bookings</p>
          <p className="mt-1 text-3xl font-bold">{bookings.length}</p>
        </div>

        <div className="space-y-5">
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <BookingCard
                key={booking._id ?? index}
                booking={booking}
              />
            ))
          ) : (
            <div className="rounded-xl border border-dashed bg-card px-6 py-12 text-center">
              <h2 className="text-lg font-semibold">No bookings yet</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Explore destinations and book your next trip.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
