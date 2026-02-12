import { HeroSection } from "@/components/organisms/HeroSection";
import { ServiceGrid } from "@/components/organisms/ServiceGrid";
import { LeadForm } from "@/components/organisms/LeadForm";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Setembro.net - Tech Solutions & AI Hub",
  description: "Transformamos negócios com inteligência artificial e soluções de software sob medida.",
  openGraph: {
    title: "Setembro.net - Tech Solutions & AI Hub",
    description: "Transformamos negócios com inteligência artificial e soluções de software sob medida.",
    type: "website",
    locale: "pt_BR",
    url: "https://setembro.net",
  },
};

export default function Home(): React.ReactNode {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Navbar />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <ServiceGrid />

        {/* CTA / Contact Section */}
        <section id="contact" className="bg-secondary/30 py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
              <div className="space-y-6">
                <h2 className="font-heading text-3xl font-bold md:text-4xl text-foreground">
                  Vamos construir o futuro juntos?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Entre em contato para discutir como podemos aplicar tecnologia de ponta e IA para resolver seus desafios de negócio.
                </p>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent">✓</span>
                    Consultoria Especializada
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent">✓</span>
                    Soluções Sob Medida
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent">✓</span>
                    Suporte Contínuo
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border bg-card p-8 shadow-lg">
                <h3 className="mb-6 font-heading text-xl font-semibold">Solicite um Orçamento</h3>
                <LeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Setembro.net",
            "url": "https://setembro.net",
            "logo": "https://setembro.net/logo.png",
            "description": "Transformamos negócios com inteligência artificial e soluções de software sob medida.",
            "founder": {
              "@type": "Person",
              "name": "Sergio"
            }
          })
        }}
      />
    </div>
  );
}
