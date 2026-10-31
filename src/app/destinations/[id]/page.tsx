
import { notFound } from "next/navigation";
import DestinationDetailsClient from "@/components/destination/DestinationDetailsClient";
import type { Destination } from "@/lib/api";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DestinationDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  let destination: Destination;

  try {
     const token = await getTokenFromServer()
     console.log("Token exists:", !!token);
console.log("Token length:", token?.length);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/destinations/${id}`,
      {
        cache: "no-store",
        headers:{
          authorization: `Bearer ${token}`
        }
      }
    );

    if (res.status === 404) {
      notFound();
    }

    if (!res.ok) {
      throw new Error("Failed to fetch destination");
    }

    destination = await res.json();
  } catch {
    throw new Error(
      "Unable to load destination. Please check your backend server."
    );
  }

  return <DestinationDetailsClient destination={destination} />;
}
