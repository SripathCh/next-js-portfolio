import type { Metadata } from "next";
import { SlideUp, FadeIn } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — let's work together on your next project.",
};
import ContactForm from "@/components/sections/contact-form";
import ContactInfo from "@/components/sections/contact-info";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <span className="text-sm uppercase tracking-[0.3em] text-accent">Get in Touch</span>
          </FadeIn>

          <SlideUp delay={0.1}>
            <h1 className="mt-4 font-[family-name:var(--font-oswald)] text-5xl md:text-7xl font-bold uppercase tracking-tight">
              Let&apos;s Work
              <br />
              <span className="text-stroke">Together</span>
            </h1>
          </SlideUp>

          <FadeIn delay={0.3}>
            <p className="mt-6 max-w-lg text-base text-muted leading-relaxed">
              Have a project in mind or just want to chat? Drop me a message
              and I&apos;ll get back to you as soon as possible.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form + Info grid */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-[1.2fr_1fr]">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>
    </main>
  );
}
