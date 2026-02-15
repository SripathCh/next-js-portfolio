import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Spacer section so you can see the scroll parallax effect */}
      <section className="flex min-h-[50vh] items-center justify-center px-6">
        <p className="text-muted text-sm uppercase tracking-widest">
          More sections coming soon
        </p>
      </section>
    </main>
  );
}
