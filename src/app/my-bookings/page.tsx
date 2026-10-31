


import BookingCard from "@/components/my-booking/BookingCard";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { headers } from "next/headers";

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

 const MyBookingPage = async() => {
  const session = await auth.api.getSession({
    headers:await headers()
  });
  const user = session?.user;
  const token = await getTokenFromServer()
   const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${user?.email}`,{
            headers:{
              authorization:`Bearer ${token}`
            }
          }
          
        );
    const bookings:IBooking[] = await res.json();


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
export default MyBookingPage;