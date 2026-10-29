import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Testimonial = {
  quote: string;
  name: string;
  location: string;
  photo: string;
};

// The design shows 5 slides but only two quotes/photos exist so far —
// slides 3-5 are placeholders cycling the available photos. Replace with real testimonials.
const testimonials: Testimonial[] = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfect — From The Luxurious Resorts To The Authentic Cultural Experiences. Truly Unforgettable.",
    name: "Mr. Rajiv Trivedi",
    location: "Bengaluru",
    photo: "/images/person2.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/images/person1.png",
  },
  {
    quote:
      "Kyoto In Spring Was A Dream Come True. The Cherry Blossoms, The Temples, The Food — Everything Was Curated With Such Care And Attention To Detail.",
    name: "Ms. Anita Desai",
    location: "Mumbai",
    photo: "/images/person1.png",
  },
  {
    quote:
      "The Maldives Package Was Pure Paradise. Crystal-Clear Waters, Overwater Villas And Sunsets We Will Never Forget. Worth Every Rupee!",
    name: "Mr. Daniel Cruz",
    location: "Goa",
    photo: "/images/person2.png",
  },
  {
    quote:
      "Safari In The Serengeti Was A Once-In-A-Lifetime Experience. Spotting The Big Five With Our Expert Guide Made This Trip Truly Special.",
    name: "Ms. Laura Bennett",
    location: "Sydney, Australia",
    photo: "/images/person1.png",
  },
];

export default function Testimonials() {
  return (
    <section className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <Carousel
          opts={{ align: "start", loop: false }}
          className="w-full"
          aria-label="Traveler testimonials"
        >
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-semibold text-zinc-900">
                What Travelers Say
              </h2>
              <p className="mt-2 text-sm text-zinc-500">
                Real stories from our happy travelers
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <CarouselPrevious className="static size-9 border-zinc-300 text-zinc-700 hover:bg-zinc-100" />
              <CarouselNext className="static size-9 border-zinc-300 text-zinc-700 hover:bg-zinc-100" />
            </div>
          </div>

          <CarouselContent className="mt-8">
            {testimonials.map(({ quote, name, location, photo }) => (
              <CarouselItem key={name} className="md:basis-1/2">
                <article className="flex h-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
                  <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                    <p className="text-sm leading-6 font-semibold text-zinc-900">
                      &ldquo;{quote}&rdquo;
                    </p>
                    <div>
                      <p className="text-sm font-semibold text-brand">
                        — {name}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        {location}
                      </p>
                    </div>
                  </div>
                  <Image
                    src={photo}
                    alt={name}
                    width={218}
                    height={264}
                    className="w-40 shrink-0 self-stretch object-cover sm:w-44"
                  />
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
