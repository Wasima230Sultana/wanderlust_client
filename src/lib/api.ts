// Backend: sibling folder `wonderlast-resources-server` (see AGENTS.md).
export const apiBase = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(
  /\/+$/,
  "",
);

export type Destination = {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  priceUsd: number;
  duration: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
  rating?: number;
  createdAt?: string;
};

export async function fetchDestinations(): Promise<Destination[]> {
  let response: Response;

  try {
    response = await fetch(`${apiBase}/destinations`);
  } catch {
    throw new Error(
      "Could not reach the server. Start it with `npm start` in the wonderlast-resources-server folder.",
    );
  }

  const result = (await response.json().catch(() => null)) as {
    success?: boolean;
    destinations?: Destination[];
    error?: string;
  } | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.error ?? `The server rejected the request (${response.status}).`);
  }

  return result.destinations ?? [];
}
