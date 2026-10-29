import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="relative flex min-h-[360px] items-center overflow-hidden">
      <Image
        src="/images/CTA.png"
        alt="Airplane flying over a tropical island"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Ready To Start Your Journey?
        </h2>
        <p className="max-w-md text-sm leading-6 text-white/85 sm:text-base">
          Join thousands of travelers who&apos;ve discovered the world with us
        </p>
        <Link
          href="/destinations"
          className="mt-3 inline-flex h-11 items-center gap-2 rounded-full bg-white px-7 text-xs font-bold tracking-wider text-zinc-900 uppercase transition-colors hover:bg-zinc-100"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
