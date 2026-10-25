
import { notFound } from "next/navigation";
import DestinationDetailsClient from "@/components/DestinationDetailsClient";
import type { Destination } from "@/lib/api";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DestinationDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  let destination: Destination;

  try {
    const res = await fetch(
      `http://localhost:8000/destinations/${id}`,
      {
        cache: "no-store",
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
