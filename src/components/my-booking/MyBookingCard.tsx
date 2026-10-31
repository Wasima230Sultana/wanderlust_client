
"use client";

import * as React from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
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
import { authClient } from "@/lib/auth-client";
import { Form } from "@base-ui/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { username } from "better-auth/plugins";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type Props = {
    destination: Destination;
};

const MyBookingCard = ({ destination }: Props) => {
    const { data: session } = authClient.useSession()
    const user = session?.user
    const [bookingOpen, setBookingOpen] = React.useState(false);
    const [saved, setSaved] = React.useState(false);
const handleBooking=async(e: React.SubmitEvent<HTMLElement>)=>{
    e.preventDefault()
    const departureDate = e.target.departureDate.value;
    const data = {
        username: user?.name,
        email:user?.email,
        image:user?.image,
        ...destination,
        departureDate:departureDate,
        bookingDate : new Date()
    }
    console.log(data)
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-booking`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        
        },
        body:JSON.stringify(data)
    })
    const bookingRes = await res.json()
    console.log(bookingRes)

}

    return (
        <div>
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
  {/* <Form onSubmit={handleBooking}>
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

                             <Input
        type="date"
        name="departureDate"
        aria-label="Departure date"
        defaultValue={destination.departureDate}
        className="mt-4"
      />
                    </div>

                    <Button
                        type="submit"
                        className="mt-7 w-full rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition hover:opacity-90"
                    >Booking Confirm
                    </Button>
                </Form> */}
                <form onSubmit={handleBooking}>
      <Input
        type="date"
        name="departureDate"
        aria-label="Departure date"
        defaultValue={destination.departureDate}
        className="mt-4"
      />

      <Button type="submit" className="mt-4 w-full bg-[#00A8E8] text-white hover:bg-[#0095d1]">
        Book Now
        <ArrowRight />
      </Button>

      </form>




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
              
            </aside >
        </div >
        
    );
};

export default MyBookingCard;